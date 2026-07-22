import BlogPost from "../models/BlogPost.js";
import { Op } from 'sequelize';
import Resource from "../models/Resource.js";

/**
 * Scheduled Publishing Module
 * Runs periodically to publish scheduled content when their publishAt date has passed
 */

// Poll interval - configurable via environment variable (default: 60 seconds)
const POLL_INTERVAL = parseInt(process.env.SCHEDULED_PUBLISHING_INTERVAL || "60000", 10);

/**
 * Publish scheduled blog posts
 */
async function publishScheduledBlogPosts() {
  try {
    const now = new Date();

    // Sequelize models use findAll + where filters.
    const postsToPublish = await BlogPost.findAll({
      where: {
        status: "Scheduled",
        publishAt: { [Op.lte]: now },
      },
    });

    if (postsToPublish.length === 0) return;

    console.log(`[Scheduled Publishing] Found ${postsToPublish.length} blog posts to publish`);

    for (const post of postsToPublish) {
      try {
        post.status = "Published";
        post.publishedAt = now;
        post.publishAt = null;
        await post.save();
        console.log(`[Scheduled Publishing] Published blog post: ${post.title} (${post.id})`);
      } catch (err) {
        console.error(`[Scheduled Publishing] Failed to publish blog post ${post.id}:`, err);
      }
    }
  } catch (err) {
    console.error("[Scheduled Publishing] Error publishing blog posts:", err);
  }
}

/**
 * Publish scheduled resources
 */
async function publishScheduledResources() {
  try {
    const now = new Date();

    const resourcesToPublish = await Resource.findAll({
      where: {
        status: { [Op.ne]: "Published" },
        publishAt: { [Op.lte]: now },
      },
    });

    if (resourcesToPublish.length === 0) return;

    console.log(`[Scheduled Publishing] Found ${resourcesToPublish.length} resources to publish`);

    for (const resource of resourcesToPublish) {
      try {
        resource.status = "Published";
        resource.publishedAt = now;
        resource.publishAt = null;
        await resource.save();
        console.log(`[Scheduled Publishing] Published resource: ${resource.title} (${resource.id})`);
      } catch (err) {
        console.error(`[Scheduled Publishing] Failed to publish resource ${resource.id}:`, err);
      }
    }
  } catch (err) {
    console.error("[Scheduled Publishing] Error publishing resources:", err);
  }
}

/**
 * Main scheduler function
 */
async function runScheduledPublishing() {
  console.log("[Scheduled Publishing] Running scheduled publishing check...");
  
  await Promise.all([
    publishScheduledBlogPosts(),
    publishScheduledResources(),
  ]);
}

/**
 * Start the scheduled publishing background task
 */
export function startScheduledPublishing() {
  console.log("[Scheduled Publishing] Starting scheduled publishing scheduler");
  
  // Run immediately on startup
  runScheduledPublishing();
  
  // Then run periodically
  setInterval(runScheduledPublishing, POLL_INTERVAL);
}

export default { startScheduledPublishing };

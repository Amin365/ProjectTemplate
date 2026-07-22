import PushSubscription from "../models/ushSubscription.js";

// Save push subscription
export const subscribePush = async (req, res) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    const subscription = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!subscription || typeof subscription !== "object" || !subscription.endpoint) {
      return res.status(400).json({ message: "Invalid subscription" });
    }

    const endpoint = String(subscription.endpoint).trim();
    if (!endpoint) {
      return res.status(400).json({ message: "Invalid subscription endpoint" });
    }

    // Table stores subscription as JSON, so dedupe by endpoint from payload.
    const existingSubs = await PushSubscription.findAll({
      where: { user_id: Number(userId) },
    });

    const existing = existingSubs.find((sub) => {
      const storedEndpoint = String(sub?.subscription?.endpoint || "").trim();
      return storedEndpoint === endpoint;
    });

    if (existing) {
      await existing.update({
        subscription, // keep full JSON payload
      });
    } else {
      await PushSubscription.create({
        user_id: Number(userId),
        subscription,
      });
    }

    return res.status(201).json({ message: "Push subscription saved" });
  } catch (err) {
    console.error("Push subscribe error:", err);
    return res.status(500).json({ message: "Failed to save subscription" });
  }
};

export default {
  subscribePush,
};
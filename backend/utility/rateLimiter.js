import rateLimit from "express-rate-limit";

/**
 * General API rate limiter: 100 requests per 15 minutes per IP.
 * Applied to write endpoints on new routes to prevent abuse.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

/**
 * Public XalTech contact/demo endpoint.
 * Intentionally much stricter because no authentication is required.
 */
export const contactSubmissionLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: {
    success: false,
    message: "Too many demo requests from this connection. Please try again later.",
  },
});

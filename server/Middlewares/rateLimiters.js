const rateLimit = require("express-rate-limit");

// 🌍 Global limiter (all routes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔐 Login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later.",
});

// 🤖 AI / Chat limiter
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "You are sending messages too fast.",
});

module.exports = {
  globalLimiter,
  loginLimiter,
  aiLimiter,
};

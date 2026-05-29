const rateLimit = require('express-rate-limit');


const aiRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 3, 
    message: {
        success: false,
        message: "Too many requests to AIRA. Please slow down and try again in a minute."
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

module.exports = aiRateLimiter;
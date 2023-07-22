const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const rateLimiter = rateLimit({
  windowMs: 60 * 5000, //5 minutes
  max: 5, //Limit IP to 5 requests per window per 5 minutes
  message: {
    error:
      "Too many login attempts from this IP, please try again after 5 minutes.",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "error.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, //Return rate limit info in the RateLimit headers
  legacyHeaders: false, // Disable the X-RateLimit headers
});

module.exports = rateLimiter;

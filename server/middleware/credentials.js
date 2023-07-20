const authorizedOrigins = require("../config/authorizedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (authorizedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
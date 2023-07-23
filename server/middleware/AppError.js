const { logEvents } = require("./logger");
const errorOrMsg = require("../utils/errorOrMsg");

const AppError = (err, req, res, next) => {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired." });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  const status =
    err.statusCode || res.statusCode || res.statusCode || 500; //server error

  res.status(status).json(errorOrMsg(status, err.message));
};

module.exports = { AppError };

const { logEvents } = require("./logger");

const AppError = (err, req, res, next) => {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired." });
  }

  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  const status = res.statusCode ? res.statusCode : 500; //server error

  res.status(status);

  res.json({ message: err.message });
};

module.exports = { AppError };

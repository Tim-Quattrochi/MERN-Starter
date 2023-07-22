const { AppError } = require("./AppError");

const validateReqBody = (...params) => {
  const middleware = (req, res, next) => {
    for (const param of params) {
      if (!(param in req.body) || req.body[param] === "") {
        let error = new Error(`${param} is required.`);
        res.statusCode = 400;
        error.message = `Please filled out the required fields:${params}`;
        error.name = "ValidationError";

        next(error);
      }
    }

    next();
  };
  return middleware;
};

module.exports = validateReqBody;

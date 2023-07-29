/**
 * Middleware to validate request body.
 * Takes in string separated by comma. "Name", "Email", for example.
 * @param  {...any} params
 * @returns
 */
const validateReqBody = (...params) => {
  const middleware = (req, res, next) => {
    for (const param of params) {
      if (!(param in req.body) || !req.body[param]) {
        let error = new Error(`${param} is required.`);
        res.statusCode = 400;
        error.message = `Please fill out the required fields: ${params.join(
          ", "
        )}.`;
        error.name = "ValidationError";

        next(error);
      }
    }

    next();
  };
  return middleware;
};

module.exports = validateReqBody;

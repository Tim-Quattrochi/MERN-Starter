const validateReqBody = (...params) => {
  const middleware = (req, res, next) => {
    for (const param of params) {
      if (!(param in req.body)) {
        return res
          .status(400)
          .json({ error: `${param} is required` });
      }
    }

    next();
  };
  return middleware;
};

module.exports = validateReqBody;

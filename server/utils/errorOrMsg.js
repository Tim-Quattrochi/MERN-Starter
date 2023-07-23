const errorOrMsg = (statusNum, message) => {
  const property = statusNum <= 299 ? "message" : "error";

  return { [property]: message };
};

module.exports = errorOrMsg;

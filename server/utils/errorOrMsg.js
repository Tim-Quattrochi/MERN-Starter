/**
 * @description - Utility function that determines whether to send
 * an error or message property in response messages to the client.
 * @param {number} statusNum - http status code
 * @param {string} message - the message you want to response with.
 * @returns string - message or error depending on the status number.
 */
const errorOrMsg = (statusNum, message) => {
  const property = statusNum <= 299 ? "message" : "error";

  return { [property]: message };
};

module.exports = errorOrMsg;

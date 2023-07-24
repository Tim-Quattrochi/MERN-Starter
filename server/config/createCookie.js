const { APP_NAME } = require("./constants");

/**
 *
 * @param {string} token
 * @param {object} res response
 * @returns {*} res.cookie containing the app name, refresh token, and configurations.
 */
const createCookie = (token, res) => {
  return res.cookie(APP_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });
};

module.exports = createCookie;

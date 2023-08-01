const jwt = require("jsonwebtoken");
const { ACCESS_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_EXPIRES_IN } = require("./constants");

const createAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });

  return accessToken;
};

const createRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRES_IN })
    return refreshToken
}

module.exports = { createAccessToken, createRefreshToken };

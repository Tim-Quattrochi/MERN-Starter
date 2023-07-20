const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV;
const DB_URI = process.env.DB_URI;
const API_URL = process.env.API_URL || "/api";
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "10d";
const APP_NAME = process.env.APP_NAME || "Mern Starter App";

module.exports = {
  PORT,
  NODE_ENV,
  DB_URI,
  API_URL,
  JWT_SECRET,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  JWT_EXPIRES_IN,
  APP_NAME,
};

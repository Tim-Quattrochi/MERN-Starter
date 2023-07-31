const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV;
const DB_URI = process.env.DB_URI;
const API_URL = process.env.API_URL || "/api";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN || "1h";
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "10d";
const APP_NAME = process.env.APP_NAME || "Mern Starter App";

module.exports = {
  PORT,
  NODE_ENV,
  DB_URI,
  API_URL,
  ACCESS_TOKEN_SECRET,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  APP_NAME,
};

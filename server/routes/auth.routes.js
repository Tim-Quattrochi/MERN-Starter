const express = require("express");
const {
  signup,
  login,
  logout,
  refresh,
  list,
} = require("../controllers/auth.controller");
const VerifyJWT = require("../middleware/VerifyJWT");
const validateReqBody = require("../middleware/validateReqBody");
const rateLimiter = require("../middleware/rateLimiter");
const verifyJWT = require("../middleware/VerifyJWT");

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateReqBody("email", "password", "confirmPassword", "name"),
  signup
);
userRouter.post(
  "/login",
  // rateLimiter, commented out for testing
  validateReqBody("email", "password"),
  login
);

userRouter.post("/logout", logout);

userRouter.get("/refresh", refresh);

/**
 * This is just a test route to test protected resources via the VerifyJWT middleware.
 */
userRouter.get("/list", VerifyJWT, list);

module.exports = userRouter;

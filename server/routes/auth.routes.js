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

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateReqBody("email", "password", "confirmPassword", "name"),
  signup
);
userRouter.post(
  "/login",
  rateLimiter,
  validateReqBody("email", "password"),
  login
);

userRouter.post("/logout", logout);

userRouter.get("/refresh", rateLimiter, refresh);
userRouter.get("/list", VerifyJWT, list);

module.exports = userRouter;

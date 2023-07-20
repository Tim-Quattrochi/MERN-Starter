const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const validateReqBody = require("../middleware/validateReqBody");

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateReqBody("email", "password", "confirmPassword", "name"),
  signup
);
userRouter.post(
  "/login",
  validateReqBody("email", "password"),
  login
);

module.exports = userRouter;

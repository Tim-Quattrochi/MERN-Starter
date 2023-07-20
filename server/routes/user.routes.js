const express = require("express");
const User = require("../models/user.model");
const { api } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", api);

module.exports = userRouter;

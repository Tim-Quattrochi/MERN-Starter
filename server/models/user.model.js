const mongoose = require("mongoose");
const { AppError } = require("../middleware/AppError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name."],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please enter an email."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: [true, "Please enter a password."],
      minlength: 8,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

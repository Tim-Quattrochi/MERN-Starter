const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name."],
    },
    email: {
        type: String,
        unique: true,
      required: [true, "Please enter an email."],
    },

    password: {
      type: String,
      required: [true, "Please enter a password."],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

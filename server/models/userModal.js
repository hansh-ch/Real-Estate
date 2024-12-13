const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "User must have email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must provide password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    avatar: {
      type: String,
      default: "/images/default-user",
    },
  },
  {
    timestamps: true,
  }
);

//HASHING PASSWORD
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;

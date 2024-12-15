const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModal");

const getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Got users successfully",
  });
};

const updateUserProfile = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const currUser = await User.findByIdAndUpdate(req.user._id, {
    username,
    email,
    password,
  });
  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
  });
});

module.exports = { getAllUsers, updateUserProfile };

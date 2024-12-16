const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const User = require("../models/userModal");

const getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Got users successfully",
  });
};

//@desc=> update user details
//@route=> PUT--> api/users/updateme
//@access=> public route

const updateUserProfile = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { username, email, password: hashedPass },
    },
    { new: true }
  ).select("-password");
  if (!updatedUser) {
    return next(
      appError("Cannot update details ! Check if you are logged in", 401)
    );
  }

  // const { password, ...rest } = updatedUser._doc;
  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "Profile updated successfully",
  });
});

module.exports = { getAllUsers, updateUserProfile };

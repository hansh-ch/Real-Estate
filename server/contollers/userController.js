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
//@access=> private route

const updateUserProfile = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  let updatedUser;
  if (password) {
    const hashedPass = bcrypt.hashSync(password, 10);
    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { username, email, password: hashedPass },
      },
      { new: true }
    ).select("-password");
  } else {
    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { username, email },
      },
      { new: true }
    ).select("-password");
  }

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

//@desc=> logout user
//@route=> POST--> api/users/logoutme
//@access=> private route

const logoutUser = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

//@desc=> Delete user
//@route=> POST--> api/users/deleteme
//@access=> private route

const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.cookie("token", "");
  res.status(200).json({
    status: "success",
    message: "Deleted account successfully",
  });
});

module.exports = { getAllUsers, updateUserProfile, logoutUser, deleteUser };

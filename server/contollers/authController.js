const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
//@desc=> register a user
//@route=> api/auth/signup
//@access=> public route
const signupUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({
      status: "fail",
      message: "User already exists! Please login in",
    });
  }
  const newUser = await User.create({ username, email, password });
  res.status(200).json({
    status: "success",
    data: newUser,
    message: "Signed up successfully",
  });
};

//@desc=> logging in user
//@route=> api/auth/signin
//@access=> public route

const signinUser = async (req, res, next) => {
  const { email, password } = req.body;

  //1) Finding a user with email
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.json({
      status: "fail",
      message: "Invalid email or password",
    });
  }
  //2) Compare password
  const correctPassword = await bcrypt.compare(password, userExists.password);
  if (!userExists || !correctPassword) {
    return res.json({
      status: "fail",
      message: "Invalid email or password",
    });
  }
  //3) Everything is OK -login user
  const user = await User.findById(userExists._id).select("-password");
  res.status(200).json({
    status: "success",
    data: user,
    message: "Logged in successfully",
  });
};

module.exports = { signupUser, signinUser };

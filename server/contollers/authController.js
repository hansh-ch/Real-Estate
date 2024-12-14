const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
require("dotenv").config();
//@desc=> register a user
//@route=> api/auth/signup
//@access=> public route
const signupUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(appError("All fields are required", 401));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(appError("User already exists! Please login in", 401));
    // return res.json({
    //   status: "fail",
    //   message: "User already exists! Please login in",
    // });
  }
  const newUser = await User.create({ username, email, password });
  res.status(200).json({
    status: "success",
    data: newUser,
    message: "Signed up successfully",
  });
});

//@desc=> logging in user
//@route=> api/auth/signin
//@access=> public route

const signinUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if fields are empty
  if (!email || !password) {
    return next(appError("All fields are required", 401));
  }

  //1) Finding a user with email
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return next(appError("Invalid email or password", 401));
  }
  //2) Compare password
  const correctPassword = await bcrypt.compare(password, userExists.password);
  if (!userExists || !correctPassword) {
    return next(appError("Invalid email or password", 401));
  }
  //3) Everything is OK -login user
  const user = await User.findById(userExists._id).select("-password");

  //4 Creating TOKEN
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    status: "success",
    data: user,
    message: "Logged in successfully",
  });
});

const googleAuth = catchAsync(async (req, res, next) => {
  const { email, name, image, photo } = req.body;
  const user = await User.findOne({ email });

  //Creating new User
  if (!user) {
    const generatePassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatePassword, 10);
    const newUser = new User({
      email,
      username: name.split(" ").join("").toLowerCase(),
      password: hashedPassword,
      avatar: photo,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password, ...rest } = newUser._doc;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    // return next(appError("User doesn't exists", 401));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const { password, ...rest } = user._doc;
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    data: rest,
    message: "Logged in successfully",
  });
});
module.exports = { signupUser, signinUser, googleAuth };

const User = require("../models/userModal");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = catchAsync(async (req, res, next) => {
  //1. Ckecking if token exists
  const token = req.cookies?.token;
  if (!token) {
    return next(
      appError("You are not logged in ! Please login to access", 401)
    );
  }
  //2) If user exists verify token
  let verified_id;
  //   const decoded = await jwt.verify(
  //     token,
  //     process.env.JWT_SECRET,
  //     (err, user) => {
  //       if (err) {
  //         req.user = { isAuth: false };
  //         return next(appError("Token is invalid", 401));
  //         // } else {
  //         //   verified_id = user.id;

  //         //   next();
  //         // }
  //       }
  //     }
  //   );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(appError("You are not logged in", 401));
  } else {
    req.user = user;
    next();
  }
});

module.exports = { verifyUser };

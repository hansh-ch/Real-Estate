const express = require("express");
const {
  signupUser,
  signinUser,
  googleAuth,
} = require("../contollers/authController");

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
router.route("/google").post(googleAuth);
module.exports = router;

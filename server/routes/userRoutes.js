const express = require("express");
const {
  getAllUsers,
  updateUserProfile,
  deleteUser,
  logoutUser,
} = require("../contollers/userController");
const { verifyUser } = require("../middlewares/protectMiddleware");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/updateme").put(verifyUser, updateUserProfile);
router.route("/deleteme").post(verifyUser, deleteUser);
router.route("/signout").post(verifyUser, logoutUser);
module.exports = router;

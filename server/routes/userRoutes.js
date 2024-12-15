const express = require("express");
const {
  getAllUsers,
  updateUserProfile,
} = require("../contollers/userController");
const { verifyUser } = require("../middlewares/protectMiddleware");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/updateme").put(verifyUser, updateUserProfile);
module.exports = router;

const express = require("express");
const { getAllUsers } = require("../contollers/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
module.exports = router;

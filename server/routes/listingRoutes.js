const express = require("express");
const { createList } = require("../contollers/listingController");
const { verifyUser } = require("../middlewares/protectMiddleware");
const router = express.Router();

router.use(verifyUser);
router.route("/create").post(createList);
module.exports = router;

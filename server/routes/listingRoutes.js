const express = require("express");
const { createList, getListById } = require("../contollers/listingController");
const { verifyUser } = require("../middlewares/protectMiddleware");
const upload = require("../utils/multer");
const router = express.Router();

router.use(verifyUser);
// router.post("/upload", upload.array("image", 6), uploadImages);
router.route("/create").post(createList);
router.route("/:id").get(getListById);

// router.route("/create").post(createList);
module.exports = router;

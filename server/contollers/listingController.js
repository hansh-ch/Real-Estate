const { Listing } = require("../models/listingModal");
const catchAsync = require("../utils/catchAsync");

let imgFileName = [];

// @desc==> upload images using multer
// @route ==> /api/listing/upload
// @ access==> private
const uploadImages = catchAsync(async (req, res, next) => {
  req.files.map((file) => {
    imgFileName.push(file.filename);

    // res.status(200).json({
    //   status: "success",
    // });
  });

  next();
});
console.log(imgFileName);
// @desc==> create a new list
// @route ==> /api/listing/create
// @ access==> private

const createList = catchAsync(async (req, res, next) => {
  // const list = await Listing.create(req.body);
  // res.status(200).json({
  //   status: "success",
  //   message: "List created successfully",
  //   data: list,
  // });
});
module.exports = { createList, uploadImages };

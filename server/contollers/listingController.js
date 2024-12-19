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
  // console.log(req.user);
  const {
    name,
    description,
    address,
    type,
    parking,
    furnished,
    bedrooms,
    bathrooms,
    regularPrice,
    discountPrice,
    imgUrls,
  } = req.body;
  // console.log(req.body);
  // imageURLs
  const list = await Listing.create({
    name,
    description,
    address,
    type,
    parking,
    furnished,
    bedrooms,
    bathrooms,
    regularPrice,
    discountPrice,
    imageURLs: imgUrls,
    userRef: req.user._id,
  });
  res.status(200).json({
    status: "success",
    message: "List created successfully",
    // data: list,
  });
});
module.exports = { createList, uploadImages };

const { Listing } = require("../models/listingModal");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
    data: list,
  });
});
// @desc==> show  list
// @route ==> /api/lists
// @ access==> private

const getListById = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(appError("You are not logged in", 401));
  }
  const list = await Listing.findById(req.params.id);
  if (!list) {
    return next(appError("Can't find list"));
  }
  res.status(200).json({
    status: "success",
    message: "List found successfully",
    data: list,
  });
});
module.exports = { createList, getListById };

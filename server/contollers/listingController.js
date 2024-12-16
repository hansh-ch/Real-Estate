const Listing = require("../models/listingModal");
const catchAsync = require("../utils/catchAsync");

const createList = catchAsync(async (req, res, next) => {
  const list = await Listing.create(req.body);
  res.status(200).json({
    status: "success",
    message: "List created successfully",
    data: list,
  });
});

module.exports = { createList };

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imagePath: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: "Listing",
  },
});

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Please provide price"],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      required: [true, "Please provide number of bathrooms"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please provide number of beds"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Provide true or false"],
    },
    parking: {
      type: Boolean,
      required: [true, "Provide true or false"],
    },
    type: {
      type: String,
      required: [true, "Provide type"],
    },
    // offer: {
    //   type: Boolean,
    //   required: [true, "Provide true or false"],
    // },
    imageURLs: Array,
    userRef: String,
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);
const Image = mongoose.model("Image", imageSchema);
module.exports = { Listing, Image };

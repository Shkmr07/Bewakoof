const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [{ type: String }],
    ratings: {
      type: Number,
      default: 0, // Average rating
      min: 0,
      max: 5,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // To track which user/admin added the product
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

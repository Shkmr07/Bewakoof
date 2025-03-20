const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { addReview, getProductReviews, deleteReview } = require("../controllers/review.controller");

const reviewRoute = express.Router();

reviewRoute.post("/add", auth, addReview);
reviewRoute.get("/:productId", getProductReviews);
reviewRoute.delete("/:reviewId", auth, deleteReview);

module.exports = reviewRoute;

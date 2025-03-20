const Review = require("../models/Review");
const Product = require("../models/Product");

// Add a review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.userId;

    const review = new Review({ product: productId, user: userId, rating, comment });
    await review.save();

    res.status(201).json({ message: "✅ Review added successfully", review });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate("user", "name");

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

// Delete a review (Only Admin or Review Owner)
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "❌ Review not found" });

    if (review.user.toString() !== userId && req.user.role !== "Admin") {
      return res.status(403).json({ message: "❌ Not authorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "✅ Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

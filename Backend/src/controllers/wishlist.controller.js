const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: "✅ Product added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "❌ Error adding to wishlist" });
  }
};


const getWishlist = async (req, res) => {
    try {
      const userId = req.user.userId;
      const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
      
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      res.status(200).json(wishlist);
    } catch (err) {
      res.status(500).json({ message: "❌ Error fetching wishlist" });
    }
  };

  
const removeFromWishlist = async (req, res) => {
try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: "✅ Product removed from wishlist", wishlist });
} catch (err) {
    res.status(500).json({ message: "❌ Error removing from wishlist" });
}
};


module.exports = {addToWishlist, getWishlist, removeFromWishlist}
  
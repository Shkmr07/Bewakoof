const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity; // Update quantity
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "✅ Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "🛒 Cart is empty" });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: "❌ Product removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.userId });
    res.status(200).json({ message: "🛒 Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

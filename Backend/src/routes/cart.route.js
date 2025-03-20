const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");
const access = require("../middlewares/access.middleware");

const cartRoute = express.Router();

cartRoute.post("/add", auth, access("Admin", "User"), addToCart);
cartRoute.get("/", auth, access("Admin", "User"), getCart);
cartRoute.post("/remove", auth, access("Admin", "User"), removeFromCart);
cartRoute.delete("/clear", auth, access("Admin", "User"), clearCart);

module.exports = cartRoute;

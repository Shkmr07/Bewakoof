const express = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const wishlistRoute = require("./wishlist.route");
const cartRoute = require("./cart.route");
const reviewRoute = require("./review.route");

const routes = express.Router();

routes.use("/users", userRoute);
routes.use("/products", productRoute);
routes.use("/wishlist",wishlistRoute)
routes.use("/cart",cartRoute)
routes.use("/review",reviewRoute)

module.exports = routes;

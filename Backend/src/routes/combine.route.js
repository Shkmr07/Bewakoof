const express = require("express");
const userRoute = require("./user.route");
const blacklistRoute = require("./blacklist.route");
const productRoute = require("./product.route");

const routes = express.Router();

routes.use("/users", userRoute);
routes.use("/products", productRoute);

module.exports = routes;

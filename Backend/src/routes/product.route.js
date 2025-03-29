const express = require("express");
const auth = require("../middlewares/auth.middleware");
const access = require("../middlewares/access.middleware");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const productRoute = express.Router();

productRoute.post(
  "/add-product",
  auth,
  access("Admin"),
  upload.array("photo", 5),
  addProduct
);

productRoute.get("/", getProducts);
productRoute.get("/:id", auth, getProductById);
productRoute.put(
  "/update/:id",
  auth,
  access("Admin"),
  upload.array("photo", 5),
  updateProduct
);
productRoute.put("/delete/:id", auth, access("Admin"), deleteProduct);

module.exports = productRoute;

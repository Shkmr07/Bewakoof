const Product = require("../models/Product");

const addProduct = async (req, res) => {
  const payload = req.body;

  try {
    const product = new Product(payload);
    product.createdBy = req.user.userId;
    await product.save();
    res.status(201).json({ message: "✅ Product added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `❌ Error creating product ${err.message}` });
  }
};

module.exports = addProduct;

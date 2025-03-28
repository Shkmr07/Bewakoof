const cloudinary = require("../../cloudinaryConfig");
const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Upload images to Cloudinary async 
    const imageUrls = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );

    // Now create and save the product
    const product = new Product({
      ...req.body, // Include other fields
      images: imageUrls, // Store image URLs
      createdBy: req.user.userId, // Store user ID
    });

    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    res.status(500).json({ message: `❌ Error creating product: ${err.message}` });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body); // Update fields

    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "products" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            uploadStream.end(file.buffer);
          });
        })
      );
      product.images = imageUrls;
    }

    await product.save();
    res.status(200).json({ message: "✅ Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `❌ Error: ${err.message}` });
  }
};

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };

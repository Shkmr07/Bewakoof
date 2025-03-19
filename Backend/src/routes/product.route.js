const express = require("express")
const auth = require("../middlewares/auth.middleware")
const access = require("../middlewares/access.middleware")
const addProduct = require("../controllers/product.controller")
const multer = require("multer")

const productRoute = express.Router()


productRoute.post("/add-product",auth,access("Admin"),addProduct)



module.exports = productRoute
const express = require("express")
const access = require("../middlewares/access.middleware")
const auth = require("../middlewares/auth.middleware")
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/wishlist.controller")

const wishlistRoute = express.Router()

wishlistRoute.get("/",auth,access("Admin","User"),getWishlist)
wishlistRoute.post("/add",auth,access("Admin","User"),addToWishlist)
wishlistRoute.delete("/delete",auth,access("Admin","User"),removeFromWishlist)


module.exports = wishlistRoute
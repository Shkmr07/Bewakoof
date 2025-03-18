const express = require("express")
const { register, login, refreshToken } = require("../controllers/user.controller")
const auth = require("../middlewares/auth.middleware")
const access = require("../middlewares/access.middleware")

const userRoute = express.Router()

userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/refreshToken",auth,access("Admin","User"),refreshToken)


module.exports = userRoute
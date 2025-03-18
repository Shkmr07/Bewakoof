const express = require("express")
const userRoute = require("./user.route")
const blacklistRoute = require("./blacklist.route")

const routes = express.Router()

routes.use("/users",userRoute)



module.exports = routes
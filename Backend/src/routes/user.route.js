const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
  profile,
  updateProfile,
  deleteProfile,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const access = require("../middlewares/access.middleware");

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/refresh-token", refreshToken);
userRoute.post("/logout", auth, logout);
userRoute.get("/profile", auth, profile);
userRoute.patch("/update-profile", auth, updateProfile);
userRoute.delete("delete/:id", auth, access("Admin"), deleteProfile);

module.exports = userRoute;

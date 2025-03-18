const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist");

const register = async (req, res) => {
  try {
    await User.create(req.body);

    res.status(201).json({ message: "✅ Registration Successful" });
  } catch (err) {
    // ✅ Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ message: "❌ Email already exists!" });
    }

    res.status(500).json({ message: `❌ Registration Error: ${err.message}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Wrong Credentials" });
    }

    const encryptData = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = jwt.sign(encryptData, process.env.SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN,
    });
    const refreshToken = jwt.sign(encryptData, process.env.SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN,
    });

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.MAX_AGE),
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "✅ Login Successful", accessToken });
  } catch (err) {
    res.status(500).json({ message: `❌ Login error ${err.message}` });
  }
};

const refreshToken = async (req, res) => {
    const isRefreshToken = req.cookies?.RefreshToken;
    if (!isRefreshToken) {
      return res.status(401).json({ message: "❌ Login Required" });
    }
  
    try {
      // Check if token is blacklisted
      const isBlacklist = await Blacklist.findOne({ token: isRefreshToken });
  
      if (isBlacklist) {
        return res.status(401).json({ message: "❌ Token is blacklisted" });
      }
  
      // Verify refresh token
      const decode = jwt.verify(isRefreshToken, process.env.SECRET_KEY);
  
      // Ensure user exists
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.status(404).json({ message: "❌ User not found" });
      }
  
      // Generate new access token
      const encryptedData = { userId: user.id, role: user.role };
      const accessToken = jwt.sign(encryptedData, process.env.SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN || "15m",
      });
  
      res.status(200).json({ message: "✅ Access token generated", accessToken });
    } catch (err) {
      console.error("Error in refreshToken:", err.message);
      
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "❌ Refresh token expired" });
      }
      
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "❌ Invalid refresh token" });
      }
  
      res.status(500).json({ message: "❌ Error generating access token" });
    }
  };

module.exports = { register, login, refreshToken };

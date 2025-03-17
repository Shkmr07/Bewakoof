const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const isToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");
  if (!isToken) {
    return res.status(401).json({ message: "Login Required" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, process.env.SECERT_KEY);

    req.user = decode;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = auth;

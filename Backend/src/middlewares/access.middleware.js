const access = (...roleArr) => {
    return (req, res, next) => {
      if (!req.user || !roleArr.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Unauthorized access" });
      }
      next();
    };
  };
  
  module.exports = access;
  
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const {User} = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found. Unauthorized." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token.", error});
  }
};

module.exports = authMiddleware;
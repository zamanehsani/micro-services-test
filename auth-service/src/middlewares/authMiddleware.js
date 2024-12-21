// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to verify token and attach user info to the request
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Authentication token missing" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach the user payload (id, role) to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check user roles for protected routes
export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

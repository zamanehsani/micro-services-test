// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

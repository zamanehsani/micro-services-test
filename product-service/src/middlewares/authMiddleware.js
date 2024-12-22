// const axios = require("axios");
// const jwt = require("jsonwebtoken");

// import axios from "axios";
import jwt from "jsonwebtoken";

// const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    // Validate token locally or call auth-service
    const payload = jwt.verify(token, SECRET);

    console.log("payload : ", payload);
    // Optionally validate with auth-service
    // const response = await axios.post(`${AUTH_SERVICE_URL}/auth/verify`, {
    //   token,
    // });

    // if (!response.data.valid) {
    //   return res.status(401).json({ message: "Invalid token" });
    // }

    req.user = payload; // Attach user info to request
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

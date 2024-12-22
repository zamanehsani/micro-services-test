// const express = require("express");
// const { getProducts, addProduct } = require("../controllers/productController");
// const { verifyToken, requireRole } = require("../middlewares/authMiddleware");

import express from "express";
import { getProducts, addProduct } from "../controllers/productController.js";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.get("/", verifyToken, getProducts); // Public access for all authenticated users
router.post("/", verifyToken, requireRole("admin"), addProduct); // Admin-only access

// module.exports = router;

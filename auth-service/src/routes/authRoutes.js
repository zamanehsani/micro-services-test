// const express = require("express");
// const { register, login } = require("../controllers/authController");

import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  getUserDetails,
  updateUserRole,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/details", authenticate, getUserDetails); // Get user details
router.put("/role/:id", authenticate, authorize(["admin"]), updateUserRole); // Update user role

// module.exports = router;

// const express = require("express");
// const authRoutes = require("./routes/authRoutes");

import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;

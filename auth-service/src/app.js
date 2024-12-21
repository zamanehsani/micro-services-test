// const express = require("express");
// const authRoutes = require("./routes/authRoutes");

import express from "express";
import { router } from "./routes/authRoutes.js";

export const app = express();
app.use(express.json());

// Routes
app.use("/api/user", router);

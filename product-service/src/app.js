// const express = require("express");
// const productRoutes = require("./routes/productRoutes");

import express from "express";
import { productRoutes } from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));

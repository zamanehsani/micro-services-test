// const prisma = require("../prismaClient");

import { prisma } from "../prismaClient.js";

// Get all products
export const getProducts = async (req, res) => {
  console.log("req body: ", req.body);
  console.log("req user: ", req.user);
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price },
    });
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

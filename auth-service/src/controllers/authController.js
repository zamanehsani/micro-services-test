// const bcrypt = require("bcrypt");
// const jwt = require("../utils/jwt");
// const prisma = require("../prismaClient");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const TOKEN_EXPIRATION = "1h"; // Adjust expiration as needed

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });

  res.status(200).json({ token });
};

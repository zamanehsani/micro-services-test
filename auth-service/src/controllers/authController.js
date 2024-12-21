// const bcrypt = require("bcrypt");
// const jwt = require("../utils/jwt");
// const prisma = require("../prismaClient");
import bcrypt from "bcrypt";
import jwt from "../utils/jwt";
import prisma from "../prismaClient";

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

  const token = jwt.generateToken({ id: user.id, role: user.role });
  res.status(200).json({ token });
};

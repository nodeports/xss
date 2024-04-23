import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import sanitizeHtml from "sanitize-html";

const secretKey = "app-secretkey";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const sanitizedUsername = sanitizeHtml(username);
    const user = new User({ username: sanitizedUsername, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: sanitizeHtml(username) });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

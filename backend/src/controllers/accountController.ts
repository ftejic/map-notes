import User from "../models/userModel";
import { Request, Response } from "express";

async function register(req: Request, res: Response) {
  const { uid, email } = req.body;

  if (!uid || !email) {
    return res
      .status(400)
      .json({ message: `${!uid ? "UID" : "Email"} missing!` });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User with that email already exist!" });
    }

    const newUser = new User({ uid, email });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { register };

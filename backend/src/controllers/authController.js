import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const signup = (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExist = User.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedpassword = bcrypt.hash(password, 10);
    const createdUser = User.create({
      name,
      email,
      phone,
      password: hashedpassword,
    });
    if (!createdUser) {
      return res.status(400).json({
        success: false,
        message: "User registeration failed please try again later",
      });
    }

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: " Singup failed" });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const compare = bcrypt.compare(password, userExist.password);

    if (!compare) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

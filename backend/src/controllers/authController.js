import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      email,
      phone,
      role,
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
    res.status(500).json({ success: false, message: "Singup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
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

    const payload = {
      userId: userExist.distinct,
      role: userExist.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      data: { message: "User logged in successfully", token },
    });
  } catch {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    workRole: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userModel);
export default User;

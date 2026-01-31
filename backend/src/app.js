import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
const ORIGIN = process.env.ORIGIN;
app.use(morgan("dev"));
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;

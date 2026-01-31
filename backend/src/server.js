import "dotenv/config";
import http from "http";
import app from "./app.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { socketAuth } from "./middlewares/socketAuth.js";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const ORIGIN = process.env.ORIGIN;

const server = http.createServer(app);

export const io = new Server(server, {
  path: "/socket.io/",
  cors: {
    origin: ORIGIN,
    credentials: true,
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log(
    `🟢 Socket connected: ${socket.user.userId} (${socket.user.role})`,
  );
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User joined room:${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.user.userId);
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Db is connected successfully ✅");
    server.listen(PORT, () => {
      console.log(`Server is running on the port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Could not connected to MongoDB", err));

import "dotenv/config";
import http from "http";
import app from "./app";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { socketAuth } from "./middlewares/socketAuth";
import { startCronJobs } from "./services/cronService";

interface DecodedToken {
  userId: string;
  role: "USER" | "ADMIN";
}

interface CustomSocket extends Socket {
  user?: DecodedToken;
}

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;
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

io.on("connection", (socket: CustomSocket) => {
  if (socket.user) {
    console.log(
      `🟢 Socket connected: ${socket.user.userId} (${socket.user.role})`
    );
  }

  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`User joined room:${userId}`);
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      console.log("🔴 Socket disconnected:", socket.user.userId);
    }
  });
});

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => {
    console.log("Db is connected successfully ✅");
    
    startCronJobs();
    server.listen(PORT, () => {
      console.log(`Server is running on the port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB", err);
    console.log("MONGODB_URI present:", !!MONGODB_URI);
  });

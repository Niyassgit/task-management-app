import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket) return socket;

  // Ensure we connect to the root URL, not the key specific API path
  const socketUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

  socket = io(socketUrl, {
    path: "/socket.io/",
    auth: {
      token,
    },
    withCredentials: true,
    transports: ["websocket", "polling"], // Added polling as fallback
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

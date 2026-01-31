import jwt from "jsonwebtoken";

export const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized user: Token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    socket.join(decoded.userId);
    next();
  } catch (error) {
    console.error("Socket Auth Error:", error.message);
    next(new Error("Internal server error while authenticating user"));
  }
};

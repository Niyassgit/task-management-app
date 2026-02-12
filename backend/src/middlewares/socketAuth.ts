import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: "USER" | "ADMIN";
}

export const socketAuth = (socket: Socket & { user?: DecodedToken }, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized user: Token missing"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as DecodedToken;

    socket.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    socket.join(decoded.userId);
    next();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error while authenticating user";
    console.error("Socket Auth Error:", errorMessage);
    next(new Error(errorMessage));
  }
};

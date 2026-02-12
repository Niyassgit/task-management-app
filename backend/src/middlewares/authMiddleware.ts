import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: "USER" | "ADMIN";
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      const tokenString = token.substring(7);
      const decoded = jwt.verify(
        tokenString,
        process.env.JWT_SECRET as string
      ) as unknown as DecodedToken;

      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Authentication required, please login again",
      });
    }
  } catch (error) {
    console.log("auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

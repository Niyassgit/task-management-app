import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (role: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || req.user.role.toLowerCase().trim() !== role.trim().toLowerCase()) {
            return res.status(403).json({ success: false, message: "Authorisation failed" });
        }
        next();
    } catch (error) {
        console.error("Role middleware error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
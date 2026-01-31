export const roleMiddleware = (role) => (req, res, next) => {
    try {
        if (req.user.role.toLowerCase().trim() !== role.trim().toLowerCase()) {
            return res.status(403).json({ success: false, message: "Authorisation failed" });
        }
        next();
    } catch (error) {
        console.error("Role middleware error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
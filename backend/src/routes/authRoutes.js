import express from "express";
import { login, signup } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../validators/registerSchema.js";
import { loginSchema } from "../validators/loginSchema.js";

const router = express.Router();

router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;

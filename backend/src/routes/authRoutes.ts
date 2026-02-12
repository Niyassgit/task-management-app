import express, { Router } from "express";
import { login, signup } from "../controllers/authController";
import { validate } from "../middlewares/validateMiddleware";
import { registerSchema } from "../validators/registerSchema";
import { loginSchema } from "../validators/loginSchema";

const router: Router = express.Router();

router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;

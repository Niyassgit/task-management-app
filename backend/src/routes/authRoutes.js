import express from "express";
import { login, signup } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../validators/registerSchema.js";

const router = express.Router();

router.post("/signup", validate(registerSchema), signup);
router.post("/login", login);

export default router;

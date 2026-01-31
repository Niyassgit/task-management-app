import express from "express";
import {
  getAllWorks,
  updateWorkStatus,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("USER"));
router.get("/works", getAllWorks);
router.patch("/status/:taskId", updateWorkStatus);

export default router;

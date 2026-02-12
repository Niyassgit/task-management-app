import express, { Router } from "express";
import {
  getAllWorks,
  updateWorkStatus,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router: Router = express.Router();

router.use(authMiddleware, roleMiddleware("USER"));
router.get("/works", getAllWorks);
router.patch("/status/:taskId", updateWorkStatus);

export default router;

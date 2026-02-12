import express, { Router } from "express";
import {
  createWork,
  deleteWork,
  getAllUsers,
  getAllWorksForAdmin,
  updateWork,
} from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import {
  createWorkSchema,
  updateWorkSchema,
} from "../validators/workSchema";

const router: Router = express.Router();

router.use(authMiddleware, roleMiddleware("ADMIN"));
router.get("/users", getAllUsers);
router.get("/tasks", getAllWorksForAdmin);
router.post("/task", validate(createWorkSchema), createWork);
router.patch("/task/:taskId", validate(updateWorkSchema), updateWork);
router.delete("/task/:taskId", deleteWork);

export default router;

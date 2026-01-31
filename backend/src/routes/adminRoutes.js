import express from "express";
import {
  createWork,
  deleteWork,
  getAllUsers,
  getAllWorksForAdmin,
  updateWork,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  createWorkSchema,
  updateWorkSchema,
} from "../validators/workSchema.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("ADMIN"));
router.get("/users", getAllUsers);
router.get("/tasks", getAllWorksForAdmin);
router.post("/task", validate(createWorkSchema), createWork);
router.patch("/task/:taskId", validate(updateWorkSchema), updateWork);
router.delete("/task/:taskId", deleteWork);

export default router;

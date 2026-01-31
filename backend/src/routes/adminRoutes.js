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
router.get("/works", getAllWorksForAdmin);
router.post("/createWork", validate(createWorkSchema), createWork);
router.patch("/work/:workId", validate(updateWorkSchema), updateWork);
router.delete("/work/:workId", deleteWork);

export default router;

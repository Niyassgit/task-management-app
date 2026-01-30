import express from "express";
import { getAllWorks } from "../controllers/userController.js";

const router=express.Router();

router.get("/works",getAllWorks);

export default router;
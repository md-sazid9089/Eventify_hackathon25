// backend/routes/StudentDashboardRoutes.js
import express from "express";
import { registerEvent, getMyEvents } from "../controllers/StudentDashboardController.js";

const router = express.Router();

router.post("/register", registerEvent);
router.get("/:userId", getMyEvents);

export default router;

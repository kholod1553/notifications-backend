import express from "express";
import { auth } from "../../middlewares/auth.js";
import {
  getNotifications,
  markAsRead
} from "./notification.controller.js";

const router = express.Router();

router.get("/", auth, getNotifications);
router.patch("/:id/read", auth, markAsRead);

export default router;
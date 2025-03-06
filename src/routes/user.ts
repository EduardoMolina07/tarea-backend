// src/routes/user.ts
import { Router } from "express";
import {
  listUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
  deleteUserCtrl,
} from "../controllers/user.control";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Rutas protegidas: solo ADMIN
 */
router.get("/list", authMiddleware, adminMiddleware, listUsersCtrl);
router.get("/:id", authMiddleware, adminMiddleware, getUserCtrl);
router.put("/:id", authMiddleware, adminMiddleware, updateUserCtrl);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUserCtrl);

export { router };
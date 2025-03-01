import { Router } from "express";
import {
  createPersonajeCtrl,
  getListaPersonajeCtrl,
  getPersonajeCtrl,
  deletePersonajeCtrl,
  updatePersonajeCtrl,
} from "../controllers/personaje.ctrl";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Todas las rutas requieren autenticación (JWT).
 */
router.post("/", authMiddleware, createPersonajeCtrl);
router.get("/list", authMiddleware, getListaPersonajeCtrl);
router.get("/only/:id", authMiddleware, getPersonajeCtrl);
router.delete("/:id", authMiddleware, deletePersonajeCtrl);
router.put("/", authMiddleware, updatePersonajeCtrl);

export { router };
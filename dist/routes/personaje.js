"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const personaje_ctrl_1 = require("../controllers/personaje.ctrl");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * Todas las rutas requieren autenticación (JWT).
 */
router.post("/", auth_middleware_1.authMiddleware, personaje_ctrl_1.createPersonajeCtrl);
router.get("/list", auth_middleware_1.authMiddleware, personaje_ctrl_1.getListaPersonajeCtrl);
router.get("/only/:id", auth_middleware_1.authMiddleware, personaje_ctrl_1.getPersonajeCtrl);
router.delete("/:id", auth_middleware_1.authMiddleware, personaje_ctrl_1.deletePersonajeCtrl);
router.put("/", auth_middleware_1.authMiddleware, personaje_ctrl_1.updatePersonajeCtrl);

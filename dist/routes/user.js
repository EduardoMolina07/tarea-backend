"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/routes/user.ts
const express_1 = require("express");
const user_ctrl_1 = require("../controllers/user.ctrl");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * Rutas protegidas: solo ADMIN
 */
router.get("/list", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, user_ctrl_1.listUsersCtrl);
router.get("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, user_ctrl_1.getUserCtrl);
router.put("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, user_ctrl_1.updateUserCtrl);
router.delete("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, user_ctrl_1.deleteUserCtrl);

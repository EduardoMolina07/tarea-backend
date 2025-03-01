"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/routes/auth.ts
const express_1 = require("express");
const auth_ctrl_1 = require("../controllers/auth.ctrl");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * Registro
 */
router.post("/register", [
    (0, express_validator_1.body)("nombre").notEmpty().withMessage("El nombre es requerido"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Email inválido"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
], auth_ctrl_1.registerCtrl);
/**
 * Login
 */
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email inválido"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
], auth_ctrl_1.loginCtrl);

// src/routes/auth.ts
import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth.control";
import { body } from "express-validator";

const router = Router();

/**
 * Registro
 */
router.post(
  "/register",
  [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("email").isEmail().withMessage("Email inválido"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  ],
  registerCtrl
);

/**
 * Login
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  ],
  loginCtrl
);

export { router };
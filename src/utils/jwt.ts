// src/utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

/**
 * Genera un token con duración de 5 minutos.
 */
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
};

/**
 * Verifica un token JWT.
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
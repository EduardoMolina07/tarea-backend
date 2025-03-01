// src/services/auth.srv.ts
import { generateToken } from "../utils/jwt";
import { createUserSrv, findUserByEmail } from "./user.srv";
import bcrypt from "bcryptjs";

/**
 * Registra un usuario.
 */
export const registerSrv = async (nombre: string, email: string, password: string) => {
  return createUserSrv(nombre, email, password);
};

/**
 * Login: valida credenciales y retorna un token JWT.
 */
export const loginSrv = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user || !user.flag) {
    throw new Error("Credenciales inválidas");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }
  const token = generateToken({ id: user.id, rol: user.rol });
  return { token };
};
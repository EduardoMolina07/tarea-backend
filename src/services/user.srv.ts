// src/services/user.srv.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Crea un usuario (rol REGULAR por defecto) y encripta la contraseña.
 */
export const createUserSrv = async (nombre: string, email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("El email ya está registrado");
  }
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      nombre,
      email,
      password: hashed,
      rol: "REGULAR"
    },
  });
};

/**
 * Busca un usuario por email (para login).
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

/**
 * Lista todos los usuarios activos (flag true).
 */
export const listUsersSrv = async () => {
  return prisma.user.findMany({ where: { flag: true } });
};

/**
 * Obtiene un usuario por ID.
 */
export const getUserByIdSrv = async (id: number) => {
  return prisma.user.findFirst({ where: { id, flag: true } });
};

/**
 * Actualiza datos de un usuario.
 */
export const updateUserSrv = async (id: number, data: { nombre?: string; email?: string; rol?: string }) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Soft delete: marca flag en false.
 */
export const softDeleteUserSrv = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { flag: false },
  });
};
// src/services/personaje.srv.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Crea un personaje y lo asocia al usuario.
 */
export const createPersonajeSrv = async (userId: number, data: { nombre: string; foto: string }) => {
  if (!data.nombre) throw new Error("El nombre es requerido");
  return prisma.personaje.create({
    data: {
      nombre: data.nombre,
      foto: data.foto,
      userId,
    },
  });
};

/**
 * Lista personajes:
 * - Si es ADMIN, devuelve todos.
 * - Si es REGULAR, solo los del usuario.
 */
export const getListaPersonajeSrv = async (userId: number, rol: string) => {
  if (rol === "ADMIN") {
    return prisma.personaje.findMany({ where: { flag: true } });
  } else {
    return prisma.personaje.findMany({ where: { userId, flag: true } });
  }
};

/**
 * Obtiene un personaje por ID, verificando que pertenezca al usuario (si no es ADMIN).
 */
export const getPersonajeSrv = async (id: number, userId: number, rol: string) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { userId }),
    },
  });
  if (!personaje) {
    throw new Error("Personaje no encontrado o no tienes acceso");
  }
  return personaje;
};

/**
 * Soft delete de personaje.
 */
export const deletePersonajeSrv = async (id: number, userId: number, rol: string) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { userId }),
    },
  });
  if (!personaje) throw new Error("Personaje no encontrado o no tienes acceso");
  return prisma.personaje.update({
    where: { id },
    data: { flag: false },
  });
};

/**
 * Actualiza un personaje.
 */
export const updatePersonajeSrv = async (
  id: number,
  userId: number,
  rol: string,
  data: { nombre: string; foto: string }
) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { userId }),
    },
  });
  if (!personaje) throw new Error("Personaje no encontrado o no tienes acceso");
  if (!data.nombre) throw new Error("El nombre es requerido");

  return prisma.personaje.update({
    where: { id },
    data: {
      nombre: data.nombre,
      foto: data.foto,
    },
  });
};
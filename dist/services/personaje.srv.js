"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonajeSrv = exports.deletePersonajeSrv = exports.getPersonajeSrv = exports.getListaPersonajeSrv = exports.createPersonajeSrv = void 0;
// src/services/personaje.srv.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Crea un personaje y lo asocia al usuario.
 */
const createPersonajeSrv = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.nombre)
        throw new Error("El nombre es requerido");
    return prisma.personaje.create({
        data: {
            nombre: data.nombre,
            foto: data.foto,
            userId,
        },
    });
});
exports.createPersonajeSrv = createPersonajeSrv;
/**
 * Lista personajes:
 * - Si es ADMIN, devuelve todos.
 * - Si es REGULAR, solo los del usuario.
 */
const getListaPersonajeSrv = (userId, rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (rol === "ADMIN") {
        return prisma.personaje.findMany({ where: { flag: true } });
    }
    else {
        return prisma.personaje.findMany({ where: { userId, flag: true } });
    }
});
exports.getListaPersonajeSrv = getListaPersonajeSrv;
/**
 * Obtiene un personaje por ID, verificando que pertenezca al usuario (si no es ADMIN).
 */
const getPersonajeSrv = (id, userId, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const personaje = yield prisma.personaje.findFirst({
        where: Object.assign({ id, flag: true }, (rol !== "ADMIN" && { userId })),
    });
    if (!personaje) {
        throw new Error("Personaje no encontrado o no tienes acceso");
    }
    return personaje;
});
exports.getPersonajeSrv = getPersonajeSrv;
/**
 * Soft delete de personaje.
 */
const deletePersonajeSrv = (id, userId, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const personaje = yield prisma.personaje.findFirst({
        where: Object.assign({ id, flag: true }, (rol !== "ADMIN" && { userId })),
    });
    if (!personaje)
        throw new Error("Personaje no encontrado o no tienes acceso");
    return prisma.personaje.update({
        where: { id },
        data: { flag: false },
    });
});
exports.deletePersonajeSrv = deletePersonajeSrv;
/**
 * Actualiza un personaje.
 */
const updatePersonajeSrv = (id, userId, rol, data) => __awaiter(void 0, void 0, void 0, function* () {
    const personaje = yield prisma.personaje.findFirst({
        where: Object.assign({ id, flag: true }, (rol !== "ADMIN" && { userId })),
    });
    if (!personaje)
        throw new Error("Personaje no encontrado o no tienes acceso");
    if (!data.nombre)
        throw new Error("El nombre es requerido");
    return prisma.personaje.update({
        where: { id },
        data: {
            nombre: data.nombre,
            foto: data.foto,
        },
    });
});
exports.updatePersonajeSrv = updatePersonajeSrv;

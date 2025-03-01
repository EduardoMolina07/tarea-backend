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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteUserSrv = exports.updateUserSrv = exports.getUserByIdSrv = exports.listUsersSrv = exports.findUserByEmail = exports.createUserSrv = void 0;
// src/services/user.srv.ts
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
/**
 * Crea un usuario (rol REGULAR por defecto) y encripta la contraseña.
 */
const createUserSrv = (nombre, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error("El email ya está registrado");
    }
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    return prisma.user.create({
        data: {
            nombre,
            email,
            password: hashed,
            rol: "REGULAR"
        },
    });
});
exports.createUserSrv = createUserSrv;
/**
 * Busca un usuario por email (para login).
 */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findUnique({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
/**
 * Lista todos los usuarios activos (flag true).
 */
const listUsersSrv = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany({ where: { flag: true } });
});
exports.listUsersSrv = listUsersSrv;
/**
 * Obtiene un usuario por ID.
 */
const getUserByIdSrv = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findFirst({ where: { id, flag: true } });
});
exports.getUserByIdSrv = getUserByIdSrv;
/**
 * Actualiza datos de un usuario.
 */
const updateUserSrv = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.update({
        where: { id },
        data,
    });
});
exports.updateUserSrv = updateUserSrv;
/**
 * Soft delete: marca flag en false.
 */
const softDeleteUserSrv = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.update({
        where: { id },
        data: { flag: false },
    });
});
exports.softDeleteUserSrv = softDeleteUserSrv;

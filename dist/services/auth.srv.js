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
exports.loginSrv = exports.registerSrv = void 0;
// src/services/auth.srv.ts
const jwt_1 = require("../utils/jwt");
const user_srv_1 = require("./user.srv");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Registra un usuario.
 */
const registerSrv = (nombre, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, user_srv_1.createUserSrv)(nombre, email, password);
});
exports.registerSrv = registerSrv;
/**
 * Login: valida credenciales y retorna un token JWT.
 */
const loginSrv = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_srv_1.findUserByEmail)(email);
    if (!user || !user.flag) {
        throw new Error("Credenciales inválidas");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Credenciales inválidas");
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, rol: user.rol });
    return { token };
});
exports.loginSrv = loginSrv;

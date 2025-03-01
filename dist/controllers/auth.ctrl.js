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
exports.loginCtrl = exports.registerCtrl = void 0;
const express_validator_1 = require("express-validator");
const auth_srv_1 = require("../services/auth.srv");
const registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return; // finaliza
        }
        const { nombre, email, password } = req.body;
        const user = yield (0, auth_srv_1.registerSrv)(nombre, email, password);
        // Envía respuesta sin 'return res.json(...)'
        res.status(201).json({
            message: "Usuario registrado",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerCtrl = registerCtrl;
const loginCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        const { token } = yield (0, auth_srv_1.loginSrv)(email, password);
        // No hagas return, simplemente responde
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.loginCtrl = loginCtrl;

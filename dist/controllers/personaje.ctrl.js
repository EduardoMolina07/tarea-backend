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
exports.updatePersonajeCtrl = exports.deletePersonajeCtrl = exports.getPersonajeCtrl = exports.getListaPersonajeCtrl = exports.createPersonajeCtrl = void 0;
const personaje_srv_1 = require("../services/personaje.srv");
const createPersonajeCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const data = req.body; // { nombre, foto }
        const personaje = yield (0, personaje_srv_1.createPersonajeSrv)(userId, data);
        res.status(201).json({ data: personaje, success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createPersonajeCtrl = createPersonajeCtrl;
const getListaPersonajeCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const rol = req.user.rol;
        const personajes = yield (0, personaje_srv_1.getListaPersonajeSrv)(userId, rol);
        res.json({ data: personajes, success: true });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getListaPersonajeCtrl = getListaPersonajeCtrl;
const getPersonajeCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const rol = req.user.rol;
        const personaje = yield (0, personaje_srv_1.getPersonajeSrv)(id, userId, rol);
        res.json({ data: personaje, success: true });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getPersonajeCtrl = getPersonajeCtrl;
const deletePersonajeCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const rol = req.user.rol;
        const personaje = yield (0, personaje_srv_1.deletePersonajeSrv)(id, userId, rol);
        res.json({ data: personaje, success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deletePersonajeCtrl = deletePersonajeCtrl;
const updatePersonajeCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, foto } = req.body;
        const userId = req.user.id;
        const rol = req.user.rol;
        const personaje = yield (0, personaje_srv_1.updatePersonajeSrv)(Number(id), userId, rol, { nombre, foto });
        res.json({ data: personaje, success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updatePersonajeCtrl = updatePersonajeCtrl;

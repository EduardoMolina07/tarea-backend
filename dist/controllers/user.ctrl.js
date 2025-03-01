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
exports.deleteUserCtrl = exports.updateUserCtrl = exports.getUserCtrl = exports.listUsersCtrl = void 0;
const user_srv_1 = require("../services/user.srv");
const listUsersCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_srv_1.listUsersSrv)();
        res.json({ data: users });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.listUsersCtrl = listUsersCtrl;
const getUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield (0, user_srv_1.getUserByIdSrv)(id);
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.json({ data: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserCtrl = getUserCtrl;
const updateUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { nombre, email, rol } = req.body;
        const updated = yield (0, user_srv_1.updateUserSrv)(id, { nombre, email, rol });
        res.json({ data: updated });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUserCtrl = updateUserCtrl;
const deleteUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deleted = yield (0, user_srv_1.softDeleteUserSrv)(id);
        res.json({ data: deleted });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUserCtrl = deleteUserCtrl;

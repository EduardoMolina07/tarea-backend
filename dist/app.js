"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = require("./routes");
const PORT = process.env.PORT || 3010;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Opcional: Para mayor seguridad puedes descomentar helmet y csurf
// import helmet from "helmet";
// app.use(helmet());
// import csurf from "csurf";
// app.use(csurf());
app.use(routes_1.router);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

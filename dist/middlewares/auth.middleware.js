"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
/**
 * Verifica el token JWT y lo refresca en cada petición.
 */
const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            res.status(401).json({ error: "No token provided" });
            return; // corta la ejecución
        }
        const token = header.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        // Refrescar el token
        const newToken = (0, jwt_1.generateToken)({ id: decoded.id, rol: decoded.rol });
        res.setHeader("Authorization", `Bearer ${newToken}`);
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};
exports.authMiddleware = authMiddleware;
/**
 * Verifica que el rol sea ADMIN.
 */
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.rol) !== "ADMIN") {
        res.status(403).json({ error: "Se requiere rol ADMIN" });
        return;
    }
    next();
};
exports.adminMiddleware = adminMiddleware;

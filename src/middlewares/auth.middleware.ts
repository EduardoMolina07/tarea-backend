import { Request, Response, NextFunction } from "express";
import { generateToken, verifyToken } from "../utils/jwt";

/**
 * Verifica el token JWT y lo refresca en cada petición.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ error: "No token provided" });
      return; // corta la ejecución
    }
    const token = header.split(" ")[1];
    const decoded = verifyToken(token) as { id: number; rol: string };
    (req as any).user = decoded;

    // Refrescar el token
    const newToken = generateToken({ id: decoded.id, rol: decoded.rol });
    res.setHeader("Authorization", `Bearer ${newToken}`);

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

/**
 * Verifica que el rol sea ADMIN.
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;
  if (user?.rol !== "ADMIN") {
    res.status(403).json({ error: "Se requiere ser ADMIN" });
    return;
  }
  next();
};
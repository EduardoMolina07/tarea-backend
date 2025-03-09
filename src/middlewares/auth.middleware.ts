// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, generateToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = header.split(' ')[1];
    const decoded = verifyToken(token);

    // Guardamos info del usuario decodificado en req.user
    (req as any).user = decoded;

    // Refrescamos el token y lo devolvemos en el header
    const newToken = generateToken({ id: decoded.id, rol: decoded.rol });
    res.setHeader('Authorization', `Bearer ${newToken}`);

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user || user.rol !== 'ADMIN') {
    return res.status(403).json({ error: 'Se requiere rol ADMIN' });
  }
  next();
};
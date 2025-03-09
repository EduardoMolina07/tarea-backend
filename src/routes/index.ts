// src/routes/index.ts
import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import personajeRouter from './personaje'; // CRUD de personajes

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);       // Acceso solo para ADMIN
router.use('/personajes', personajeRouter); // Acceso para usuarios autenticados

export default router;
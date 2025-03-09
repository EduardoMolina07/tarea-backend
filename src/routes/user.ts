// src/routes/user.ts
import { Router } from 'express';
import { listUsersCtrl, getUserCtrl, updateUserCtrl, deleteUserCtrl } from '../controllers/user.ctrl';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Aplica primero authMiddleware para asegurar que el usuario esté logueado
// y luego adminMiddleware para restringir el acceso a rol "ADMIN"
router.use(authMiddleware, adminMiddleware);

router.get('/', listUsersCtrl);       // GET todos los usuarios
router.get('/:id', getUserCtrl);      // GET usuario por id
router.put('/:id', updateUserCtrl);   // UPDATE
router.delete('/:id', deleteUserCtrl);// DELETE

export default router;
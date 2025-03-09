// src/controllers/user.ctrl.ts
import { Request, Response } from 'express';
import { listUsersSrv, getUserByIdSrv, updateUserSrv, softDeleteUserSrv } from '../services/user.srv';

export const listUsersCtrl = async (req: Request, res: Response) => {
  try {
    const users = await listUsersSrv();
    res.json({ data: users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ... getUserCtrl, updateUserCtrl, deleteUserCtrl similares ...
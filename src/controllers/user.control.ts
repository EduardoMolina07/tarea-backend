// src/controllers/user.ctrl.ts
import { Request, Response } from "express";
import {
  listUsersSrv,
  getUserByIdSrv,
  updateUserSrv,
  softDeleteUserSrv,
} from "../services/user.srv";

export const listUsersCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await listUsersSrv();
    res.json({ data: users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdSrv(id);
    if (!user) {
      res.status(404).json({ error: "Usuario no registrado" });
      return;
    }
    res.json({ data: user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { nombre, email, rol } = req.body;
    const updated = await updateUserSrv(id, { nombre, email, rol });
    res.json({ data: updated });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await softDeleteUserSrv(id);
    res.json({ data: deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
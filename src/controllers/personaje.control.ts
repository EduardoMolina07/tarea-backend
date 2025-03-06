import { Request, Response } from "express";
import {
  createPersonajeSrv,
  getListaPersonajeSrv,
  getPersonajeSrv,
  deletePersonajeSrv,
  updatePersonajeSrv,
} from "../services/personaje.srv";

export const createPersonajeCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const data = req.body; // { nombre, foto }
    const personaje = await createPersonajeSrv(userId, data);
    res.status(201).json({ data: personaje, success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getListaPersonajeCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    const personajes = await getListaPersonajeSrv(userId, rol);
    res.json({ data: personajes, success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPersonajeCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    const personaje = await getPersonajeSrv(id, userId, rol);
    res.json({ data: personaje, success: true });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deletePersonajeCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    const personaje = await deletePersonajeSrv(id, userId, rol);
    res.json({ data: personaje, success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePersonajeCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, nombre, foto } = req.body;
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    const personaje = await updatePersonajeSrv(Number(id), userId, rol, { nombre, foto });
    res.json({ data: personaje, success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
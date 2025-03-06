// src/controllers/auth.ctrl.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerSrv, loginSrv } from "../services/auth.srv";

export const registerCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // finaliza
    }

    const { nombre, email, password } = req.body;
    const user = await registerSrv(nombre, email, password);

    // Envía respuesta sin 'return res.json(...)'
    res.status(201).json({
      message: "Usuario bien registrado",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const { token } = await loginSrv(email, password);

    // No hagas return, simplemente responde
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
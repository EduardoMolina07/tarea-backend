// src/app.ts
import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";

const PORT = process.env.PORT || 3010;
const app = express();

app.use(express.json());
app.use(cors());
// Opcional: Para mayor seguridad puedes descomentar helmet y csurf
// import helmet from "helmet";
// app.use(helmet());
// import csurf from "csurf";
// app.use(csurf());

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
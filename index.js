import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import userRouter from "./routes/user_routes.js";
import rutasRouter from "./routes/rutas_routes.js";
import ComentariosRouter from "./routes/comentarios_routes.js";

// Añadimos el método config de dotenv para utilizar las variables de entorno
dotenv.config();

// Función para utilizar path en ES Modules (exportamos para utilizarla globalmente)
export function currentDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}
const { __dirname } = currentDir();

// instanciamos express
const app = express();

// --- middlewares de express ---
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fieldSize: 20 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "Imagen demasiado grande",
    uploadTimeout: 0,
  })
);

app.use("/user", userRouter);
app.use("/rutas", rutasRouter);
app.use("/comentario", ComentariosRouter);

export default app;

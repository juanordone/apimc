import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

import userRouter from "./routes/user_routes.js";
import productRouter from "./routes/rutas_routes.js";

// Añadimos el método config de dotenv para utilizar las variables de entorno
dotenv.config();

// Función para utilizar path en ES Modules (exportamos para utilizarla globalmente)
export function currentDir() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return { __dirname, __filename };
  }

// instanciamos express
const app = express();

// --- middlewares de express ---
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/product",productRouter);

export default app;

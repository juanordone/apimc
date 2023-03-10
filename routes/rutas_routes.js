import express from "express";
import rutasController from "../controller/rutas_controller.js";

const rutasRouter = express.Router();

// Subir una o varias imágenes al servidor y base de datos

// Obtener una imagen por su id
// rutasRouter.get("/image/:id", rutasController.getImage);
// Buscar ruta por su id
rutasRouter.get("/ruta/:id", rutasController.getRutasById);
// traemos todas las rutas
rutasRouter.get("/", rutasController.allRutas);
// traemos las rutas por el nombre para el buscador
rutasRouter.get("/RutasName/:name", rutasController.getRutasByName);

// subir una ruta
rutasRouter.post("/addRutas/:id", rutasController.addRutas);

// Buscar ruta por la idusuario
rutasRouter.get("/rutaUsuario/:idusuario", rutasController.getRutasByIdUsuario);

rutasRouter.get("/grupeta/:idruta", rutasController.getGrupetaByIdRuta );

export default rutasRouter;

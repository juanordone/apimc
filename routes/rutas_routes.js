import express from "express";
import rutasController from "../controller/rutas_controller.js";

const productRouter = express.Router();

// Subir una o varias imágenes al servidor y base de datos
productRouter.post("/upload", rutasController.uploadImage);
// Obtener una imagen por su id
productRouter.get("/image/:id", rutasController.getImage);
// Buscar producto por su id
productRouter.get("/ruta/:id", rutasController.getRutasById);
// traemos los productos
productRouter.get("/", rutasController.allRutas)

productRouter.get("/productName/:name", rutasController.getRutasByName)


export default productRouter;

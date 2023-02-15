import express from "express";
import comentariosController from "../controller/comentarios_controller.js"

const ComentariosRouter = express.Router();
// subir un comentario
ComentariosRouter.post("/addcomentario/:id", comentariosController.addComentario);
// traemos comentarios por la id de ruta
ComentariosRouter.get("/comentarioRuta/:idruta", comentariosController.getComentarioByIdRuta);

export default ComentariosRouter
import dao from "../services/dao.js";


const controller = {};

controller.addComentario = async (req, res) => {
    const {id} = req.params
    const {
     comentario,idusuario
    } = req.body;
  
    // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
    if (
    !comentario
    )
      return res.status(400).send("Error al recibir el body");
    // Buscamos el usuario en la base de datos
    try {
     const  comentarioobj = { comentario: comentario, idusuario:idusuario, idruta:id}
      const addComentarios = await dao.addComentario(comentarioobj);
      if (addComentarios)
        return res.send(`comentario con id: ${addComentarios} registrado`);
    } catch (e) {
      console.log(e.message);
    }
  };

controller.getComentarioByIdRuta = async(req,res) => {
    const idruta = req.params.idruta;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!idruta) return res.status(400).send("Error al recibir el body");
  try {
    let comentarios = await dao.getComentarioByIdRuta(idruta);
    // Si no existe el ruta respondemos con un 404 (not found)
    if (comentarios.length <= 0) return res.status(404).send("Usuario no existe");

    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    // [product] = product;

    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(comentarios);
  } catch (e) {
    console.log(e.message);
  }
} 


  export default controller
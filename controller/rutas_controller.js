import { currentDir } from "../index.js";
import dao from "../services/dao.js";
const controller = {};

// Definimos la constante __dirname donde obtendremos la ruta absoluta
const __dirname = currentDir().__dirname;
// controlador para subir una o varias imágenes a nuestro servidor y base de datos
// controlador para subir una imagen a nuestro servidor y guardar el path en la base de datos.

controller.addRutas = async (req, res) => {
  const {id} = req.params
  const {
    ciudad,
    distancia,
    nivel,
    velocidad,
    tipo,
    duracion,
    fecha,
    url,
    detalles,
  } = req.body;

  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (
    !ciudad ||
    !distancia ||
    !nivel ||
    !velocidad ||
    !tipo ||
    !duracion ||
    !fecha ||
    !detalles ||
    !url
  )
    return res.status(400).send("Error al recibir el body");
  // Buscamos el usuario en la base de datos
  try {
   const  rutasobj = {ciudad : ciudad, distancia: distancia, nivel: nivel, velocidad: velocidad, tipo:tipo , duracion:duracion, fecha: fecha, url:url, detalles:detalles, idusuario:id}
    const addRutas = await dao.addRutas(rutasobj);
    if (addRutas)
      return res.send(`ruta ${ciudad} con id: ${addRutas} registrada`);
  } catch (e) {
    console.log(e.message);
  }
};



controller.getRutasById = async (req, res) => {
  const id = req.params.id;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!id) return res.status(400).send("Error al recibir el body");
  try {
    let rutas = await dao.getRutasById(id);
    // Si no existe el ruta respondemos con un 404 (not found)
    if (rutas.length <= 0) return res.status(404).send("producto no existe");

    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    // [product] = product;

    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(rutas[0]);
  } catch (e) {
    console.log(e.message);
  }
};
// controlador que trae todas las rutas
controller.allRutas = async (req, res) => {
  try {
    let product = await dao.getAllRutas();
    // Si no existe la ruta  respondemos con un 404 (not found)
    if (product.length <= 0) return res.status(404).send("No hay rutas");

    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(product);
  } catch (e) {
    console.log(e.message);
  }
};
// controlador para traer la rutas por su nombre para el buscador
controller.getRutasByName = async (req, res) => {
  const name = req.params.name;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!name) return res.status(400).send("Error al recibir el body");
  try {
    let ruta = await dao.getRutasByName(name);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (ruta.length <= 0) return res.status(404).send("la ruta no existe");

    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    // [product] = product;

    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(ruta);
  } catch (e) {
    console.log(e.message);
  }
};


controller.getRutasByIdUsuario = async (req, res) => {
  const idusuario = req.params.idusuario;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!idusuario) return res.status(400).send("Error al recibir el body");
  try {
    let rutas = await dao.getRutasByIdUsuario(idusuario);
    // Si no existe el ruta respondemos con un 404 (not found)
    if (rutas.length <= 0) return res.status(404).send("producto no existe");

    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    // [product] = product;

    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(rutas);
  } catch (e) {
    console.log(e.message);
  }
};
controller.getGrupetaByIdRuta = async(req,res) => {
  const idruta = req.params.idruta;
// Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
if (!idruta) return res.status(400).send("Error al recibir el body");
try {
  let grupeta = await dao.getGrupetaByIdruta(idruta);
  // Si no existe el ruta respondemos con un 404 (not found)
  if (grupeta.length <= 0) return res.status(404).send("Usuario no existe");

  // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
  // [product] = product;

  //Si todo es correcto enviamos la respuesta. 200 OK
  return res.send(grupeta);
} catch (e) {
  console.log(e.message);
}
} 


export default controller;

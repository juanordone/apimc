import userQueries from "./mysql_queries/user_queries.js";
import rutasQueries from "./mysql_queries/rutas_queris.js";
import comentariosQueries from "./mysql_queries/comentarios_queris.js";

const dao = {};

// Buscar un usuario por el email
dao.getUserbyEmail = async (email) => await userQueries.getUserbyEmail(email);
// Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);
// Añadir una nueva ruta
dao.addRutas = async (rutasData) => await rutasQueries.addRutas(rutasData);

// Buscar un usuario por el id
dao.getUserById = async (id) => await userQueries.getUserById(id);

// Eliminar un usuario
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

// Modificar usuario por su id
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

// Añadir datos de la imagen subida al servidor
dao.addImage = async (imageData) => await rutasQueries.addImage(imageData);

// Buscar rutas por id
dao.getRutasById = async (id) => await rutasQueries.getRutasById(id);
// Buscar rutas por idusuario
dao.getRutasByIdUsuario = async (idusuario) => await rutasQueries.getRutasByIdUsuario(idusuario);

// traer todos las rutas
dao.getAllRutas = async () => await rutasQueries.getAllRutas();
// traer rutas por el nombre para el buscador
dao.getRutasByName = async (name) => await rutasQueries.getRutasByName(name);

// añadir un comentario
dao.addComentario = async (comentariosData) => await comentariosQueries.addComentario(comentariosData);

dao.getComentarioByIdRuta = async (idruta) => await comentariosQueries.getComentarioByIdRuta(idruta)
export default dao;

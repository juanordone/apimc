import userQueries from "./mysql_queries/user_queries.js";
import rutasQueries from "./mysql_queries/rutas_queris.js";

const dao = {};

// Buscar un usuario por el email
dao.getUserbyEmail = async (email) => await userQueries.getUserbyEmail(email);
// Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);

// Buscar un usuario por el id
dao.getUserbyId = async (id) => await userQueries.getUserbyId(id);

// Eliminar un usuario
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

// Modificar usuario por su id
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

// Añadir datos de la imagen subida al servidor
dao.addImage = async (imageData) => await rutasQueries.addImage(imageData);

// Buscar rutas por id
dao.getRutasById = async (id) => await rutasQueries.getRutasById(id);

// traer todos los productos
 dao.getAllProduct = async() => await rutasQueries.getAllProduct();

 dao.getProductByName = async (name) => await rutasQueries.getProductByName(name);

export default dao;

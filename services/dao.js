import userQueries from "./mysql_queries/user_queries.js";
import productQueries from "./mysql_queries/product_queris.js";

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
dao.addImage = async (imageData) => await productQueries.addImage(imageData);

// Buscar producto por id
dao.getProductById = async (id) => await productQueries.getProductById(id);

// traer todos los productos
 dao.getAllProduct = async() => await productQueries.getAllProduct();

 dao.getProductByName = async (name) => await productQueries.getProductByName(name);

export default dao;

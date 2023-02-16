import db from "../mysql.js";

const comentariosQueries = {};

comentariosQueries.addComentario = async (comentariosData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.

    return await db.query(
      "INSERT INTO comentarios SET ?",
      comentariosData,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

comentariosQueries.getComentarioByIdRuta = async (idruta) => {
  // Conectamos con la base de datos y buscamos si existe el producto por la ref.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT  comentarios.comentario, usuarios.apodo, usuarios.imagen , comentarios.id FROM comentarios join usuarios on comentarios.idusuario = usuarios.id   WHERE idruta = ?",
      idruta,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default comentariosQueries;

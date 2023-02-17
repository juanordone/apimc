import db from "../mysql.js";
import moment from "moment/moment.js";

const rutasQueries = {};



// rutasQueries.getImageById = async (id) => {
//   // Conectamos con la base de datos y buscamos si existe la imagen por el id.
//   let conn = null;
//   try {
//     conn = await db.createConnection();
//     return await db.query(
//       "SELECT * FROM images WHERE id = ?",
//       id,
//       "select",
//       conn
//     );
//   } catch (e) {
//     throw new Error(e);
//   } finally {
//     conn && (await conn.end());
//   }
// };

rutasQueries.getRutasById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por la ref.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM rutas WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

rutasQueries.getAllRutas = async () => {
  // Conectamos con la base de datos y buscamos si existe el producto por la ref.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM rutas ",
      [],

      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

rutasQueries.getRutasByName = async (name) => {
  // Conectamos con la base de datos y buscamos si existe el producto por la ref.
  // name = name.replace(/["']/g, "");
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      `SELECT * FROM rutas WHERE ciudad  LIKE '%${name}%'`,
      name,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

rutasQueries.addRutas = async (rutasData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.

   
    return await db.query("INSERT INTO rutas SET ?", rutasData, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

rutasQueries.getRutasByIdUsuario = async (idusuario) => {
  // Conectamos con la base de datos y buscamos si existe el producto por la ref.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM rutas WHERE idusuario = ?",
      idusuario,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default rutasQueries;

import db from "../mysql.js";
import moment from "moment/moment.js";

const rutasQueries = {};

rutasQueries.addImage = async (imageData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos de la imagen a guardar en la base de datos.
    // Usamos la libreria momentjs para registrar la fecha actual
    let imageObj = {
      tipo: imageData.name,
      path: imageData.path,
    };
    return await db.query("INSERT INTO imagen SET ?", imageObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

rutasQueries.getImageById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por el id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM images WHERE id = ?",
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
      `SELECT * FROM rutas WHERE nombre  LIKE '%${name}%'`,
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

    let rutasObj = {
      ciudad: rutasData.ciudad,
      distancia: rutasData.distancia,
      nivel: rutasData.nivel,
      velocidad: rutasData.velocidad,
      tipo: rutasData.tipo,
      duracion: rutasData.duracion,
      fecha: rutasData.fecha,
      idusuario: rutasData.id,
      //reg_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    return await db.query("INSERT INTO rutas SET ?", rutasObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default rutasQueries;

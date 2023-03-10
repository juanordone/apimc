import dao from "../services/dao.js";
import { SignJWT, jwtVerify } from "jose";
import md5 from "md5";
import { currentDir } from "../index.js";
import { transporter } from "../config/mailer.js";

const controller = {};
const __dirname = currentDir().__dirname;
// controlador para añadir usuario
controller.addUser = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!nombre || !email || !contraseña)
    return res.status(400).send("Error al recibir el body");
  // Buscamos el usuario en la base de datos
  try {
    const user = await dao.getUserbyEmail(email);
    // Si existe el usuario respondemos con un 409 (conflict)
    if (user.length > 0) return res.status(409).send("usuario ya registrado");
    // Si no existe lo registramos
    const addUser = await dao.addUser(req.body);
    if (addUser)
      return res.send(`Usuario ${nombre} con id: ${addUser} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

// Controlador para el login de un usuario
controller.loginUser = async (req, res) => {
  const { email, contraseña } = req.body;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!email || !contraseña)
    return res.status(400).send("Error al recibir el body");
  try {
    let user = await dao.getUserbyEmail(email);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (user.length <= 0) return res.status(404).send("usuario no registrado");
    // Pasamos md5 a la paswword recibida del cliente
    const clienPassword = md5(contraseña);
    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    [user] = user;
    // Si existe el usuario, comprobamos que la password es correcta. Si no lo es devolvemos un 401 (unathorized)
    if (user.contraseña != clienPassword)
      return res.status(401).send("password incorrecta");
    // Si es correcta generamos el token y lo devolvemos al cliente
    // Construimos el JWT con el id, email y rol del usuario
    const jwtConstructor = new SignJWT({
      id: user.id,
      email,
      role: user.rol,
    });

    // Codificamos el la clave secreta definida en la variable de entorno por requisito de la librería jose
    // y poder pasarla en el formato correcto (uint8Array) en el método .sign
    const encoder = new TextEncoder();
    // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
    // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send({ jwt });
  } catch (e) {
    console.log(e.message);
  }
};

// Controlador para eliminar un usuario por su id
controller.deleteUserToRuta = async (req, res) => {
  const { idruta, idusuario } = req.params;

  try {
    // Si no existe devolvemos un 404 (not found)

    // Si existe, eliminamos el usuario por el id
    await dao.deleteUserToRuta(idruta, idusuario);
    // Devolvemos la respuesta
    let grupeta = await dao.getGrupetaByIdruta(idruta);
    return res.send(grupeta);
  } catch (e) {
    console.log(e.message);
  }
};

// Controlador para modificar un usuario por su id
controller.updateUser = async (req, res) => {
  try {
    // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error al recibir el body");
    // Actualizamos el usuario
    await dao.updateUser(req.params.id, req.body);
    // Devolvemos la respuesta
    let user = await dao.getUserById(req.params.id);
    console.log(user, "esto es user");
    return res.send(user);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getUserById = async (req, res) => {
  const id = req.params.id;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!id) return res.status(400).send("Error al recibir el body");
  try {
    let user = await dao.getUserById(id);
    // Si no existe el ruta respondemos con un 404 (not found)
    if (user.length <= 0) return res.status(404).send("Usuario no existe");

    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    // [product] = product;

    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(user[0]);
  } catch (e) {
    console.log(e.message);
  }
};

controller.updateImage = async (req, res) => {
  const { id } = req.params;
  console.log(req.files);
  try {
    // Controlamos cuando el objeto files sea null
    if (req.files === null) return;
    // Controlamos si nos viene algún tipo de archivo en el objeto files
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo8558");
    }
    // 1 archivo [{}] , >1 archivo [[{},{},...]]
    // Obtenemos un array de objetos con todas las imagenes
    const images = !req.files.length ? [req.files.file] : req.files.file;
    console.log(images, "esto es imagenes");
    // Recorremos el array para procesar cada imagen
    images.forEach(async (image) => {
      // Ya podemos acceder a las propiedades del objeto image.
      // Obtenemos la ruta de la imagen.
      let uploadPath = __dirname + "/public/images/products/" + image.name;
      let uploadRelPath = "/images/products/" + image.name;
      // Usamos el método mv() para ubicar el archivo en nuestro servidor
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.updateImage(id, {
        path: uploadRelPath,
        producto: req.query.producto,
      });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addUserToRuta = async (req, res) => {
  const { idruta, idusuario } = req.params;

  try {
    const userrutaobj = { idusuario: idusuario, idruta: idruta };
    let addUserToRuta = await dao.addUserToRuta(userrutaobj);
    let getUser = await dao.getUserById(idusuario);
    [getUser] = getUser;
    if (addUserToRuta)
      await transporter.sendMail({
        from: '"Bienvenido a la ruta" <meetcyclist@gmail.com>', // sender address
        to: `${getUser.email}`, // list of receivers
        subject: "Meet Cyclist ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: "<b>Te has unido a la ruta,esperamos que disfrutes de tu salida, recuerda respestar las normas de circulacion y disfrutar de la bicicleta. Para mas informacion aqui tienes el enlace de la web: http://127.0.0.1:5173/login</b>", // html body
      });
    let grupeta = await dao.getGrupetaByIdruta(idruta);
    return res.send(grupeta);
  } catch (e) {
    console.log(e.message);
  }
};
export default controller;

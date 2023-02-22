import express from "express";
import userController from "../controller/user_controller.js";

const userRouter = express.Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/:id", userController.deleteUser);
// Modificar un usuario por su id
userRouter.patch("/:id", userController.updateUser);
userRouter.get("/user/:id", userController.getUserById);

// Subir una o varias imágenes al servidor y base de datos
userRouter.post("/imagen/:id", userController.updateImage);

// unirse un usuario a una ruta
userRouter.post("/addUserRuta/:idruta", userController.addUserToRuta);
export default userRouter;

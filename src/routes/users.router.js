import { Router } from "express";
import userController from '../controllers/users.controllers.js'
import { createHash } from '../utils.js';
import userModel from "../DAO/mongo/models/user.model.js";
import config from "../config/index.js";
import jwt from "jsonwebtoken";
import { sendRecoveryMail } from "../utils.js";

const {PRIVATE_KEY} = config;

const UserController = new userController();
const router = Router();


router.get("/",UserController.getUsers) //Lista todos los usuarios
router.get("/:id",UserController.getUserById) //Lista el usuario enviado por Id
router.post("/",UserController.saveUser) //Crea el usuario
router.put("/:id",UserController.updateUser) //Actualiza el usuario por Id
router.delete("/:id",UserController.deleteUser) //Deletea el usuario por el Id


//Envía mail con recuperación de contraseña
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: "1h" });
  await sendRecoveryMail(email, token);
  res.json({ message: "Correo de recuperación enviado" });
});

//Actualiza la contraseña del usuario con el token y contraseña recibida
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const { email } = jwt.verify(token, PRIVATE_KEY);
    const hashedPassword = createHash(newPassword);
    await userModel.updateOne({ email }, { password: hashedPassword });
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Token inválido o expirado" });
  }
});

export default router;
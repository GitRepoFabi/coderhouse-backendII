import { Router } from "express";
import { createHash } from '../utils.js';
import userController from '../controllers/users.controllers.js'
import userModel from "../DAO/models/user.model.js";

const UserController = new userController();
const router = Router();


router.get("/",UserController.getUsers) //Lista todos los usuarios
router.get("/:id",UserController.getUserById) //Lista el usuario enviado por Id
router.post("/",UserController.saveUser) //Crea el usuario
router.put("/:id",UserController.updateUser) //Actualiza el usuario por Id
router.delete("/:id",UserController.deleteUser) //Deletea el usuario por el Id


//Lista todos los usuarios
// router.get("/", async (_, res) => {
//     //res.json(await userModel.find());
// });


//Lista el usuario enviado por Id
// router.get("/:id", async (req, res) => {
//     res.json(await userModel.findById(req.params.id));
// });

//Crea el usuario
// router.post("/", async (req, res) => {
//     try {
//         let { first_name, last_name, email, age, password, cart } = req.body;


//         if (!first_name || !last_name || !email || !age || !password || !cart) {
//             return res.status(400).send({ status: "Error", error: "Falta completar algún dato" })
//         }

//         let usuarioInsertado = await userModel.create({
//             first_name,
//             last_name,
//             email,
//             age,
//             password: createHash(password),
//             cart
//         }
//         );

//         res.send({ status: "Se ha agregado el usuario correctamente", payload: usuarioInsertado });
//     } catch (error) {
//         res.status(500).send({ status: 'Error', message: 'Ha ocurrido un error en la creación del usuario:', error });
//     }
// })

//Actualiza el usuario por el Id:
// router.put('/:id', async (req, res) => {
//     const id = req.params.id;
//     const { first_name, last_name, email, age, password, cart, role } = req.body;

//     try {
//         const usuarioEditar = await userModel.findById(id);
//         if (!usuarioEditar) {
//             return res.status(404).send({ status: 'error', message: 'Usuario no encontrado.' });
//         }

//         // Solo actualiza si los campos están presentes en el body
//         if (first_name) usuarioEditar.first_name = first_name;
//         if (last_name) usuarioEditar.last_name = last_name;
//         if (email) usuarioEditar.email = email;
//         if (age) usuarioEditar.age = age;
//         if (password) usuarioEditar.password = createHash(password);
//         if (cart) usuarioEditar.cart = cart;
//         if (role) usuarioEditar.role = role;

//         const usuarioActualizado = await usuarioEditar.save();

//         res.send({ status: 'OK', message: 'Usuario actualizado satisfactoriamente', usuario: usuarioActualizado });
//     } catch (error) {
//         res.status(500).send({ status: 'Error', message: 'Ha ocurrido un error en la edición del usuario:', error });
//     }
// })

//Deletea el usuario por el Id
// router.delete("/:id", async (req, res) => {
//     let id = req.params.id;
//     res.json(await userModel.deleteOne({ _id: id }));
// });

export default router;
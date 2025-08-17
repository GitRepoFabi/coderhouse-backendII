import { Router } from "express";
import CartController from "../controllers/carts.controllers.js";
import { current, authorize } from "../middlewares/auth.js";
import carsModel from "../DAO/mongo/models/carts.model.js";


const cartController = new CartController();
const router = Router();

router.post("/", current, authorize(["user"]), cartController.createCar) //Crea un carrito nuevo (solo user)
router.post("/:cid/product/:pid", current, authorize(["user"]), cartController.addProduct)// Agregar producto al carrito (solo user)




// // Agregar producto al carrito (solo user)
// router.post("/:cid/product/:pid", current, authorize(["user"]), async (req, res) => {

//     const idCarrito = req.params.cid;
//     const idProducto = req.params.pid;

//     try {
//         let carrito = await carsModel.findById(idCarrito);

//         // Verificar si el producto ya existe en el carrito
//         const productoExistente = carrito.products.find(product => product.product.toString() === idProducto);

//         if (productoExistente) {
//             // Si el producto ya existe, incremento la cantidad
//             productoExistente.quantity += 1;
//         } else {
//             // Si el producto no existe, lo agrego con la cantidad 1
//             carrito.products.push({ product: idProducto, quantity: 1 });
//         }

//         // Salvo el carrito actualizado
//         const actualizarCarrito = await carrito.save();

//         res.status(200).send({
//             status: 'success',
//             message: 'El carrito se ha actualizado correctamente',
//             payload: actualizarCarrito
//         });

//     } catch (error) {
//         res.status(500).send({ status: 'error', message: 'Ha ocurrido un error: ', error });
//     }  
// //  res.send(`Producto ${req.params.pid} agregado al carrito ${req.params.cid}`);
// });

export default router;

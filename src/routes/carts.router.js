import { Router } from "express";
import CartController from "../controllers/carts.controllers.js";
import { current, authorize } from "../middlewares/auth.js";
import carsModel from "../DAO/mongo/models/carts.model.js";


const cartController = new CartController();
const router = Router();

router.post("/", current, authorize(["user"]), cartController.createCar) //Crea un carrito nuevo (solo user)
router.post("/:cid/product/:pid", current, authorize(["user"]), cartController.addProduct)// Agregar producto al carrito (solo user)

export default router;

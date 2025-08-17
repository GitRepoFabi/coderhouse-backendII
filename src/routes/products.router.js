import { Router } from "express";
import ProductController from "../controllers/products.controllers.js";
import { current, authorize } from "../middlewares/auth.js";

const productController = new ProductController();
const router = Router();

router.post("/", current, authorize(["admin"]), productController.saveProduct) // Crear producto (solo admin)
router.put("/:id",current, authorize(["admin"]),productController.updateProduct) // Actualizar producto por Id (solo admin)
router.delete("/:id",current, authorize(["admin"]),productController.deleteProduct) // Eliminar producto (solo admin)

export default router;

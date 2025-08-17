import { Router } from "express";
import { current, authorize } from "../middlewares/auth.js";

const router = Router();

// Agregar producto al carrito (solo user)
router.post("/:cid/product/:pid", current, authorize(["user"]), (req, res) => {
  res.send(`Producto ${req.params.pid} agregado al carrito ${req.params.cid}`);
});

export default router;

import { Router } from "express";
import { current, authorize } from "../middlewares/auth.js";
import { productModel } from "../DAO/mongo/models/products.model.js";

const router = Router();

// Crear producto (solo admin)
router.post("/", current, authorize(["admin"]), async(req, res) => {
try {
        //Me quedo con lo que me envían por el body de la petición
        let { title, description, code, price, stock, category } = req.body;

        //Realizo los controles correspondientes con la info que si o si me debe de llegar
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({ status: "Error", error: "Falta completar algún dato" });
        }

        let productoInsertado = await productModel.create({
            title,
            description,
            code,
            price,
            stock,
            category
        });

        res.send({ status: "Se ha creado el producto correctamente", payload: productoInsertado });

    } catch (error) {
        res.status(500).send({ status: 'Error', message: 'Ha ocurrido un error en la edición del producto:', error });
    }
});

// Actualizar producto (solo admin)
router.put("/:pid", current, authorize(["admin"]), (req, res) => {
  res.send(`Producto ${req.params.pid} actualizado`);
});

// Eliminar producto (solo admin)
router.delete("/:pid", current, authorize(["admin"]), (req, res) => {
  res.send(`Producto ${req.params.pid} eliminado`);
});

export default router;

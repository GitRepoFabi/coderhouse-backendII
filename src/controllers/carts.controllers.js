import CartServices from '../services/carts.services.js';

const cartServices = new CartServices();

class CartController {
    async addProduct(req, res) {
        const idCarrito = req.params.cid;
        const idProducto = req.params.pid

        if (!idCarrito || !idProducto) {
            return res.status(400).send({ status: "Error", error: "Falta completar algún dato" })
        }

        const response = await cartServices.addProductCart(idCarrito, idProducto)

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }

        res.json({ status: 'OK', message: 'Contenido del carrito: ', carrito: response });

    }

    async createCar(req, res) {

        const response = await cartServices.createCar()

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }

        res.status(201).json({ status: "carrito creado", payload: response })
    }
}

export default CartController
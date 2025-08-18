import UserService from "../services/users.services.js";
import TicketService from "../services/ticket.services.js";
import carsModel from "../DAO/mongo/models/carts.model.js";


const userService = new UserService();
const ticketService = new TicketService();

class TicketController {

    async generateTicket(req, res) {
        try {
            const userId = req.user;

            if (!userId){
                 return res.status(404).json({ error: "Debe loguearse para generar el ticket" });
            }

            // Busco usuario
            const user = await userService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            // Obtengo carrito asociado al usuario
            const cart = await carsModel.findById(user.cart).populate("products.product");

            if (!cart || cart.products.length === 0) {
                return res.status(404).json({ error: "El carrito está vacío" });
            }

            // Calcular total
            let totalPrice = 0;
            cart.products.forEach(item => {
                totalPrice += item.product.price * item.quantity
            });

            let productos = cart.products;

            const ticketNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

            // Crear ticket
            const response = await ticketService.createTicket({ number:ticketNumber, user:user._id, products:productos, totalPrice })
            
            if (!response) {
                return res.status(500).json({ status: "error", message: "view console" })
            }

            // Vaciar carrito después de generado el ticket
            cart.products = [];
            await cart.save();

            return res.status(201).json({
                message: "Ticket generado correctamente",
                ticket: response
            });

        } catch (error) {
            console.error("Error generando ticket:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default TicketController;
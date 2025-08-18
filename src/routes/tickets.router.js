import { Router } from "express";
import TicketController from "../controllers/ticket.controllers.js";

const ticketController = new TicketController();
const router = Router();

// Generar ticket para un usuario
router.post("/:userId", ticketController.generateTicket);

export default router;
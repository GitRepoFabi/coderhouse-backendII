import TicketDAO from "../DAO/mongo/ticket.dao.js";

const ticketDAO = new TicketDAO();

class TicketRepository {
    async createTicket(body) {
        return await ticketDAO.createTicket(body);
    }
}

export default TicketRepository;
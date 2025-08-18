import TicketDAO from "../DAO/mongo/ticket.dao.js";

const ticketDAO = new TicketDAO();

class TicketRepository {
    async createTicket(body) {
        return await ticketDAO.createTicket(body);
    }

    async getTicketById (tid){
        return await ticketDAO.getTicketById(tid);
    }

    async updateTicket(tid, ticket){
        return await ticketDAO.updateTicket(tid,ticket)
    }
}

export default TicketRepository;
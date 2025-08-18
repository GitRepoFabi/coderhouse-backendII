import TicketRepository from "../repository/ticket.repository.js";

const ticketRepository = new TicketRepository();

class TicketService {
    
    async createTicket(body) {
        return await ticketRepository.createTicket(body)
    }
}

export default TicketService;
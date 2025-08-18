import TicketRepository from "../repository/ticket.repository.js";

const ticketRepository = new TicketRepository();

class TicketService {

    async createTicket(body) {
        return await ticketRepository.createTicket(body)
    }

    async resolveTicket(tid,resolve) {
        const ticket = await ticketRepository.getTicketById(tid);
        ticket.status = resolve;
        const response = await ticketRepository.updateTicket(tid, ticket);
        return response
    }
}

export default TicketService;
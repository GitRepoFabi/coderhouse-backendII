import ticketModel from './models/ticket.model.js';

class TicketDAO {
    async createTicket(body) {
        try {
            let ticket = await ticketModel.create(body);
            return ticket;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default TicketDAO;
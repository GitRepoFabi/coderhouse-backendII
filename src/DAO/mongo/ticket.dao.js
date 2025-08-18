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

    async getTicketById(tid) {
        try {
            let result = await ticketModel.findOne({ _id: tid })
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async updateTicket(tid, ticket) {
        try {
            let result = await ticketModel.updateOne({ _id: tid }, { $set: ticket });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default TicketDAO;
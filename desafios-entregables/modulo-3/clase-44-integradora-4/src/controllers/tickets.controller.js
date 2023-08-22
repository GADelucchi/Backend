// Import
const { ticketService } = require("../service/index.service");

//Code
class TicketController {
    getTickets = async () => await ticketService.get()

    getTicketById = async (tid) => await ticketService.getById(tid)

    createTicket = async (newTicket) => await ticketService.create(newTicket)

    updateTicket = async (tid, ticketToReplace) => await ticketService.update(tid, ticketToReplace)

    deleteTicket = async (tid) => await ticketService.delete(tid)
}

// Export
module.exports = new TicketController()
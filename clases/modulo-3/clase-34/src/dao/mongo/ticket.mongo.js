// Import
const { ticketModel } = require("./models/ticket.model")

// Class
class TicketDaoMongo {
    constructor() {
        this.model = ticketModel
    }

    get = async () => await this.model.find({})

    getById = async (tid) => await this.model.findOne({ _id: tid })

    create = async (newTicket) => await this.model.create(newTicket)

    update = async (tid, updatedTicket) => await this.model.updateOne({ _id: tid }, updatedTicket)

    delete = async (tid) => await this.model.deleteOne({ _id: tid })
}

// Export
module.exports = TicketDaoMongo
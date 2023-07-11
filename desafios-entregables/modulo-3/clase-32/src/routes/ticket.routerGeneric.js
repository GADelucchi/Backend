const ticketsController = require('../controllers/tickets.controller');
const { RouterClass } = require("./routerClass");

class TicketsRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {
                let result = await ticketsController.getTickets()

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        }
        )

        this.get('/:tid', ['PUBLIC'], async (req, res) => {
            try {
                const { tid } = req.params
                const result = await ticketsController.getTicketById(tid)

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.post('/', ['PUBLIC'], async (req, res) => {
            try {
                const newTicket = req.body
                const result = await ticketsController.createTicket(newTicket)
                
                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.put('/:tid', ['PUBLIC'], async (req, res) => {
            try {
                const { tid } = req.params
                const ticket = req.body

                const ticketToReplace = {
                    code: ticket.code,
                    purchase_datatime: ticket.purchase_datatime,
                    amount: ticket.amount,
                    purchaser: ticket.purchaser
                }
                const result = await ticketsController.updateTicket(tid, ticketToReplace)

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.delete('/:tid', ['PUBLIC'], async (req, res) => {
            try {
                const { tid } = req.params
                const result = await ticketsController.deleteTicket(tid)

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}


module.exports = TicketsRouter
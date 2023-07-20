class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => await this.dao.get()

    getById = async (tid) => await this.dao.getById(tid)

    create = async (newTicket) => await this.dao.create(newTicket)

    update = async (tid, updatedTicket) => await this.dao.update(tid, updatedTicket)

    delete = async (tid) => await this.dao.delete(tid)
}

module.exports = {
    TicketRepository
}
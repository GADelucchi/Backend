const { ContactDto } = require("../dto/contact.dto")

class ContactRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => await this.dao.get()

    create = async (newContact) => {
        let contactToInsert = new ContactDto(newContact)
        let result = await this.dao.create(contactToInsert)
        return result
    }
}

module.exports = {
    ContactRepository
}
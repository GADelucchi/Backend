// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { contactModel } = require("./models/contact.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class ContactDaoMongo {
    constructor() {
        this.contacts = contactModel
    }

    get = async () => await this.contacts.find({})

    create = async (newContact) => await this.contacts.create(newContact)

    update = async (updatedContact) => await this.contacts.findByIdAndUpdate({ _id: id }, updatedContact)

    delete = async (cid) => await this.contacts.deleteOne({ _id: cid })
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = ContactDaoMongo
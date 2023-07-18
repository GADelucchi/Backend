// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class ContactDaoMemory {
    constructor() {
        this.contacts = []
    }

    get = () => this.contacts

    create = (newContact) => this.contacts.push(newContact)
}


// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = ContactDaoMemory
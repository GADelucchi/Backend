const fs = require(`fs`)
const { logger } = require("../../config/logger")

class ContactDaoFile {
    constructor() {
        this.path = `./data/contacts.json`
    }

    getContacts = async () => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedContacts = JSON.parse(content)
            return parsedContacts
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ContactDaoFile
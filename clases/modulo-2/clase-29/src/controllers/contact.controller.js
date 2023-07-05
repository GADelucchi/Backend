const { contactService } = require("../service")

// Code
class ContactController {
    getContacts = async (req, res) => {
        try {
            let result = await contactService.get()
            res.send({
                status: 'Success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    createContact = async (req, res) => {
        try {
            let { name, last_name, phone } = req.body
            const addedContact = await contactService.create({ name, last_name, phone })
            res.send({
                status: 'Success',
                payload: addedContact
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// Export
module.exports = new ContactController()
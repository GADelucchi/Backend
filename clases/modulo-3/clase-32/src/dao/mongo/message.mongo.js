// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { messageModel } = require("./models/message.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class MessageDaoMongo {
    async getMessages() {
        try {
            return await messageModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    async addMessage(newMessage) {
        try {
            return await messageModel.create(newMessage)
        } catch (error) {
            return new Error(error)
        }
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = MessageDaoMongo
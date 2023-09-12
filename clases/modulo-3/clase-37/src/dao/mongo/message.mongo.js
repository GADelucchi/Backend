// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { messageModel } = require("./models/message.model")
const { EError } = require("../../utils/CustomError/EErrors");
const { CustomError } = require('../../utils/CustomError/CustomError');

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class MessageDaoMongo {
    async getMessages() {
        try {
            return await messageModel.find({})
        } catch (error) {
            return CustomError.createError({
                    name: 'Get Messages error',
                    cause: 'Unfinded messages',
                    message: 'Error trying to get message',
                    code: EError.INVALID_ERROR
                })
        }
    }

    async addMessage(newMessage) {
        try {
            return await messageModel.create(newMessage)
        } catch (error) {
            return CustomError.createError({
                    name: 'Message creation error',
                    cause: 'unknown',
                    message: 'Error trying to create message',
                    code: EError.INVALID_ERROR
                })
        }
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = MessageDaoMongo
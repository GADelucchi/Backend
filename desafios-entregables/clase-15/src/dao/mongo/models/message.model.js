// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `messages`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const messageSchema = new Schema({
    user: String,
    message: String,
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const messageModel = model(collection, messageSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    messageModel
}
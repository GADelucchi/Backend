// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `users`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        required: true
    }
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const userModel = model(collection, userSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    userModel
}
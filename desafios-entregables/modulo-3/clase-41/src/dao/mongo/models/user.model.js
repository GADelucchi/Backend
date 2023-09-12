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
        index: true,
        lowercase: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const userModel = model(collection, userSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    userModel
}
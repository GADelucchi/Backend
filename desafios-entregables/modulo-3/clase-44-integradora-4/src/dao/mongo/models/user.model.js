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
    password: {
        type: String,
        required: true
    },
    last_conecction: Date,
    role: {
        type: String,
        default: 'user'
    },
    documents: [{
        name: String,
        ref: String
    }]
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const userModel = model(collection, userSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    userModel
}
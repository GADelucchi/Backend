// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)
const mongoosePaginate = require(`mongoose-paginate-v2`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `users`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
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
userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    userModel
}
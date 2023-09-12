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
        index: true
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
        index: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    role: String
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    userModel
}
// Imports externos
const { Schema, model } = require(`mongoose`)
const mongoosePaginate = require(`mongoose-paginate-v2`)

// Configuración
const collection = `users`

// Schema
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        allowedProtoProperties: true
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
    }],
    cart: String
})

// Configuración
userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

// Export
module.exports = {
    userModel
}
// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `contact`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const contactSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    active: Boolean,
    phone: String
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const contactModel = model(collection, contactSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    contactModel
}   
// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `tickets`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datatime: Date,
    amount: Number,
    purchaser: String
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const ticketModel = model(collection, ticketSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    ticketModel
}
// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `orders`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const orderSchema = new Schema({
    name: String,
    size: {
        type: String,
        enum: [`small`, `medium`, `large`],
        default: `medium`
    },
    price: Number,
    quantity: Number,
    date: Date
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const orderModel = model(collection, orderSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    orderModel
}
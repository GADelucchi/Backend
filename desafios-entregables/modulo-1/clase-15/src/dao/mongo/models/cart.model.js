// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `carts`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const cartSchema = new Schema({
    products: {
        type: Array,
        required: true
    },
    quantity: Number
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const cartModel = model(collection, cartSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    cartModel
}
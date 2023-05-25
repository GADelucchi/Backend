// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `carts`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const cartSchema = new Schema({
    
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const cartModel = model(collection, cartSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    cartModel
}
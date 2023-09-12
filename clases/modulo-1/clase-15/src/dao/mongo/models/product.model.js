// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `products`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: String,
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    }
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const productModel = model(collection, productSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    productModel
}
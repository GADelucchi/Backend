// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)
const mongoosePaginate = require(`mongoose-paginate-v2`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `products`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        allowedProtoProperties: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    }
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    productModel
}
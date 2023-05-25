// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Schema, model } = require(`mongoose`)

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const collection = `carts`

// Schema –––––––––––––––––––––––––––––––––––––––––––––––––––
const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: `products`
        },
        quantity: Number 
    }]
})

cartSchema.pre(`findOne`, function(){
    this.populate(`products.product`)
})

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
const cartModel = model(collection, cartSchema)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    cartModel
}
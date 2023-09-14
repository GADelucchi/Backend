// Imports
const { Schema, model } = require(`mongoose`)
const mongoosePaginate = require(`mongoose-paginate-v2`)

// Config
const collection = `carts`

// Schema
const cartSchema = new Schema({
    products:[{
            product: {
                type: Schema.Types.ObjectId,
                ref: `products`,
                allowedProtoProperties: true
            },
            quantity: {
                type: Number
            }
        }],
    owner: {
        type: String
    }
})

cartSchema.pre(`findOne`, function () {
    this.populate(`products.product`)
})

// Config
cartSchema.plugin(mongoosePaginate)
const cartModel = model(collection, cartSchema)

// Export
module.exports = {
    cartModel
}
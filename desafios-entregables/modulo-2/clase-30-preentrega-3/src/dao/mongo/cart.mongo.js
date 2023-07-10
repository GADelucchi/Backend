// Imports
const { cartModel } = require("./models/cart.model")

// Class
class CartDaoMongo {
    constructor() {
        this.model = cartModel
    }

    get = async () => await this.model.find({})

    getById = async (cid) => await this.model.findOne({ _id: cid })

    create = async (newCart) => await this.model.create(newCart)

    update = async (cid, pid, quantity) => {
        const cart = await this.model.findOne({ _id: cid }).lean();
        const productIndex = cart.products.findIndex((product) => product.product._id.toString() === pid);

        if (quantity) {
            quantity
        } else {
            quantity = 1
        }

        if (productIndex === -1) {
            await this.model.updateOne(
                { _id: cid },
                { $push: { products: { product: pid, quantity: quantity } } }
            );
            return `Producto agregado`
        } else {
            await this.model.updateOne(
                { _id: cid, "products.product": pid },
                { $inc: { "products.$.quantity": quantity } }
            );
            return `Cantidad sumada`
        }
    }

    deleteProductInCart = async (cid, pid) => await this.model.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } }
    )

    deleteProducts = async (cid) => await this.model.updateOne(
        { _id: cid },
        { $set: { products: [] } }
    )
}


// Export
module.exports = CartDaoMongo
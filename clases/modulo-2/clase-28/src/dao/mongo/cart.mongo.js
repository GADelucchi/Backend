// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { cartModel } = require("./models/cart.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class CartDaoMongo {
    constructor() {
        this.carts = cartModel
    }

    get = async () => await this.carts.find({}).lean()

    getById = async (cid) => await this.carts.findOne({ _id: cid }).lean()

    getCartByIdProductsById = async (cid, pid, quantity) => {
        const cart = await this.carts.findOne({ _id: cid }).lean();
        const productIndex = cart.products.findIndex((product) => product.product._id.toString() === pid);

        if (quantity) {
            quantity
        } else {
            quantity = 1
        }


        if (productIndex === -1) {
            await this.carts.updateOne(
                { _id: cid },
                { $push: { products: { product: pid, quantity: quantity } } }
            );
            return `Producto agregado`
        } else {
            await this.carts.updateOne(
                { _id: cid, "products.product": pid },
                { $inc: { "products.$.quantity": quantity } }
            );
            return `Cantidad sumada`
        }
    }

    createCart = async (newCart) => await this.carts.create(newCart)

    updateCart = async (cid, updatedCart) => await this.carts.updateOne({ _id: cid }, updatedCart)

    deleteProductByIdInCart = async (cid, pid) => await this.carts.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } }
    )

    deleteProducts = async (cid) => await this.carts.updateOne(
        { _id: cid },
        { $set: { products: [] } }
    )
}


// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = CartDaoMongo
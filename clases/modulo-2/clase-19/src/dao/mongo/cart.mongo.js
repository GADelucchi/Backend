// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { cartModel } = require("./models/cart.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class CartManagerMongo {
    async getCarts() {
        try {
            return await cartModel.find({}).lean()
        } catch (error) {
            return new Error(error)
        }
    }

    async getCartById(cid) {
        try {
            return await cartModel.findOne({ _id: cid }).lean()
        } catch (error) {
            return new Error(error)
        }
    }

    async getCartByIdProductsById(cid, pid, quantity) {
        try {
            const cart = await cartModel.findOne({ _id: cid }).lean();
            const productIndex = cart.products.findIndex((product) => product.product._id.toString() === pid);

            if (quantity) {
                quantity
            } else {
                quantity = 1
            }

            if (productIndex === -1) {
                await cartModel.updateOne(
                    { _id: cid },
                    { $push: { products: { product: pid, quantity: quantity } } }
                );
                return `Producto agregado`
            } else {
                await cartModel.updateOne(
                    { _id: cid, "products.product": pid },
                    { $inc: { "products.$.quantity": quantity } }
                );
                return `Cantidad sumada`
            }
        } catch (error) {
            return new Error(error);
        }
    }

    async addCart(newCart) {
        try {
            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }

    async updateCart(cid, updatedCart) {
        try {
            return await cartModel.updateOne({ _id: cid }, updatedCart)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProductByIdInCart(cid, pid) {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } }
            )
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProducts(cid) {
        try {
            return await cartModel.updateOne(
                { _id: cid },
                { $set: { products: [] } }
            )
        } catch (error) {
            return new Error(error)
        }
    }
}


// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = CartManagerMongo
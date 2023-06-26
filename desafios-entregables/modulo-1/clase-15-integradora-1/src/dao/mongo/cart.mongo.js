// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { cartModel } = require("./models/cart.model")
const { productModel } = require(`./models/product.model`)

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class CartManagerMongo {
    async getCarts() {
        try {
            return await cartModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    async getCartById(cid) {
        try {
            return await cartModel.findOne({ _id: cid })
        } catch (error) {
            return new Error(error)
        }
    }

    async getCartByIdProductsById(cid, pid) {
        try {
            const cart = await cartModel.findOne({ _id: cid })

                const productIndex = cart.products.find(product => product.idProduct === pid)

                console.log(productIndex);
                
                if (!productIndex) {
                    return await cartModel.updateOne({_id: cid}, {$push: {products: {idProduct: pid, quantity: 1}}})
                } else {
                    return await cartModel.updateOne({_id: cid, "products.idProduct": pid}, {$inc: {"products.$.quantity": 1}})
                }
        } catch (error) {
            return new Error(error)
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

    async deleteCart(cid) {
        try {
            return await cartModel.deleteOne({ _id: cid })
        } catch (error) {
            return new Error(error)
        }
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = CartManagerMongo
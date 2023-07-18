// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class CartDaoMemory {
    constructor() {
        this.carts = []
    }

    get = () => this.carts

    getById = (cid) => this.carts.find(cart => cid === cart.id)

    getCartByIdProductsById = (cid, pid, quantity) => {
        const cart = this.carts.find(cart => cid === cart.id)
        const productIndex = cart.products.findIndex((product) => product.product._id.toString() === pid);

        if (quantity) {
            quantity
        } else {
            quantity = 1
        }

        if (productIndex === -1) {
            this.carts.push(
                { id: cid },
                { $push: { products: { product: pid, quantity: quantity } } }
            );
            return `Producto agregado`
        } else {
            this.carts.updateOne(
                { _id: cid, "products.product": pid },
                { $inc: { "products.$.quantity": quantity } }
            );
            return `Cantidad sumada`
        }
    }

    createCart = (newCart) => this.carts.push(newCart)

    updateCart = (cid, updatedCart) => {
        const index = this.carts.findIndex(cart => cid === cart.id)
        if (index !== -1) {
            this.carts[index] = updatedCart
            return true
        }
        return false
    }

    deleteProductByIdInCart = (cid, pid) => this.carts.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } }
    )

    deleteProducts = (cid) => this.carts.updateOne(
        { _id: cid },
        { $set: { products: [] } }
    )
}


// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = CartDaoMemory
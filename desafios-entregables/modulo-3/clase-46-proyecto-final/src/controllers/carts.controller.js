// Import
const { cartService } = require("../service/index.service")

// Code
class CartController {
    getCarts = async () => await cartService.get()

    getCartById = async (cid) => await cartService.getById(cid)

    createCart = async (newCart) => await cartService.create(newCart)

    updateCart = async (cid, pid, quantity) => await cartService.update(cid, pid, quantity)

    eraseProduct = async (cid, pid) => await cartService.deleteProductInCart(cid, pid)

    emptyCart = async (cid) => await cartService.deleteProducts(cid)

    deleteCart = async (cid) => await cartService.deleteCart(cid)
}

// Export
module.exports = new CartController()
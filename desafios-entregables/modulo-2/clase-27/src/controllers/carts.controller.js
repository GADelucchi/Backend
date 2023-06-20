// Import
const { cartService, productService } = require("../service")

// Code
class CartController {
    getCarts = async (req, res) => {
        try {
            const carts = await cartService.getCarts()
    
            return res.status(202).send({
                status: `Success`,
                payload: carts
            })
        } catch (error) {
            return res.status(400).send({
                status: `Failed`,
                message: `Error`,
                payload: error
            })
        }
    }

    getCartById = async (req, res) => {
        try {
            const { cid } = req.params
            const findedCart = await cartService.getCartById(cid)
    
            return res.status(202).render(`cart`, {
                status: `Success`,
                payload: findedCart
            })
        } catch (error) {
            return res.status(400).send({
                status: `Failed`,
                message: `Error`,
                payload: error
            })
        }
    }

    createCart = async (req, res) => {
        try {
            const cart = req.body
            const addedCart = await cartService.addCart(cart)
    
            if (addedCart === `Todos los campos son obligatorios`) {
                res.status(400).send({
                    status: `Failed`,
                    message: `Error: ${addedCart}`
                })
            } else {
                res.status(200).send({
                    status: `Success`,
                    payload: addedCart
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: `Failed`,
                message: `Error`,
                payload: error
            })
        }
    }

    updateCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const findedProduct = await productService.getProductsById(pid)
    
            if (!findedProduct) {
                throw new Error(`No existe ningún producto con ese ID`)
            } else {
                const productInCart = await cartService.getCartByIdProductsById(cid, pid, quantity)
    
                return res.status(200).send({
                    status: `Success`,
                    payload: productInCart
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: `Failed`,
                message: `Error`,
                payload: error
            })
        }
    }

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const findedProduct = await productService.getProductsById(pid)
    
            if (!findedProduct) {
                throw new Error(`No existe ningún producto con ese ID`)
            } else {
                const productInCart = await cartService.deleteProductByIdInCart(cid, pid)
    
                return res.status(200).send({
                    status: `Success`,
                    message: `Producto eliminado`,
                    payload: productInCart
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: `Failed`,
                message: `Error`,
                payload: error
            })
        }
    }

    emptyCart = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartService.deleteProducts(cid)
    
            return res.status(200).send({
                status: `Success`,
                message: `Carrito vaciado`,
                payload: cart,
            })
        } catch (error) {
            return res.status(400).send({
                status: `Failed`,
                message: `Error`,
                payload: error
            })
        }
    }
}

// Export
module.exports = new CartController()
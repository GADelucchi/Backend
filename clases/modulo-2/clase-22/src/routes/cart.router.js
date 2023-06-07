// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const ProductManagerMongo = require("../dao/mongo/product.mongo")
const CartManagerMongo = require(`../dao/mongo/cart.mongo`)

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const cartManagerMongo = new CartManagerMongo()
const productManagerMongo = new ProductManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, async (req, res) => {
    try {
        const carts = await cartManagerMongo.getCarts()

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
})

router.get(`/:cid`, async (req, res) => {
    try {
        const { cid } = req.params
        const findedCart = await cartManagerMongo.getCartById(cid)

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
})

router.post(`/`, async (req, res) => {
    try {
        const cart = req.body
        const addedCart = await cartManagerMongo.addCart(cart)

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
})

router.put(`/:cid/product/:pid`, async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const findedProduct = await productManagerMongo.getProductsById(pid)

        if (!findedProduct) {
            throw new Error(`No existe ningún producto con ese ID`)
        } else {
            const productInCart = await cartManagerMongo.getCartByIdProductsById(cid, pid, quantity)

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
})

router.put(`/:cid`, async (req, res) => {
    try {
        const { cid } = req.params
    } catch (error) {
        return res.status(400).send({
            status: `Failed`,
            message: `Error`,
            payload: error
        })
    }
})

router.delete(`/:cid/product/:pid`, async (req, res) => {
    try {
        const { cid, pid } = req.params
        const findedProduct = await productManagerMongo.getProductsById(pid)

        if (!findedProduct) {
            throw new Error(`No existe ningún producto con ese ID`)
        } else {
            const productInCart = await cartManagerMongo.deleteProductByIdInCart(cid, pid)

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
})

router.delete(`/:cid`, async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartManagerMongo.deleteProducts(cid)

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
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router
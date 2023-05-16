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
        return new Error(error)
    }
})

router.get(`/:cid`, async (req, res) => {
    try {
        const { cid } = req.params
        const findedCart = await cartManagerMongo.getCartById(cid)

        return res.status(202).send({
            status: `Success`,
            payload: findedCart
        })
    } catch (error) {
        return res.status(400).send({
            status: `Failed`,
            message: `Error: No existe ningún carrito con ese ID`,
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
        return error
    }
})

router.post(`/:cid/product/:pid`, async (req, res) => {
    try {
        const { cid, pid } = req.params
        const findedProduct = await productManagerMongo.getProductsById(pid)

        const cart = await cartManagerMongo.getCartById(cid)

        if (!findedProduct) {
            throw new Error(`No existe ningún producto con ese ID`)
        } else {
            const productInCart = await cartManagerMongo.getCartByIdProductsById(cid, pid)

            return res.status(200).send({
                status: `Success`,
                message: `Producto ${pid} agregado al carrito ${cid}`,
                payload: cart
            })
        }
    } catch (error) {
        return res.status(404).send({
            status: `Failed`,
            message: `Algo salió mal`,
        })
    }
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router
// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const cartsController = require("../controllers/carts.controller")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, cartsController.getCarts)

router.get(`/:cid`, cartsController.getCartById)

router.post(`/`, cartsController.createCart)

router.put(`/:cid/product/:pid`, cartsController.updateCart)

router.delete(`/:cid/product/:pid`, cartsController.deleteProductInCart)

router.delete(`/:cid`, cartsController.emptyCart)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router
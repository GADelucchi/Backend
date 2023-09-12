// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const productsController = require('../controllers/products.controller')

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, productsController.getProducts)

router.get(`/:pid`, productsController.getProductById)

router.post(`/`, productsController.createProduct)

router.put(`/:pid`, productsController.updateProduct)

router.delete(`/:pid`, productsController.deleteProduct)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
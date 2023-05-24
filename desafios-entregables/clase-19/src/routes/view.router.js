// Imports externos –––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const ProductManagerMongo = require(`../dao/mongo/product.mongo`)

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const productManagerMongo = new ProductManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, async (req, res) => {
    const products = await productManagerMongo.getProducts()
    const objeto = {
        title: `Productos`,
        payload: products
    }
    res.render(`home`, {
        status: `Succes`,
        objeto
    })
})

router.get(`/realtimeproducts`, (req, res) => {
    res.render(`realTimeProducts`)
})

// router.get(`/chat`, (req, res) => {
//     const messages = messageManagerMongo.getMessages()

//     res.render(`message`, {})
// })

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router





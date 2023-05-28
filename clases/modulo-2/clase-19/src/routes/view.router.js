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
    // console.log(products);
    res.render(`home`, {
        status: `Succes`,
        payload: products
    })
})

router.get(`/realtimeproducts`, (req, res) => {
    res.render(`realTimeProducts`)
})

router.get(`/login`, (req, res) => {
    res.render(`login`, {
        style: `index.css`
    })
})

router.get(`/register`, (req, res) => {
    res.render(`registerForm`, {
        style: `index.css`
    })
})  

// router.get(`/chat`, (req, res) => {
//     const messages = messageManagerMongo.getMessages()

//     res.render(`message`, {})
// })

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router





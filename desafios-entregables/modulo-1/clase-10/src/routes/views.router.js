// Imports externos  –----------------------------------------
const { Router } = require(`express`)
const ProductsManager = require(`../managerDaos/productsManager`)

const router = Router()
const productManager = new ProductsManager()

router.get(`/`, async (req, res) => {
    const products = await productManager.getProducts()
    const objeto = {
        title: `Productos`,
        products
    }
    res.render(`home`, objeto)
})

router.get(`/realtimeproducts`, (req, res) => {
    res.render(`realTimeProducts`)
})

module.exports = router





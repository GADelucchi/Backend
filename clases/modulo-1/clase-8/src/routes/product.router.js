const { Router } = require(`express`)
const ProductManager = require(`../managerDaos/productManager`)

const router = Router()
const productManager = new ProductManager()

const productos = []

router.get(`/`, async (req, res) => {
    const products = await productManager.getProducts()

    res.status(200).send(products)
})

router.post(`/`, async (req, res) => {
        let product = await productManager.addProduct(`Producto 12`, `Descripción producto 12`, 200, `Sin imageen`, `Prod12`, 3)
    
        productos.push(product)
        res.status(200).send(`Producto agregado`)
})

module.exports = router
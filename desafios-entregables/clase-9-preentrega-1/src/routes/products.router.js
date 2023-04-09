const { Router } = require(`express`)
const ProductsManager = require(`../managerDaos/productsManager`)


const router = Router()
const productsManager = new ProductsManager


const products = []

router.get(`/`, async (req, res) => {
    try {
        const { limit } = req.query
        const allProducts = await productsManager.getProducts()

        if (!limit) {
            return res.status(200).send({
                status: `Success`,
                payload: allProducts
            })
        }
        return res.status(200).send({
            status: `Success`,
            payload: allProducts.slice(0, limit)
        })
    } catch {
        res.status(400).send({
            status: `Failed`,
            error: `No existe el archivo en la ubicación especificada`
        })
    }
})

router.get(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const findedProduct = await productsManager.getProductById(pid)

        if (findedProduct) 
        return res.status(200).send({
            status: `Success`,
            payload: findedProduct
        })
    } catch {
        res.status(404).send({
            status: `Failed`,
            error: `No existe ningún producto con ese ID`
        })
    }
})


module.exports = router
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
    } catch (error) {
        res.status(400).send({
            status: `Failed`,
            error: `No existe el archivo en la ubicación especificada`
        })
    }
})

router.get(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const findedProduct = await productsManager.getProductById(parseInt(pid))

        if (findedProduct) return res.status(202).send({
            status: `Success`,
            payload: findedProduct
        })
    } catch (error) {
        return res.status(404).send({
            status: `Failed`,
            message: `Error: No existe ningún producto con ese ID`,
            error: error
        })
    }
})

router.post(`/`, (req, res) => {
    let product = req.body
})


module.exports = router
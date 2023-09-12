// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const ProductManagerMongo = require("../dao/mongo/product.mongo")

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const productManagerMongo = new ProductManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, async (req, res) => {
    try {
        const { limit = 10, page = 1, category = {}, sort = {} } = req.query
        const products = await productManagerMongo.getProductsPaginated(limit, page, category, sort)
        const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
        // const docsStringified =  JSON.stringify(docs)
        // console.log(docsStringified);
        res.status(200).render(`products`, {
            status: `Success`,
            docs,
            totalPages,
            prevPage,
            nextPage,   
            page,
            hasPrevPage,
            hasNextPage
        })
    } catch (error) {
        res.status(400).send({
            status:`Error`,
            payload: error
        })
    }
})

router.get(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params

        let product = await productManagerMongo.getProductsById(pid)
        res.status(200).send({
            status: `Success`,
            payload: product
        })
    } catch {
        console.log(error)
    }
})

router.post(`/`, async (req, res) => {
    try {
        const newProduct = req.body

        let result = await productManagerMongo.addProduct(newProduct)
        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch {
        console.log(error)
    }
})

router.put(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const product = req.body

        const productToReplace = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock,
            code: product.code
        }

        let result = await productManagerMongo.updateProduct(pid, productToReplace)

        // console.log(result);

        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch {
        console.log(error)
    }
})

router.delete(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params

        let result = await productManagerMongo.deleteProduct(pid)

        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch {
        console.log(error)
    }
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
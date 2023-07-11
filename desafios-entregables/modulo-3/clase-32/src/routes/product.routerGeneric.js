const productsController = require("../controllers/products.controller");
const { RouterClass } = require("./routerClass");

class ProductRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {
                let result = await productsController.getProducts()

                if (!result) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.get('/paginated', ['PUBLIC'], async (req, res) => {
            try {
                const { limit = 10, page = 1, category = {}, sort = {} } = req.query
                const result = await productsController.getProductsPaginated(limit, page, category, sort)

                if (!result) {
                    throw new Error(error)
                }

                const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = result
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
                res.sendServerError(error)
            }
        })

        this.get('/:pid', ['PUBLIC'], async (req, res) => {
            try {
                const { pid } = req.params
                const result = await productsController.getProductById(pid)

                if (!result) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.post('/', ['ADMIN'], async (req, res) => {
            try {
                const newProduct = req.body
                const result = await productsController.createProduct(newProduct)

                if (!result) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.put('/:pid', ['ADMIN'], async (req, res) => {
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
                const result = await productsController.updateProduct(pid, productToReplace)

                if (!result) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.delete('/:pid', ['ADMIN'], async (req, res) => {
            try {
                const { pid } = req.params
                const result = await productsController.deleteProduct(pid)

                if (!result) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = ProductRouter
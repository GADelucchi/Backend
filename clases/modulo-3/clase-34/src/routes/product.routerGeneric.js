const productsController = require("../controllers/products.controller");
const { EError } = require("../utils/CustomError/EErrors");
const { CustomError } = require("../utils/CustomError/customError");
const { generateProductErrorInfo } = require("../utils/CustomError/info");
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
                logger.error(error)
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
                logger.error(error)
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
                logger.error(error)
            }
        })

        this.post('/', ['PUBLIC'], async (req, res, next) => {
            try {
                const newProduct = req.body
                if (!newProduct.title ||
                    !newProduct.description ||
                    !newProduct.price ||
                    !newProduct.stock ||
                    !newProduct.category ||
                    !newProduct.code) {
                    CustomError.createError({
                        name: 'Product creation error',
                        cause: generateProductErrorInfo(newProduct),
                        message: 'One or more properties were incompleted or invalid.',
                        code: EError.INVALID_ERROR
                    })
                }

                const result = await productsController.createProduct(newProduct)

                if (!result) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (err) {
                next(err)
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
                logger.error(error)
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
                logger.error(error)
            }
        })
    }
}

module.exports = ProductRouter
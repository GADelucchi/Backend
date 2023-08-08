const { jwtPrivateKey } = require("../../process/config");
const { logger } = require("../config/logger");
const productsController = require("../controllers/products.controller");
const { EError } = require("../utils/CustomError/EErrors");
const { CustomError } = require("../utils/CustomError/customError");
const { generateProductErrorInfo } = require("../utils/CustomError/info");
const { RouterClass } = require("./routerClass");
const jwt = require('jsonwebtoken')

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

        this.post('/', ['ADMIN', 'PREMIUM'], async (req, res, next) => {
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

                const authCookie = req.cookies.accessToken
                const user = jwt.verify(authCookie, jwtPrivateKey)

                if (user.user.role === 'premium') {
                    newProduct.owner = user.user.email
                }

                const result = await productsController.createProduct(newProduct)



                res.sendSuccess(result)
            } catch (err) {
                if (err.code === 11000) {
                    return res.status(500).send({
                        status: 'Error',
                        payload: 'Código ya existente'
                    })
                } else {
                    logger.error(err)
                }
            }
        })

        this.put('/:pid', ['ADMIN', 'PREMIUM'], async (req, res) => {
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

        this.delete('/:pid', ['ADMIN', 'PREMIUM'], async (req, res) => {
            try {
                const { pid } = req.params
                const product = await productsController.getProductById(pid)

                if (!product) {
                    throw new Error(error)
                }

                const authCookie = req.cookies.accessToken
                const user = jwt.verify(authCookie, jwtPrivateKey)

                if (user.user.role === 'premium') {
                    if (product.owner === user.user.email) {
                        const result = await productsController.deleteProduct(pid)
                        return res.sendSuccess(result)
                    } else {
                        return res.send({
                            status: 'Error',
                            message: 'You are not the owner of this product. You can delete it'
                        })
                    }
                } else {
                    const result = await productsController.deleteProduct(pid)
                    return res.sendSuccess(result)
                }
            } catch (error) {
                logger.error(error)
            }
        })
    }
}

module.exports = ProductRouter
// Import
const { productService } = require("../service")

// Code
class ProductController {
    getProducts = async (req, res) => {
        try {
            const { limit = 10, page = 1, category = {}, sort = {} } = req.query
            const products = await productService.getProductsPaginated(limit, page, category, sort)
            const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
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
    }

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params
    
            let product = await productService.getProductsById(pid)
            res.status(200).send({
                status: `Success`,
                payload: product
            })
        } catch {
            console.log(error)
        }
    }

    createProduct = async (req, res) => {
        try {
            const newProduct = req.body
    
            let result = await productService.create(newProduct)
            res.status(200).send({
                status: `Success`,
                payload: result
            })
        } catch {
            console.log(error)
        }
    }

    updateProduct = async (req, res) => {
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
    
            let result = await productService.update(pid, productToReplace)
    
            res.status(200).send({
                status: `Success`,
                payload: result
            })
        } catch {
            console.log(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
    
            let result = await productService.delete(pid)
    
            res.status(200).send({
                status: `Success`,
                payload: result
            })
        } catch {
            console.log(error)
        }
    }
}

// Export
module.exports = new ProductController()
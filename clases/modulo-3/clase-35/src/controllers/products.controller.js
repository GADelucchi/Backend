// Import
const { productService } = require("../service/index.service")

// Code
class ProductController {
    getProducts = async () => await productService.get()

    getProductsPaginated = async (limit, page, category, sort) => await productService.getPaginated(limit, page, category, sort)

    getProductById = async (pid) => await productService.getById(pid)

    createProduct = async (newProduct) => await productService.create(newProduct)

    updateProduct = async (pid, productToReplace) => await productService.update(pid, productToReplace)

    deleteProduct = async (pid) => await productService.delete(pid)
}

// Export
module.exports = new ProductController()
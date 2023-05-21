// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { productModel } = require("./models/product.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class ProductManagerMongo {
    async getProducts(limit, page,) {
        try {
            return await productModel.paginate({}, { limit: limit, page: page, lean: true })
        } catch (error) {
            return new Error(error)
        }
    }

    async getProductsById(pid) {
        try {
            return await productModel.findOne({ _id: pid })
        } catch (error) {
            return new Error(error)
        }
    }

    async addProduct(newProduct) {
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async updateProduct(pid, updatedProduct) {
        try {
            return await productModel.updateOne({ _id: pid }, updatedProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProduct(pid) {
        try {
            return await productModel.deleteOne({ _id: pid })
        } catch (error) {
            return new Error(error)
        }
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = ProductManagerMongo
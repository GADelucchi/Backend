// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { productModel } = require("./models/product.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class ProductManagerMongo {
    constructor() {
        this.product = productModel
    }
    async getProducts() {
            return await this.product.find({}).lean()
    }

    async getProductsPaginated(limit, page, category, sort) {
            let categoryString = {}
            if (category) {
                categoryString.category = { $regex: new RegExp(category, `i`) }
            }

            let sortType = {}
            if (sort === `asc`) {
                sortType = { price: 1 }
            } else if (sort === `desc`) {
                sortType = { price: -1 }
            }

            return await this.product.paginate(categoryString,
                {
                    limit: limit,
                    page: page,
                    sort: sortType,
                    lean: true
                }
            )
    }

    async getProductsById(pid) {
            return await this.product.findOne({ _id: pid })
    }

    async addProduct(newProduct) {
            return await this.product.create(newProduct)
    }

    async updateProduct(pid, updatedProduct) {
            return await this.product.updateOne({ _id: pid }, updatedProduct)
    }

    async deleteProduct(pid) {
            return await this.product.deleteOne({ _id: pid })
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = ProductManagerMongo
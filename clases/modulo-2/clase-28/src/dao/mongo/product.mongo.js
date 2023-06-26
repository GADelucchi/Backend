// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { productModel } = require("./models/product.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class ProductDaoMongo {
    constructor() {
        this.products = productModel
    }

    getProducts = async () => await this.products.find({}).lean()

    getProductsPaginated = async (limit, page, category, sort) => {
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

        return await this.products.paginate(categoryString,
            {
                limit: limit,
                page: page,
                sort: sortType,
                lean: true
            }
        )
    }

    getProductsById = async (pid) => await this.products.findOne({ _id: pid })

    create = async (newProduct) => await this.products.create(newProduct)

    update = async (pid, updatedProduct) => await this.products.updateOne({ _id: pid }, updatedProduct)

    delete = async (pid) => await this.products.deleteOne({ _id: pid })
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = ProductDaoMongo
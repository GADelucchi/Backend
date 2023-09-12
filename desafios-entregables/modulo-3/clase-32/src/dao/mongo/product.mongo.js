// Imports
const { productModel } = require("./models/product.model")

// Clase
class ProductDaoMongo {
    constructor() {
        this.model = productModel
    }

    get = async () => await this.model.find({})

    getPaginated = async (limit, page, category, sort) => {
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

        return await this.model.paginate(categoryString,
            {
                limit: limit,
                page: page,
                sort: sortType,
                lean: true
            }
        )
    }

    getById = async (pid) => await this.model.find({ _id: pid })

    create = async (newProduct) => await this.model.create(newProduct)

    update = async (pid, updatedProduct) => await this.model.updateOne({ _id: pid }, updatedProduct)

    delete = async (pid) => await this.model.deleteOne({ _id: pid })
}

// Export
module.exports = ProductDaoMongo
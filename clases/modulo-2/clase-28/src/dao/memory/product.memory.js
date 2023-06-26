// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class ProductDaoMemory {
    constructor() {
        this.products = []
    }

    getProducts = () => this.products

    getProductsPaginated(limit, page, category, sort) {
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

        return this.product.paginate(categoryString,
            {
                limit: limit,
                page: page,
                sort: sortType,
                lean: true
            }
        )
    }

    getProductsById = (pid) => this.products.find(product => pid === product.id)

    addProduct = (newProduct) => this.products.push(newProduct)

    updateProduct = (pid, updatedProduct) => {
        const index = this.products.findIndex(product => pid === product.id)
        if (index !== -1) {
            this.products[index] = updatedProduct
            return true
        }
        return false
    }

    deleteProduct = (pid) => {
        const index = this.products.findIndex(product => pid === product.id)
        if (index !== -1) {
            this.products.splice(index, 1)
            return true
        }
        return false
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = ProductDaoMemory
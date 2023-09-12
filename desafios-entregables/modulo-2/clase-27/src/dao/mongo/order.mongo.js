// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { orderModel } = require("./models/order.model")

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class OrderManagerMongo {
    async getOrders() {
        try {
            return await orderModel.find({}).lean()
        } catch (error) {
            return new Error(error)
        }
    }

    async getOrderById(pid) {
        try {
            return await orderModel.findOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }

    async addOrder() {
        try {
            return await orderModel.insertMany()
        } catch (error) {
            return new Error(error)
        }
    }

    async updateProduct(pid, ordeProduct) {
        try {
            return await productModel.updateOne({_id: pid}, updatedProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProduct(pid) {
        try {
            return await productModel.deleteOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = OrderManagerMongo
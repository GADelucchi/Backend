const productsController = require("../controllers/products.controller")

const socketProduct = async (io) => {
    try {
        // const products = await productsController.getProducts()
        io.on(`connection`, socket => {
            console.log(`Cliente conectado`);
            socket.emit(`productos`, products)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { socketProduct }
const ProductsManager = require(`../managerDaos/productsManager`)

const productManager = new ProductsManager()

const socketProduct = async (io) => {
    const products = await productManager.getProducts()

    io.on(`connection`, socket => {
            console.log(`Cliente conectado`);
            socket.emit(`productos`, products)
    })
}

module.exports = { socketProduct }
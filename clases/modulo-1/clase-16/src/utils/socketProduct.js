const ProductManagerMongo = require(`../dao/mongo/product.mongo`)

const productManagerMongo = new ProductManagerMongo()

const socketProduct = async (io) => {
    try {
        const products = await productManagerMongo.getProducts()
    
        io.on(`connection`, socket => {
                console.log(`Cliente conectado`);
                socket.emit(`productos`, products)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { socketProduct }
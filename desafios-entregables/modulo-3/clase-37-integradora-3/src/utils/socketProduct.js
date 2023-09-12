const { logger } = require("../config/logger");

const socketProduct = async (io) => {
    try {
        io.on(`connection`, socket => {
            logger.info(`Cliente conectado`);
            socket.emit(`productos`, products)
        })
    } catch (error) {
        logger.error(error)
    }
}

module.exports = { socketProduct }
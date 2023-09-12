const { connect } = require('mongoose')
const { mongoUrl } = require('../../process/config')
const { logger } = require('../config/logger')

class MongoSingleton {
    static #instance
    constructor() {
        connect(mongoUrl, {
            useNewUrlParser: true,
            UseUnifiedTopology: true
        })
    }
    static getInstance() {
        if (this.#instance) {
            logger.info('Base de datos ya conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        logger.info('Base de datos creada')
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}
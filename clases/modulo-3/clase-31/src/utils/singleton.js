const { connect } = require('mongoose')
const { mongoUrl } = require('../../process/config')

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
            console.log('Base de datos ya conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Base de datos creada')
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}
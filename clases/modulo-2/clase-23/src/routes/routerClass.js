const { Router } = require("express");

class RouterClass {
    constructor() {
        this.router = Router
        this.init()
    }

    getRouter() {
        return this.router
    }

    init() { }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }

    get(path, ...callbacks) {
        this.router.get(path, this.applyCallbacks(callbacks))
    }

    post() { }

    put() { }

    delete() { }
}

module.exports = { RouterClass }
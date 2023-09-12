const { Router } = require("express");
const jwt = require('jsonwebtoken');

class RouterClass {
    constructor() {
        this.router = Router()
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

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Error', error })
        res.sendUserError = error => res.send({ status: 'Error', error })
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies[0] === 'PUBLIC') return next()

        const authHeader = req.headers.authorization
        if (!authHeader) return res.send({status: 'Error', error: 'No authorization'})

        const token = authHeader.split(' ')
        const user = jwt.verify(token, 'palabraJwtSecreta')
        if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({status: 'Error', error: 'Not permission'})
        req.user = user
        next()
    }
    

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }   
}

module.exports = { RouterClass }
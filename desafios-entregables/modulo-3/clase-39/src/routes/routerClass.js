const { Router } = require("express");
const jwt = require('jsonwebtoken');
const { logger } = require("../config/logger");
const { jwtPrivateKey } = require("../../process/config");

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
                params[1].status(500).send(error)
                logger.error(error)
            }
        })
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = payload => res.status(200).send({ status: 'Success', payload })
        res.sendServerError = error => res.status(500).send({ status: 'Error', error })
        res.sendUserError = error => res.send({ status: 'Error', error })
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies[0] === 'PUBLIC') return next()

        const authCookie = req.cookies.accessToken
        if (!authCookie) return res.status(401).send({status: 'Error', error: 'No authorization cookie detected'})

        const user = jwt.verify(authCookie, jwtPrivateKey)
        if (!policies.includes(user.user.role.toUpperCase())) return res.status(403).send({status: 'Error', error: 'Not permission'})
        req.user = user
        next()
    }
    

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
}

module.exports = { RouterClass }
// Import
const { userService, productService } = require("../service/index.service");
const { sendMail } = require('../utils/sendMail')
const { port } = require('../../process/config')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const { generateToken, generateTokenRestorePass, authTokenRestorePass } = require('../utils/jwt.js');
const { logger } = require("../config/logger");
const jwt = require('jsonwebtoken')
const { jwtPrivateKey } = require('../../process/config');
const productsController = require("./products.controller");

// Code
class SessionController {
    getCurrent = async (req, res) => {
        res.status(200).send(req.user)
    }

    postLogin = async (req, res) => {
        const { email, password } = req.body
        const userDB = await userService.getByEmail(email)
        if (!userDB) {
            return res.send({
                status: `Error`,
                message: `Email doesn't exist`
            })
        }

        if (!isValidPassword(password, userDB)) {
            return res.status(401).send({
                status: `Error`,
                message: `Email or password incorrect`
            })
        }

        await userService.updateLastConection(email)

        const tokenUser = {
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            date_of_birth: userDB.date_of_birth,
            role: userDB.role
        }
        const access_token = generateToken(tokenUser)

        const { limit = 10, page = 1, category = {}, sort = {} } = req.query
        const products = await productsController.getProductsPaginated(limit, page, category, sort)
        const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products

        res.status(200)
            .cookie('accessToken', access_token, { expiresIn: '1d', httpOnly: true })
            .render('products', {
                status: 'Success',
                message: 'Login success',
                id: userDB._id,
                userDB,
                access_token,
                docs,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage
            })
    }

    getPrivate = async (req, res) => {
        const user = await userService.getByEmail(req.user.email)
        res.status(200).render(`private`, user)
    }

    postRegister = async (req, res, next) => {
        try {
            let {
                first_name,
                last_name,
                email,
                age,
                password,
                role
            } = req.body

            const existUser = await userService.getByEmail(email)

            if (existUser) {
                return res.send({
                    status: `Error`,
                    message: `Email already exist`
                })
            }

            if (role === 'on') {
                role = 'admin'
            } else {
                role = 'user'
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role: role
            }

            let resultUser = await userService.create(newUser)

            const tokenUser = {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age,
                role: newUser.role
            }
            const regiter_token = generateToken(tokenUser)

            res.status(200).send({
                status: `Success`,
                message: `User succesfully created`,
                payload: resultUser,
                token: regiter_token
            })
        } catch (err) {
            next(err)
        }
    }

    initRestorePass = (req, res) => res.status(200).render(`sendMailTo`)

    sendMail = async (req, res) => {
        const { email } = req.body
        const user = await userService.getByEmail(email)

        if (!user) {
            return res.send({
                status: 'Error',
                message: 'Usuario no encontrado'
            })
        }
        const restore_token = generateTokenRestorePass(email)

        sendMail(email, 'Restablecimiento de clave solicitado',
            `<a href="http://localhost:${port}/api/session/getrestorepass/${restore_token}">Restablecer</a>`
        )

        res.status(200)
            .cookie('restore_token', restore_token, { expiresIn: '1h', httpOnly: true })
            .render('mailSended')
    }

    getRestorePass = async (req, res) => {
        res.status(200).render('restorePass', { emailFromToken: req.email })
    }

    postRestorePass = async (req, res) => {
        const { email, password } = req.body

        if (email !== req.body.email) {
            return res.send({
                status: 'Error',
                message: 'Change your own password'
            })
        }

        const userDB = await userService.getByEmail(email)

        if (!userDB) {
            return res.send({
                status: `Error`,
                message: `Email doesn't exist`
            })
        }

        if (isValidPassword(password, userDB)) {
            return res.status(400).send({
                status: 'Error',
                message: 'Cannot use same password'
            })
        } else {
            const passwordHashed = createHash(password)
            userDB.password = passwordHashed
            await userDB.save()

            res.status(200).send({
                status: `Success`,
                message: `Password successfully updated`
            })
        }
    }


    getLogout = async (req, res) => {
        const token = req.cookies.accessToken;

        let email

        jwt.verify(token, jwtPrivateKey, (error, data) => {
            if (error) {
                return res.status(403).send({
                    status: 'Error',
                    error: 'No autorizado',
                    located: '/utils/jwt.js'
                })
            }
            email = data.user.email
        })

        await userService.updateLastConection(email)

        res.status(200).cookie('accesToken', null, { expires: new Date(0) }).render('login', {})
    }

    getGithubCallback = async (req, res) => {
        req.session.user = {
            username: req.user.username,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            admin: false
        }

        if (req.user.role === 'true') {
            req.user.role = `Admin`
            req.session.user.admin = true
        } else {
            req.user.role = `Usuario`
        }

        const { limit = 10, page = 1, category = {}, sort = {} } = req.query
        const products = await productService.getPaginated(limit, page, category, sort)
        const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
        const { username, first_name, last_name, date_of_birth, email, role } = req.user

        res.status(200).render(`products`, {
            first_name,
            last_name,
            email,
            date_of_birth,
            username,
            role,
            docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage
        })
    }
}

// Export
module.exports = new SessionController()
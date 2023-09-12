// Import
const { userService, productService } = require("../service/index.service");
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const { generateToken } = require('../utils/jwt.js')

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

        const tokenUser = {
            username: userDB.username,
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            date_of_birth: userDB.date_of_birth,
            role: userDB.role
        }
        const access_token = generateToken(tokenUser)

        res.status(200)
            .cookie('accessToken', access_token, { expiresIn: '1d', httpOnly: true })
            .send({
                status: 'Success',
                message: 'Login success',
                userDB,
                access_token
            })
    }

    getPrivate = async (req, res) => {
        const user = await userService.getByEmail(req.user.email)
        res.status(200).render(`private`, user)
    }

    postRegister = async (req, res, next) => {
        try {
            let { username,
                first_name,
                last_name,
                email,
                age,
                password,
                role
            } = req.body

            const existUser = await userService.getByEmail(email)

            // if (!username || !first_name || !last_name || !email) {
            //     CustomError.createError({
            //         name: 'User creation error',
            //         cause: generateUserErrorInfo({ username, first_name, last_name, email }),
            //         message: 'Error trying to create user',
            //         code: EError.INVALID_ERROR
            //     })
            // }

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
                username,
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role: role
            }

            let resultUser = await userService.create(newUser)

            // const tokenUserPrueba = {
            //     username: username,
            //     first_name: first_name,
            //     last_name: last_name,
            //     email: email,
            // }
            // const regiter_token_prueba = generateToken(tokenUserPrueba)

            const tokenUser = {
                username: newUser.username,
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

    postRestorePass = async (req, res) => {
        const { username, password } = req.body
        const userDB = await userService.getByUsername(username)

        if (!userDB) {
            return res.send({
                status: `Error`,
                message: `Username doesn't exist`
            })
        }

        userDB.password = createHash(password)
        await userDB.save()

        res.status(200).json({
            status: `Success`,
            message: `Password successfully updated`
        })
    }

    getLogout = (req, res) => {
        res.status(200).cookie('accesToken', null, { expires: new Date(0) }).render('login', {})
    }

    getCounter = (req, res) => {
        if (req.session.counter) {
            req.session.counter++
            res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
        } else {
            req.session.counter = 1
            res.send(`Bienvenido`)
        }
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
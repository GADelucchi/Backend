// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)
const passport = require('passport')

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { auth } = require('../middlewares/authentication.js')
const UserManagerMongo = require(`../dao/mongo/user.mongo.js`)
const ProductManagerMongo = require("../dao/mongo/product.mongo.js")
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const { generateToken } = require('../utils/jwt.js')
const { passportCall } = require('../passport-jwt/passportCall.js')
const { authorization } = require('../passport-jwt/authorizationJwtRole.js')

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const userManagerMongo = new UserManagerMongo()
const productManagerMongo = new ProductManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get('/current', passportCall('jwt'), authorization('admin'), async (req, res) => {
    res.status(200).send(req.user)
})

router.post(`/login`, async (req, res) => {
    const { username, password } = req.body
    const userDB = await userManagerMongo.getUserByUsername(username)
    // console.log(req.body);
    // console.log(userDB);
    if (!userDB) {
        return res.send({
            status: `Error`,
            message: `Username doesn't exist`
        })
    }

    if (!isValidPassword(password, userDB)) {
        return res.status(401).send({
            status: `Error`,
            message: `Username or password incorrect`
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

    const { limit = 10, page = 1, category = {}, sort = {} } = req.query
    const products = await productManagerMongo.getProductsPaginated(limit, page, category, sort)
    const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
    const { first_name, last_name, age, email, role } = userDB

    res.status(200).cookie('accessToken', access_token, { maxAge: 100 * 100, httpOnly: true }).render(`products`, {
        first_name,
        last_name,
        email,
        age,
        username,
        role,
        docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        access_token
    })
})

router.get(`/private`, auth, async (req, res) => {
    const user = await userManagerMongo.getUserByEmail(req.session.user.email)
    res.status(200).render(`private`, user)
})

router.post(`/register`, async (req, res) => {
    const { username, first_name, last_name, email, age, password, admin } = req.body
    const existUser = await userManagerMongo.getUserByEmail(email)

    if (existUser) {
        return res.send({
            status: `Error`,
            message: `Email already exist`
        })
    }

    const newUser = {
        username,
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: admin
    }

    if (newUser.role === 'on') {
        newUser.role = 'admin'
    } else {
        newUser.role = 'user'
    }

    let resultUser = await userManagerMongo.addUser(newUser)

    const tokenUser = {
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        date_of_birth: newUser.date_of_birth,
        role: newUser.role
    }
    const regiter_token = generateToken(tokenUser)

    res.status(200).send({
        status: `Success`,
        payload: `User succesfully created`,
        resultUser,
        regiter_token
    })
})

router.post(`/restorepass`, async (req, res) => {
    const { username, password } = req.body
    const userDB = await userManagerMongo.getUserByUsername(username)

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
})

router.get(`/logout`, (req, res) => {
    res.clearCookie('accessToken')

    res.status(200).render(`login`, {})
})

router.get(`/counter`, (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send(`Bienvenido`)
    }
})

router.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`] }))

router.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `http://localhost:8080` }), async (req, res) => {

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
    const products = await productManagerMongo.getProductsPaginated(limit, page, category, sort)
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
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
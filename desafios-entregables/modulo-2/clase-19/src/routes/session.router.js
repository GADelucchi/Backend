// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { auth } = require('../middlewares/authentication.js')
const UserManagerMongo = require(`../dao/mongo/user.mongo`)
const ProductManagerMongo = require("../dao/mongo/product.mongo")

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const userManagerMongo = new UserManagerMongo()
const productManagerMongo = new ProductManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.post(`/login`, async (req, res) => {
    const { username, password } = req.body
    const userDB = await userManagerMongo.getUserByUsername(username, password)

    if (!userDB) {
        return res.send({
                status: `Error`,
                message: `Username or password incorrect`
            })
        }

    req.session.user = {
        username: userDB.username,
        email: userDB.email,
        role: userDB.role,
        admin: false
    }
    
    if (userDB.role === `on`) {
        userDB.role = `Admin`
        req.session.user.admin = true
    } else {
        userDB.role = `Usuario`
    }
    
    const { limit = 10, page = 1, category = {}, sort = {} } = req.query
    const products = await productManagerMongo.getProductsPaginated(limit, page, category, sort)
    const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
    const {first_name, last_name, date_of_birth, email, role } = userDB

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

router.get(`/private`, auth, async (req, res) => {
    const user = await userManagerMongo.getUserByEmail(req.session.user.email)
    console.log(user);
    res.status(200).render(`private`, user)
})

router.post(`/register`, async (req, res) => {
    const { username, first_name, last_name, email, date_of_birth, password, role } = req.body

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
        date_of_birth,
        password, // Más adelante se va a encriptar ya que no se debe guardar así nomás en la base de datos
        role
    }

    let resultUser = await userManagerMongo.addUser(newUser)

    res.status(200).send({
        status: `Success`,
        payload: `User succesfully created`,
        resultUser
    })
})

router.get(`/logout`, (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.send({
                status: `Error`,
                error: error
            })
        }
        res.status(200).render(`login`, {})
    })
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

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
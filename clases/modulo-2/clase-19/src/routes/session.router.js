// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { auth } = require('../middlewares/authentication.js')
const UserManagerMongo = require(`../dao/mongo/user.mongo`)

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const userManagerMongo = new UserManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, (req, res) => {
    res.render(`login`, {})
})

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
        // first_name: userDB.first_name,
        // last_name: userDB.last_name,
        email: userDB.email
    }
    res.status(200).send({
        status: `Success`,
        message: `Login succces`,
    })
})

router.get(`/private`, auth, async (req, res) => {
    const user = await userManagerMongo.getUserByEmail(req.session.user.email)
    console.log(user);
    res.status(200).render(`private`, {
        status: `Success`,
        payload: user
    })
})

router.post(`/register`, async (req, res) => {
    const { username, first_name, last_name, email, date_of_birth, password } = req.body

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
        password // Más adelante se va a encriptar ya que no se debe guardar así nomás en la base de datos
    }

    let resultUser = await userManagerMongo.addUser(newUser)

    // console.log(resultUser);
    // console.log(newUser);

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
        res.status(200).send(`logout success`)
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
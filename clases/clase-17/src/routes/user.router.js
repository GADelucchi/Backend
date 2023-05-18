// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const UserManagerMongo = require(`../dao/mongo/user.mongo`)

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const userManagerMongo = new UserManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, async (req, res) => {
    try {
        const users = await userManagerMongo.getUsers()
        const { page = 1 } = req.query
        const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = users
        res.status(200).render(`users`, {
            status: `Succes`,
            users: docs,
            hasPrevPage,
            hasNextPage,
            page,
            totalPages,
            prevPage,
            nextPage
        })
    } catch {
        console.log(error)
    }
})

router.get(`/:uid`, async (req, res) => {
    try {
        const { uid } = req.params

        let user = await userManagerMongo.getUserById(uid)
        res.status(200).send({
            status: `Success`,
            payload: user
        })
    } catch {
        console.log(error)
    }
})

router.post(`/`, async (req, res) => {
    try {
        const newUser = req.body

        let result = await userManagerMongo.addUser(newUser)
        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch {
        console.log(error)
    }
})

router.put(`/:uid`, async (req, res) => {
    try {
        const { uid } = req.params
        const user = req.body

        const userToReplace = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        }

        let result = await userManagerMongo.updateUser(uid, userToReplace)

        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch {
        console.log(error)
    }
})

router.delete(`/:uid`, async (req, res) => {
    try {
        const { uid } = req.params

        let result = await userManagerMongo.deleteUser(uid)

        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch {
        console.log(error)
    }
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
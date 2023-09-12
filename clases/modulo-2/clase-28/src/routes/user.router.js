// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const usersController = require("../controllers/users.controller")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, usersController.getUsers)

router.get(`/:uid`, usersController.getUserById)

router.post(`/`, usersController.createUser)

router.put(`/:uid`, usersController.updateUser)

router.delete(`/:uid`, usersController.deleteUser)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
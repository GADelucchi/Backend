// Imports externos –––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const viewsController = require("../controllers/views.controller")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, viewsController.get)

router.get(`/realtimeproducts`, viewsController.getRealTime)

router.get(`/login`, viewsController.getLogin)

router.get(`/register`, viewsController.getRegister)  

router.get(`/chat`, viewsController.getChat)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router





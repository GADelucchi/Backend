// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const contactController = require("../controllers/contact.controller")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, contactController.getContacts)

router.post(`/`, contactController.createContact)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
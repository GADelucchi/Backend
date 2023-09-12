// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const MessageManagerMongo = require("../dao/mongo/message.mongo")

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––
const messageManagerMongo = new MessageManagerMongo()

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, (req, res) => {
        const messages = messageManagerMongo.getMessages()
        
        res.render(`message`, {})
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
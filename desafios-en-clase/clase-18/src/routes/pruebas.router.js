// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––


// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––


// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, (req, res) => {
    res.render(`login`, {})
})

router.post(`/setcookieuser`, (req, res) => {
    const { username, email } = req.body

    res.cookie(username, email, {maxAge: 1000000, signed: true}).send({message: `set`})
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
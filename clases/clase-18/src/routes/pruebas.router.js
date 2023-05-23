// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––


// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––


// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/setCookie`, (req, res) => {
    res.cookie(`CoderCookie`, `Esta cookie es de chocolate`, {maxAge: 3000}).send(`Cookie seteada`)
})

router.get(`/getCookie`, (req, res) => {
    res.send(req.cookies)
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
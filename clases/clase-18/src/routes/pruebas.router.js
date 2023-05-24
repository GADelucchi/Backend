// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––


// Instancia ––––––––––––––––––––––––––––––––––––––––––––––––


// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/setCookie`, (req, res) => {
    res.cookie(`CoderCookie`, `Esta cookie es de chocolate`, {maxAge: 20000}).send(`Cookie set`)
})

router.get(`/setSignedCookie`, (req, res) => {
    res.cookie(`SignedCookie`, `Esta cookie es de chocolate firmado`, {maxAge: 200000, signed: true}).send(`Cookie set¡`)
})

router.get(`/getCookie`, (req, res) => {
    res.send(req.Cookies)
})

router.get(`/getSignedCookie`, (req, res) => {
    res.send(req.signedCookies)
})

router.get(`/deleteCookie`, (req, res) => {
    res.clearCookie(`CoderCookie`).send(`Cookie removed`)
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)
const session = require("express-session")
const { auth } = require('../middlewares/authentication')

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

    res.cookie(username, email, { maxAge: 1000000, signed: true }).send({ message: `set` })
})

// Cookies
router.get(`/setCookie`, (req, res) => {
    res.cookie(`CoderCookie`, `Esta cookie es de chocolate`, { maxAge: 20000 }).send(`Cookie set`)
})

router.get(`/setSignedCookie`, (req, res) => {
    res.cookie(`SignedCookie`, `Esta cookie es de chocolate firmado`, { maxAge: 200000, signed: true }).send(`Cookie set¡`)
})

router.get(`/getCookie`, (req, res) => {
    res.send(req.cookies)
})

router.get(`/getSignedCookie`, (req, res) => {
    res.send(req.signedCookies)
})

router.get(`/deleteCookie`, (req, res) => {
    res.clearCookie(`CoderCookie`).send(`Cookie removed`)
})

// Sessions
router.get(`/session`, (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send(`Bienvenido`)
    }
})

router.get(`/private`, auth, (req, res) => {
    res.send(`Todo lo que está acá lo ven solo los admins logueados`)
})

router.post(`/session`, (req, res) => {
    const { username, password } = req.body
    if (username !== `GADelucchi` || password !== `bla123`) {
        res.send(`login failed`)
    }

    req.session.user = username
    req.session.admin = true    
    console.log(req.session);
    res.send(`login success`)
})

router.get(`/logout`, (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.send({
                status: `Error`,
                error: error
            })
        }
        res.send(`logout ok`)
    })
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
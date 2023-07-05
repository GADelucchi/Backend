// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { auth } = require('../middlewares/authentication.js')
const { sendMail } = require('../utils/sendMail.js')

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get(`/`, (req, res) => {
    res.render(`login`, {})
})

router.get(`/mail`, async (req, res) => {
    let to = 'gdelucchi@me.com'
    let subject = 'Prueba'
    let html = `<div>
    <h1>Hola falopa</h1>
    </div>`

    let result = sendMail(to, subject, html)
    res.send('Email enviado')
})

router.get(`/sms`, (req, res) => {
    res.send('Email enviado')
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
    res.send(req.Cookies)
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

const nombres = ['fede', 'gas', 'fulano', 'sultano']

router.param('nombre', (req, res, next, nombre) => {
    if (!nombres.includes(nombre)) {
        req.nombre = null
    } else {
        req.nombre = nombre
    }
    next()
})

router.get(`/params/:nombre([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%C3%AF%C3%B6%C3%AB%C3%A4%C3%B1%C3%91%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%84%C3%8B%C3%8F%C3%96%C3%9C]+)`, (req, res) => {
    res.send({
        message: req.nombre
    })
})

// router.get(`/params/:nombre([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%C3%AF%C3%B6%C3%AB%C3%A4%C3%B1%C3%91%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%84%C3%8B%C3%8F%C3%96%C3%9C]+)`, (req, res) => {
//     res.send({
//         message: req.params.nombre
//     })
// })

router.put(`/params/:nombre([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%C3%AF%C3%B6%C3%AB%C3%A4%C3%B1%C3%91%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%84%C3%8B%C3%8F%C3%96%C3%9C]+)`, (req, res) => {
    res.send({
        message: req.params.nombre
    })
})

router.delete(`/params/:nombre([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%C3%AF%C3%B6%C3%AB%C3%A4%C3%B1%C3%91%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%84%C3%8B%C3%8F%C3%96%C3%9C]+)`, (req, res) => {
    res.send({
        message: req.params.nombre
    })
})

router.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 
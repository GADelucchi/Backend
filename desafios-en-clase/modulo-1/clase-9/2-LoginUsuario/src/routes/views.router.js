const { Router } = require(`express`)

const router = Router()

router.get(`/register`, (req, res) => {
    res.render(`registerForm`, {
        style: `index.css`
    })
})

router.post(`/register`, (req, res) => {
    // const {name, email, password} = req.body
    const user = req.body
    res.status(200).send({
        user,
        message: `Registro exitoso`
    })
})

module.exports = router
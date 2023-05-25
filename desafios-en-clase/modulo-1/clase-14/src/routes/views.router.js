const { Router } = require(`express`)

const router = Router()

let users = [
    {
        name: `Gastón`,
        lastName: `Delucchi`,
        age: 25,
        email: `gdelucchi@me.com`,
        phone: `2216079500`,
        role: `admin`
    },
    {
        name: `Melina`,
        lastName: `Beguiristain`,
        age: 24,
        email: `beguiristainmelina@hotmail.es`,
        phone: `2345562449`,
        role: `admin`
    },
    {
        name: `Guido`,
        lastName: `Delucchi`,
        age: 22,
        email: `jorge_delucchi@gmail.com`,
        phone: `2216072627`,
        role: `user`
    },
    {
        name: `Gustavo`,
        lastName: `Delucchi`,
        age: 62,
        email: `elpsi@me.com`,
        phone: `2214389500`,
        role: `user`
    },
    {
        name: `Fabiana`,
        lastName: `Marmissolle`,
        age: 55,
        email: `oncologa@gmail.com`,
        phone: `2215589286`,
        role: `user`
    }
]

router.get(`/chat`, (req, res) => {
    res.render(`chat`, {})
})

module.exports = router
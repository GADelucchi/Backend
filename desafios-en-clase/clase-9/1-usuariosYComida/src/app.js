const express = require(`express`)
const cookieParser = require(`cookie-parser`)

const handlebars = require(`express-handlebars`)
const { log } = require("handlebars/runtime")

const app = express()

app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware de terceros
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(`Mid app - time: `, Date.now());
    next()
})

let users = [
    {
        name: `Gastón`,
        lastName: `Delucchi`,
        age: 25,
        email: `gdelucchi@me.com`,
        phone: `2216079500`
    },
    {
        name: `Melina`,
        lastName: `Beguiristain`,
        age: 24,
        email: `beguiristainmelina@hotmail.es`,
        phone: `2345562449`
    },
    {
        name: `Guido`,
        lastName: `Delucchi`,
        age: 22,
        email: `jorge_delucchi@gmail.com`,
        phone: `2216072627`
    },
    {
        name: `Gustavo`,
        lastName: `Delucchi`,
        age: 62,
        email: `elpsi@me.com`,
        phone: `2214389500`
    },
    {
        name: `Fabiana`,
        lastName: `Marmissolle`,
        age: 55,
        email: `oncologa@gmail.com`,
        phone: `2215589286`
    }
]

app.get(`/vista`, (req, res) => {
    let user = users[Math.floor(Math.random() * users.length)];

    let testUser = {
        title: `Desafío en clase`,
        user
    }

    res.render(`index`, testUser)
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`Todo mal`)
})

const PORT = 8070

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
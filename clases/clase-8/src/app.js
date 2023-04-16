const express = require(`express`)
const cookieParser = require(`cookie-parser`)

const usersRouter = require(`./routes/user.router`)
const productsRouter = require(`./routes/product.router`)
const { uploader } = require("./multer")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/static`, express.static(__dirname + `/public`))

// Middleware de terceros
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(`Mid app - time: `, Date.now());
    next()
})

app.use(`/api/usuarios`, usersRouter)
app.use(`/api/productos`, productsRouter)

app.post(`/single`, uploader.single(`myfile`), (req, res) => {
    res.status(200).send({
        status: `Success`,
        message: `El archivo se subió correctamente`
    })
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`Todo mal¡`)
})

const PORT = 8070

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
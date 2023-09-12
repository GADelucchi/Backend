const express = require(`express`)
const viewsRouter = require(`./routes/views.router`)

const handlebars = require(`express-handlebars`)

const app = express()

app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/static`, express.static(__dirname + `/public`))

app.use((req, res, next) => {
    console.log(`Mid app - time: `, Date.now());
    next()
})

app.use(`/`, viewsRouter)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`Todo mal`)
})

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
// Imports externos –––––––––––––––––––––––––––––––––––––––
const express = require(`express`)
const logger = require(`morgan`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––
const routerServer = require(`./routes/index.router`)
const { connectDB } = require(`./config/serverConfig`)

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––
const app = express()

// Ejecución ––––––––––––––––––––––––––––––––––––––––––––––
connectDB()

// Configuración ––––––––––––––––––––––––––––––––––––––––––
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger(`dev`))

//Rutas –––––––––––––––––––––––––––––––––––––––––––––––––––
app.use(`/static`, express.static(__dirname + `/public`))
app.use(routerServer)

// Configuración puerto –––––––––––––––––––––––––––––––––––
const PORT = 8080
app.listen(PORT, (error) => {
    if (error) console.log(`Error en el servidor`, error)
    console.log(`Escuchando en el puerto: ${PORT}`);
})
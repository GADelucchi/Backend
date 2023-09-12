// Imports externos
const express = require(`express`)
const handlebars = require(`express-handlebars`)
const { Server: ServerHTTP } = require('http')
const { Server: ServerIO } = require(`socket.io`)
const { socketProduct } = require(`./utils/socketProduct`)
const morgan = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const passport = require("passport")
const cors = require('cors')
const routerServer = require(`./routes/index.router`)
const { initPassport } = require("./passport-jwt/passport.config")
const { errorHandler } = require("./middlewares/error.middleware")
const { logger, addLogger } = require('./config/logger')
const { port } = require('../process/config')
const { socketMessage } = require('./utils/socketMessage')

// Instancia
const app = express()
const serverHttp = new ServerHTTP(app)
const io = new ServerIO(serverHttp)

// Configuración
app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(`dev`))

// Middleware de terceros
app.use(`/static`, express.static(__dirname + `/public`))
app.use(cookieParser(`P@l@braS3cre3t0`))
app.use(addLogger)

initPassport()
passport.use(passport.initialize())

socketProduct(io)

//Rutas


app.use(routerServer)

app.use(errorHandler)

socketMessage(io)

// exports.initServer = () => serverHttp.listen(port, (error) => {
//     if (error) logger.error(`Error en el servidor`, error)
//     logger.info(`Escuchando en el puerto: ${port}`);
// })

serverHttp.listen(port, (error) => {
    if (error) logger.error(`Error en el servidor`, error)
    logger.info(`Escuchando en el puerto: ${port}`);
})
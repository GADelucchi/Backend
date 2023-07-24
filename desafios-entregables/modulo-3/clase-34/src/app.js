// Imports externos
const express = require(`express`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)
const { socketProduct } = require(`./utils/socketProduct`)
const morgan = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const passport = require("passport")
const cors = require('cors')

// Imports rutas
const routerServer = require(`./routes/index.router`)
const { initPassport } = require("./passport-jwt/passport.config")
const { errorHandler } = require("./middlewares/error.middleware")
const { logger } = require('./config/logger')
const { port } = require("../process/config")

// Instancia
const app = express()

// Ejecución
// console.log(config)

// Configuración
app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(`dev`))

// Middleware de terceros
app.use(cookieParser(`P@l@braS3cre3t0`))

initPassport()
passport.use(passport.initialize())

// Configuración puerto
const httpServer = app.listen(port, (error) => {
    if (error) logger.error(`Error en el servidor`, error)
    logger.info(`Escuchando en el puerto: ${port}`);
})

// Instancia de Websocket
const io = new Server(httpServer)
socketProduct(io)

io.on(`connection`, socket => {
    logger.info(`Nuevo cliente conectado`);

    socket.on(`message`, async (data) => {
        try {
            const messageManagerMongo = new MessageManagerMongo
            await messageManagerMongo.addMessage(data)
            let allMessages = await messageManagerMongo.getMessages()
            io.emit(`messageLogs`, allMessages)
        } catch (error) {
            logger.error(error);
        }
    })

    socket.on(`authenticated`, data => {
        socket.broadcast.emit(`newUserConnected`, data)
    })
})

//Rutas

app.use(`/static`, express.static(__dirname + `/public`))

app.use(routerServer)

app.use(errorHandler)
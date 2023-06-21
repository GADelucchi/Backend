// Imports externos –––––––––––––––––––––––––––––––––––––––
const express = require(`express`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)
const { socketProduct } = require(`./utils/socketProduct`)
const logger = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const { create } = require(`connect-mongo`)
const passport = require("passport")
const cors = require('cors')


// Imports rutas ––––––––––––––––––––––––––––––––––––––––––
const routerServer = require(`./routes/index.router`)
const { connectDB } = require(`./config/serverConfig`)
const MessageManagerMongo = require(`./dao/mongo/message.mongo`)
const { initPassport } = require("./passport-jwt/passport.config")
const config = require('../process/config')

// Instancia ––––––––––––––––––––––––––––––––––––––––––––––
const app = express()
const messageManagerMongo = new MessageManagerMongo

// Ejecución ––––––––––––––––––––––––––––––––––––––––––––––
console.log(config);
connectDB()
console.log(process.env);

// Configuración ––––––––––––––––––––––––––––––––––––––––––
app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(logger(`dev`))

// Middleware de terceros ––––––––––––––––––––––––––––––––-
app.use(cookieParser(`P@l@braS3cre3t0`))

initPassport()
passport.use(passport.initialize())

// Configuración puerto –––––––––––––––––––––––––––––––––––
const httpServer = app.listen(process.env.PORT, (error) => {
    if (error) console.log(`Error en el servidor`, error)
    console.log(`Escuchando en el puerto: ${process.env.PORT}`);
})

// Instancia de Websocket –––––––––––––––––––––––––––––––––
const io = new Server(httpServer)
socketProduct(io)

io.on(`connection`, socket => {
    console.log(`Nuevo cliente conectado`);

    socket.on(`message`, async (data) => {
        try {
            await messageManagerMongo.addMessage(data)
            let allMessages = await messageManagerMongo.getMessages()
            io.emit(`messageLogs`, allMessages)
        } catch (error) {
            console.log(error);
        }
    })

    socket.on(`authenticated`, data => {
        socket.broadcast.emit(`newUserConnected`, data)
    })
})

//Rutas –––––––––––––––––––––––––––––––––––––––––––––––––––
app.use(`/static`, express.static(__dirname + `/public`))

app.use(routerServer)

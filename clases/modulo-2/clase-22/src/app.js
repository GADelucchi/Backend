// Imports externos –––––––––––––––––––––––––––––––––––––––
const express = require(`express`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)
const { socketProduct } = require(`./utils/socketProduct`)
const logger = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const session = require(`express-session`)
const FileStore = require(`session-file-store`)
const { create } = require(`connect-mongo`)
const passport = require("passport")


// Imports rutas ––––––––––––––––––––––––––––––––––––––––––
const routerServer = require(`./routes/index.router`)
const { connectDB } = require(`./config/serverConfig`)
const MessageManagerMongo = require(`./dao/mongo/message.mongo`)
const { initPassport } = require("./passport-jwt/passport.config")
// const { initPassport, initPassportGithub } = require("./config/passport.config")


// Instancia ––––––––––––––––––––––––––––––––––––––––––––––
const app = express()
const messageManagerMongo = new MessageManagerMongo

// Ejecución ––––––––––––––––––––––––––––––––––––––––––––––
connectDB()

// Configuración ––––––––––––––––––––––––––––––––––––––––––
app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger(`dev`))

// Middleware de terceros ––––––––––––––––––––––––––––––––-
// app.use(session({
//     secret: `secretCoder`,
//     resave: true,
//     saveUninitialized: true
// }))
app.use(cookieParser(`P@l@braS3cre3t0`))

// const fileStore = FileStore(session)

// app.use(session({
//     store: new fileStore({
//         ttl: 100000000,
//         path: `./session`,
//         retries: 0
//     }),
//     secret: `secretCoder`,
//     resave: true,
//     saveUninitialized: true
// }))

// app.use(session({
//     store: create({
//         ttl: 10000000,
//         mongoUrl: `mongodb+srv://GADelucchi:jxDkAb8tanYj2L1x@cluster0.nxdvhds.mongodb.net/ecommerce`,
//         mongoOptions: {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     }),
//     secret: `secretCoder`,
//     resave: false,
//     saveUninitialized: false
// }))

initPassport()
// initPassportGithub()
passport.use(passport.initialize())
// passport.use(passport.session())

// Configuración puerto –––––––––––––––––––––––––––––––––––
const PORT = 8080
const httpServer = app.listen(PORT, (error) => {
    if (error) console.log(`Error en el servidor`, error)
    console.log(`Escuchando en el puerto: ${PORT}`);
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

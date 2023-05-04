// Imports externos –––––––––––––––––––––––––––––––––––––––
const express = require(`express`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)
const { socketProduct } = require(`./utils/socketProduct`)
const logger = require(`morgan`)


// Imports rutas ––––––––––––––––––––––––––––––––––––––––––
const routerServer = require(`./routes/index.router`)
const { connectDB } = require(`./config/serverConfig`)
const MessageManagerMongo = require (`./dao/mongo/message.mongo`)

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

    socket.on(`message`, data => {
        messageManagerMongo.addMessage(data)
        io.emit(`messageLogs`, messages)
    })

    socket.on(`authenticated`, data => {
        socket.broadcast.emit(`newUserConnected`, data)
    })
})

//Rutas –––––––––––––––––––––––––––––––––––––––––––––––––––
app.use(`/static`, express.static(__dirname + `/public`))

app.use(routerServer)

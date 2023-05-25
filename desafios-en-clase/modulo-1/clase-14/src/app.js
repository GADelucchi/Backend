// Imports externos –––––––––––––––––––––––––––––––––––––––––––––
const express = require(`express`)
const { Server } = require(`socket.io`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––––––
const viewsRouter = require(`./routes/views.router`)
const handlebars = require(`express-handlebars`)
const objectConfig = require(`./config/objectConfig`)
const usersRouter = require(`./routes/user.router`)

const app = express()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
const io = new Server(httpServer)

objectConfig.connectDB()

let messages = []
io.on(`connection`, socket => {
    console.log(`Nuevo cliente conectado`);

    socket.on(`message`, data => {
        // console.log(data);
        messages.push(data)
        io.emit(`messageLogs`, messages)
    })

    socket.on(`authenticated`, data => {
        socket.broadcast.emit(`newUserConnected`, data)
    })
})

// Handlebars –––––––––––––––––––––––––––––––––––––––––––––––––––
app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.use(`/`, viewsRouter)
app.use(`/static`, express.static(__dirname + `/public`))
app.use(`/api/users`, usersRouter)

// Error ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`Todo mal`)
})
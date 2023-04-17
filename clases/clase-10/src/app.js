const express = require(`express`)
const viewsRouter = require(`./routes/views.router`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)

const app = express()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
const socketServer = new Server(httpServer)

socketServer.on(`connection`, socket => {
    console.log(`Nuevo cliente conectado`);

    socket.on(`message`, data => {
        console.log(data);
    })

    socket.emit(`evento-para-socket-individual`, `Este mensaje lo va a recibir el socket del cliente`)

    socket.broadcast.emit(`evento-para-todos-menos-el-socket-actual`, `Evento que verán todos los sockets menos el actual`)

    socketServer.emit(`evento-para-todos`, `Este mensaje lo reciben todos los socket conetados`)
})



app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/static`, express.static(__dirname + `/public`))

app.use(`/`, viewsRouter)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`Todo mal`)
})
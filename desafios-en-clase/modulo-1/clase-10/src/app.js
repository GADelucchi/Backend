const express = require(`express`)
const viewsRouter = require(`./routes/views.router`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)

const app = express()

const PORT = 8070
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
const io = new Server(httpServer)

io.on(`connection`, socket => {
    console.log(`Nuevo cliente conectado`);

    let logs = []
    socket.on(`message1`, data => {
        io.emit(`log`, data)
    })

    socket.on(`message2`, data => {
        logs.push({
            socketid: socket.id,
            message: data
        })

        io.emit(`log`, { logs })
    })
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
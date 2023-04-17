// Imports externos –----------------------------------------
const express = require(`express`)
const handlebars = require(`express-handlebars`)
const { Server } = require(`socket.io`)
const { socketProduct } = require(`./utils/socketProduct`)


// Imports rutas –-------------------------------------------
const productsRouter = require(`./routes/products.router`)
const cartsRouter = require(`./routes/carts.router`)
const viewsRouter = require(`./routes/views.router`)

// Servidor –------------------------------------------------
const app = express()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
})

// Instancia de Websocket –----------------------------------
const io = new Server(httpServer)
socketProduct(io)

// App –-----------------------------------------------------
app.engine(`handlebars`, handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `handlebars`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas –---------------------------------------------------
app.use(`/static`, express.static(__dirname + `/public`))

app.use(`/`, viewsRouter)

app.use(`/api/products`, productsRouter)
app.use(`/api/carts`, cartsRouter)


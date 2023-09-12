const express = require(`express`)

const app = express()
const productsRouter = require(`./routes/products.router`)
const cartsRouter = require(`./routes/carts.router`)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(`/api/products`, productsRouter)
app.use(`/api/carts`, cartsRouter)


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
})
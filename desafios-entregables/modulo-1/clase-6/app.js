const express = require(`express`)
const ProductManager = require(`./ProductManager`)

const app = express()
const product = new ProductManager(`./products.json`)

app.use(express.urlencoded({ extended: true }))

app.get(`/`, (req, res) => {
    res.status(200).send(`<h1>Bienvenido al server</h1>`)
})

app.get(`/productos`, async (req, res) => {
    try {
        const { limit } = req.query
        const products = await product.getProducts()
        if (!limit) {
            return res.status(200).send({products})
        }
        return res.status(200).send({products: products.slice(0, limit)})
    } catch (error) {
        res.status(500).send(`500 Internal server error`);
    }
})

app.get(`/productos/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const productDb = await product.getProductById(parseInt(pid))
        if (productDb) {
            return res.status(200).send({productDb})
        } else {
            return res.status(404).send(`Not found`)
        }
    } catch (error) {
            console.log(error);
    }
})

app.listen(8000, () => {
    console.log(`Escuchando el puerto 8000`);
})
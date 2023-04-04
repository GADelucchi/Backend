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
            return res.send({
                status: 'success',
                products
            })
        }
        return res.send({
            status: 'success',
            products: products.slice(0, limit)
        })
        res.send(products)
    } catch (error) {
        console.log(error);
    }
})

app.get(`/productos/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const productDb = await product.getProductById(parseInt(pid))
        res.send({productDb})
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000, () => {
    console.log(`Escuchando el puerto 8000`);
})
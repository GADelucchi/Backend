const fs = require(`fs`)

class ProductManagerFile {
    constructor() {
        this.products = []
        this.path = `./products.json`
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            if (!product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock) return console.log(`Error: Todos los campos son obligatorios`);


            if (fs.existsSync(this.path)) {
                let content = await fs.promises.readFile(this.path, `utf-8`)
                content ? this.products = JSON.parse(content) : null
            }

            let findCode = this.products.find(prod => prod.code === product.code)
            if (findCode) return console.log(`Error: No se permiten códigos repetidos`);

            this.products.push({ id: this.products.length + 1, ...product })
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), `utf-8`)

            return console.log(`Producto cargado correctamente`);
        }
        catch (error) {
            return console.log(error)
        }
    }

    getProducts = async () => {
        try {
            const content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            return this.products
        }
        catch (error) {
            return []
        }
    }

    getProductById = async (pid) => {
        try {
            const content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            let findId = this.products.find(prod => prod.id === pid)
            if (!findId) return console.log('Not found')
            return findId
        }
        catch (error) {
            return console.log(error);
        }
    }

    updateProducts = async (id, updatedProduct) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            let productAsked = this.products.find(prod => prod.id === id)

            if (!productAsked) return console.log(`Error: Producto no encontrado`);
            productAsked.title = updatedProduct.title || productAsked.title
            productAsked.description = updatedProduct.description || productAsked.description
            productAsked.price = updatedProduct.price || productAsked.price
            productAsked.thumbnail = updatedProduct.thumbnail || productAsked.thumbnail
            productAsked.stock = updatedProduct.stock || productAsked.stock
            productAsked.code = updatedProduct.code || productAsked.code
            productAsked.id = productAsked.id

            this.products[this.products.indexOf(productAsked)] = productAsked
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), `utf-8`)
            return console.log(`Producto modificado exitosamente`);

        } catch (error) {
            return console.log(error);
        }
    }

    deleteProducts = async (idDelete) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            const removeProduct = this.products.filter(prod => prod.id !== idDelete)
            if (!removeProduct) return console.log(`Error: ID no encontrado`)
            console.log(removeProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(removeProduct, null, 2), `utf-8`)
            return console.log(`Producto eliminado exitosamente`)
        }
        catch (error) {
            return console.log(error)
        }
    }
}


module.exports = ProductManagerFile
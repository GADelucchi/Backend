const fs = require(`fs`)
const { error } = require(`console`);

class ProductsManager {
    constructor() {
        this.path = `./data/products.json`
    }

    validateProduct = async (newProduct) => {
        if (!newProduct.title ||
            !newProduct.description ||
            !newProduct.code ||
            !newProduct.price ||
            !newProduct.stock ||
            !newProduct.category) return console.log(`Error: Todos los campos son obligatorios`)
    }

    addProduct = async (newProduct) => {
        try {
            this.validateProduct(newProduct)
            let parsedProducts

            if (fs.existsSync(this.path)) {
                let content = await fs.promises.readFile(this.path, `utf-8`)
                parsedProducts = JSON.parse(content)
            }

            let findCode = parsedProducts.find(prod => prod.code === newProduct.code)
            if (findCode) return console.log(`Error: No se permiten códigos repetidos`)

            if (parsedProducts.length === 0) {
                newProduct.id = 1
            } else {
                newProduct.id = parsedProducts[parsedProducts.length - 1].id + 1
            }
            parsedProducts.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts, null, 2), `utf-8`)
            return console.log(`Producto agregado correctamente`)
        } catch (error) {
            console.log({
                message: `Error: Algo salió mal`,
                error: error
            })
        }
    }

    getProducts = async () => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedProducts = JSON.parse(content)
            return parsedProducts
        } catch (error) {
            ({
                message: `Error: No existe el archivo en la ubicación especificada`,
                error: error
            });
        }
    }

    getProductById = async (pid) => {
        try {
            let parsedProducts = await this.getProducts()

            let findId = parsedProducts.find(prod => prod.id === pid)

            if (!findId) {
                throw new Error(`Error: No existe ningún producto con ese ID`)
            }
            return findId
        } catch (error) {
            throw new Error({
                message: `Error: No existe ningún producto con ese ID`,
                error: error
            })
        }
    }

    updateProduct = async (pid, updatedProduct) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            let productAsked = this.products.find(prod => prod.id === pid)

            if (!productAsked) return `Error: Producto no encontrada`;
            productAsked.title = updatedProduct.title || productAsked.title
            productAsked.description = updatedProduct.description || productAsked.description
            productAsked.code = updatedProduct.code || productAsked.code
            productAsked.price = updatedProduct.price || productAsked.price
            productAsked.stock = updatedProduct.stock || productAsked.stock
            productAsked.category = updatedProduct.category || productAsked.category
            productAsked.status = updatedProduct.status || productAsked.status
            productAsked.thumbnail = updatedProduct.thumbnail || productAsked.thumbnail
            productAsked.id = productAsked.id

            this.products[this.products.indexOf(productAsked)] = productAsked
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), `utf-8`)
            return console.log(`Producto modificada exitosamente`);

        } catch (error) {
            return console.log(error);
        }
    }

    deleteProduct = async (idDelete) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            const removeProduct = this.products.filter(prod => prod.id !== idDelete)
            if (!removeProduct) return `Error: ID no encontrado`
            await fs.promises.writeFile(this.path, JSON.stringify(removeProduct, null, 2), `utf-8`)
            return console.log(`Producto eliminado exitosamente`)
        }
        catch (error) {
            return console.log(error)
        }
    }
}


module.exports = ProductsManager

// const productManager = new ProductsManager()

// productManager.addProduct({
//     title: `Producto 9`,
//     description: `Descripción producto 9`,
//     code: `Prod9`,
//     price: 200,
//     stock: 3,
//     category: `Productos`,
//     status: true,
//     thumbnail: `Sin imagen`
// })

// productManager.getProducts()

// productManager.getProductById()

// prod = {
//     title: undefined,
//     description: `Descripción modificada`,
//     code: undefined,
//     price: 300,
//     stock: undefined,
//     category: undefined,
//     status: true,
//     thumbnail: [`String1`, `String 2`]
// }
// productManager.updateProduct(2, prod)

// productManager.deleteProduct(3)
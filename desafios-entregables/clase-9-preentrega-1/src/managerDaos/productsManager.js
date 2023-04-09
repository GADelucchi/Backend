const fs = require(`fs`)

class ProductsManager {
    constructor() {
        this.path = `./data/products.json`
    }

    addProduct = async (title, description, code, price, stock, category, status, thumbnail) => {
        try {
            const product = {
                title,
                description,
                code,
                price,
                stock,
                category,
                status,
                thumbnail,
            }

            if (!product.title ||
                !product.description ||
                !product.code ||
                !product.price ||
                !product.stock ||
                !product.category) return console.log(`Error: Todos los campos son obligatorios`);

            if (fs.existsSync(this.path)) {
                let content = await fs.promises.readFile(this.path, `utf-8`)
                let parsedProducts = JSON.parse(content)
            }

            let findCode = parsedProducts.find(prod => prod.code === product.code)
            if (findCode) return console.log(`Error: No se permiten códigos reproductidos`);

            if (parsedProducts.length === 0) {
                product.id = 1
            } else {
                product.id = parsedProducts[parsedProducts.length - 1].id + 1
            }
            parsedProducts.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts, null, 2), `utf-8`)
            return console.log(`Producto agregado correctamente`);
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async () => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedProducts = JSON.parse(content)
            return parsedProducts
        } catch (error) {
            console.log({
                message: `Error: No existe el archivo en la ubicación especificada`,
                error: error
            });
        }
    }

    getProductById = async (pid) => {
        try {
            let parsedProducts = await this.getProducts()

            let findId = parsedProducts.find(prod => prod.id === pid)
            findId ? findId : `Error: No existe ningún producto con ese ID`
        } catch (error) {
            console.log({
                message: `Error: No existe ningún producto con ese ID`,
                error: error
            });
        }
    }

    updateProduct = async (pid, updatedProduct) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            let productAsked = this.products.find(prod => prod.id === pid)

            if (!productAsked) return console.log(`Error: Producto no encontrada`);
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
            if (!removeProduct) return console.log(`Error: ID no encontrado`)
            await fs.promises.writeFile(this.path, JSON.stringify(removeProduct, null, 2), `utf-8`)
            return console.log(`Producto eliminado exitosamente`)
        }
        catch (error) {
            return console.log(error)
        }
    }
}


module.exports = ProductsManager

const productManager = new ProductsManager

// productManager.addProduct(
//     `Producto 5`,
//     `Descripción producto 5`,
//     `Prod5`,
//     200,
//     3,
//     `Productos`
// )

// productManager.getProducts()

productManager.getProductById(23)

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
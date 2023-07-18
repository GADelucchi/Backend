const fs = require(`fs`)

class UserDaoFile {
    constructor() {
        this.path = `./data/users.json`
    }

    addProduct = async (product) => {
        try {
            if (!product.title ||
                !product.description ||
                !product.code ||
                !product.price ||
                !product.stock ||
                !product.category ||
                !product.status) return `Todos los campos son obligatorios`

            let parsedProducts

            if (fs.existsSync(this.path)) {
                let content = await fs.promises.readFile(this.path, `utf-8`)
                parsedProducts = JSON.parse(content)
            }

            let findCode = parsedProducts.find(prod => prod.code === product.code)
            if (findCode) return `No se permiten códigos repetidos`

            if (parsedProducts.length === 0) {
                product.id = 1
            } else {
                product.id = parsedProducts[parsedProducts.length - 1].id + 1
            }
            parsedProducts.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts, null, 2), `utf-8`)
            return `Producto agregado correctamente`
        } catch (error) {
            {
                message: `Error: Algo salió mal`;
                error: error
            }
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
                throw new Error(`No existe ningún producto con ese ID`)
            }
            return findId
        } catch (error) {
            return undefined
        }
    }

    updateProduct = async (pid, updatedProduct) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedProducts = JSON.parse(content)
            let productAsked = parsedProducts.find(prod => prod.id === pid)

            if (!productAsked) return `Error: Producto no encontrado`;
            productAsked.title = updatedProduct.title || productAsked.title
            productAsked.description = updatedProduct.description || productAsked.description
            productAsked.code = updatedProduct.code || productAsked.code
            productAsked.price = updatedProduct.price || productAsked.price
            productAsked.stock = updatedProduct.stock || productAsked.stock
            productAsked.category = updatedProduct.category || productAsked.category
            productAsked.status = updatedProduct.status || productAsked.status
            productAsked.thumbnail = updatedProduct.thumbnail || productAsked.thumbnail
            productAsked.id = productAsked.id

            parsedProducts[parsedProducts.indexOf(productAsked)] = productAsked
            await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts, null, 2), `utf-8`)
            return `Producto modificado exitosamente`
        } catch (error) {
            return console.log(error);
        }
    }

    deleteProduct = async (idDelete) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedProducts = JSON.parse(content)
            const removeProduct = parsedProducts.filter(prod => prod.id !== idDelete)
            console.log(removeProduct);

            if (!removeProduct) return `Error: ID no encontrado`
            await fs.promises.writeFile(this.path, JSON.stringify(removeProduct, null, 2), `utf-8`)
            return `Producto eliminado exitosamente`
        }
        catch (error) {
            return error
        }
    }
}


module.exports = UserDaoFile
const fs = require(`fs`)


// Creamos la clase
class ProductManager {
    // Definimos su constructor
    constructor() {
        this.products = []
        this.path = `./products.json`
    }

    // Definimos los métodos
    // Método para agregar productos y validar los campos
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            // Datos del producto
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            // Validaciones
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

    // Método para mostrar los productos
    getProducts = async () => {
        try {
            await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            return console.log(this.products)
        }
        catch (error) {
            return console.log(`Error: archivo vacío`)
        }
    }

    // Método para buscar un producto por ID
    getProductById = async (id) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.products = JSON.parse(content)
            let findId = this.products.find(prod => prod.id === id)
            if (!findId) return 'Not found'
            return console.log(findId)
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
            if (!removeProduct) return `Error: ID no encontrado`
            console.log(removeProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(removeProduct, null, 2), `utf-8`)
            return `Producto eliminado exitosamente`
        }
        catch (error) {
            return console.log(error)
        }
    }
}

// Instancia de la clase
const producto = new ProductManager()

// Prueba del método getProducts
producto.getProducts();

// // Prueba del método addProduct y revisión de correcto agregado al array
// producto.addProduct(
//     `Producto prueba`,
//     `Este es un producto prueba`,
//     200,
//     `Sin imagen`,
//     `abc123`,
//     25
// );

// // Prueba del ID autoincrementable
// producto.addProduct(
//     `Producto prueba 2`,
//     `Este es el segundo producto prueba`,
//     100,
//     `Sin imagen`,
//     `bjd84`,
//     1
// );

// producto.getProducts();

// // Prueba de validación de propiedades (no stock)
// producto.addProduct({
//     title: 'Producto prueba 3',
//     description: 'Este es el tercer producto prueba',
//     price: 50,
//     thumbnail: 'Sin imagen',
//     code: 'abc333'
// });
// producto.getProducts();

// // Prueba de validación de código repetido
// producto.addProduct({
//     title: 'Producto prueba 4',
//     description: 'Este es el cuarto producto prueba',
//     price: 1000,
//     thumbnail: 'Sin imagen',
//     code: 'abc123',
//     stock: 3
// });
// producto.getProducts();

// // Prueba del método getProductById
// producto.getProductById(1)

// // Forzamos la prueba del método getProductById
// console.log(producto.getProductById(5))

// // Modificación de producto
// producto.updateProducts(1, {
//     title: `Producto modificado`,
//     description: `Esta es la descripción del producto modificado`
// })

// // Eliminar producto del archivo
// producto.deleteProducts(1)
const { promises } = require('fs')
const fs = promises


// Creamos la clase
class ProductManager {
    // Definimos su constructor
    constructor() {
        this.products = []
        this.path = './products.json'
    }

    // Definimos los métodos
    // Método para agregar productos y validar los campos
    addProduct = async (product) => {
        try {
            // Validaciones
            if (!product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock) return console.log(`Error: Todos los campos son obligatorios`);

            let findCode = this.products.find(prod => prod.code === product.code)
            if (findCode) return console.log(`Error: No se permiten códigos repetidos`);

            this.products.push({ id: this.products.length + 1, ...product })
            await fs.writeFile(this.path, JSON.stringify(this.products, 'utf-8', '\t'))

            return console.log(`Producto cargado correctamente`);
        }
        catch (error) {
            return console.log(error)
        }

    }

    // Método para mostrar los productos
    getProducts = async () => {
        try {
            let content = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(content)
            return console.log(this.products)
        }
        catch (error) {
            return console.log(error)
        }
    }

    // Método para buscar un producto por ID
    getProductById = async (id) => {
        let findId = this.products.find(product => product.id === id)
        if (!findId) return 'Not found'
        return findId
    }

    updateProducts = async (id, updateProduct) => {
        try {
            let product = this.products.find(product => product.id === id)
            if (!product) return console.log(`Error: Producto no encontrado`);
            product.title = updateProduct.title
            product.description = updateProduct.description
            product.price = updateProduct.price
            product.thumbnail = updateProduct.thumbnail
            product.stock = updateProduct.stock
            product.code = updateProduct.code

            this.products.push(updateProduct)
            await fs.writeFile(this.path, JSON.stringify(this.products, 'utf-8', '\t'))
            return console.log(`Producto modificado exitosamente`);

        } catch (error) {
            return console.log(error);
        }
    }

    deleteProducts = async (idDelete) => {
        try {
            const remove = this.product.filter(prod => prod.id !== idDelete)
            if (!remove) return `Error: ID no encontrado`
            console.log(remove)
            await fs.writeFile(this.path, JSON.stringify(remove, 'utf-8', '\t'))
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

// // // Prueba del método addProduct y revisión de correcto agregado al array
// producto.addProduct({
//     title: 'Producto prueba',
//     description: 'Este es un producto prueba',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     code: 'abc123',
//     stock: 25
// });
// producto.getProducts();

// // Prueba del ID autoincrementable
// producto.addProduct({
//     title: 'Producto prueba 2',
//     description: 'Este es el segundo producto prueba',
//     price: 100,
//     thumbnail: 'Sin imagen',
//     code: 'bjd84',
//     stock: 1
// });
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

// Prueba del método getProductById
// console.log(producto.getProductById(2))

// // Forzamos la prueba del método getProductById
// console.log(producto.getProductById(5))

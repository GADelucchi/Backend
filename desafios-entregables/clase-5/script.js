const fs = require('fs')


// Creamos la clase
class ProductManager {
    // Definimos su constructor
    constructor() {
        this.products = []
        this.path = './products.json'
    }

    // Definimos los métodos
    // Método para agregar productos y validar los campos
    addProduct(title, description, price, thumbnail, code, stock) {
        // Datos del producto
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.products.length + 1
        }

        // Validaciones
        if (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock) return `Todos los campos son obligatorios`;

        let findCode = this.products.find(prod => prod.code === product.code)
        if (findCode) return `No se permiten códigos repetidos`;

        return fs.writeFileSync(this.path, this.products.push(product))
    }

    // Método para mostrar los productos
    getProducts() {
        let content = fs.readFileSync(this.path, utf - 8)
        const parseContent = JSON.parse(content)
        return parseContent
    }

    // Método para buscar un producto por ID
    getProductById(id) {
        let findId = this.products.find(product => product.id === id)
        if (!findId) return 'Not found'
        return findId
    }

    updateProducts() {

    }

    deleteProducts() {

    }
}

// Instancia de la clase
const producto = new ProductManager()

// // Prueba del método getProducts
// console.log(producto.getProducts());

// // Prueba del método addProduct y revisión de correcto agregado al array
producto.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
// console.log(producto.getProducts());

// // Prueba del ID autoincrementable
// producto.addProduct('Producto prueba 2', 'Este es el segundo producto prueba', 100, 'Sin imagen', 'bjd84', 1);
// console.log(producto.getProducts());

// // Prueba de validación de propiedades (no stock)
// console.log(producto.addProduct('Producto prueba 3', 'Este es el tercer producto prueba', 50, 'Sin imagen', 'abc333'));
// console.log(producto.getProducts());

// // Prueba de validación de código repetido
// console.log(producto.addProduct('Producto prueba 4', 'Este es el cuarto producto prueba', 1000, 'Sin imagen', 'abc123', 3));
// console.log(producto.getProducts());

// // Prueba del método getProductById
// console.log(producto.getProductById(2))

// // Forzamos la prueba del método getProductById
// console.log(producto.getProductById(5))

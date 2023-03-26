// Creamos la clase
class ProductManager {
    // Definimos su constructor
    constructor() {
        this.products = []
    }

    // Definimos los métodos
    // Método para agregar productos y validar los campos
    addProduct(title, description, price, thumbnail, code, stock){
        // Datos del producto
        const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.products.length +1
        }

        // Validaciones
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ) {
            console.log(`Todos los campos son obligatorios`);
        } else if (
            this.products.some((stock) =>  stock.code === product.code)
        ) {
            console.log(`No se permiten códigos repetidos`);
        } else {
            this.products.push(product)
            console.log(`Producto agregado correctamente`);
        }
    }

    // Método para mostrar los productos
    getProducts(){
        return this.products
    }
    // Método para buscar un producto por ID
    getProductById(productId){
        let findId = this.products.find(stock => stock.code === productId)
        if(findId){
            console.log(findId);
        } else {
            console.log(`Not found`);
        }
    }
}

// Instancia de la clase
const producto = new ProductManager()
// Prueba del método getProducts
producto.getProducts();
// Prueba del método addProduct y revisión de correcto agregado al array
producto.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(producto.getProducts());
// Prueba del ID autoincrementable
producto.addProduct('Producto prueba 2', 'Este es el segundo producto prueba', 100, 'Sin imagen', 'abc223', 1);
console.log(producto.getProducts());
// Prueba de validación de propiedades
producto.addProduct('Producto prueba 3', 'Este es el tercer producto prueba', 50, 'Sin imagen', 'abc333');
console.log(producto.getProducts());
// Prueba de validación de código repetido
producto.addProduct('Producto prueba 4', 'Este es el cuarto producto prueba', 1000, 'Sin imagen', 'abc123', 3);
console.log(producto.getProducts());
// Prueba del método getProductById
producto.getProductById('abc223')
// Forzamos la prueba del método getProductById
producto.getProductById('abc1123')

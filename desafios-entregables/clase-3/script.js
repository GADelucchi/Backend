// Creamos la clase
class ProductManager {
    // Definimos su constructor
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = 1
    }
    // // Definimos las variables estáticas
    static products = []
    // Definimos los métodos
    // Método para agregar productos
    addProduct(title, description, price, thumbnail, code, stock){
        ProductManager.products.push(new ProductManager(title, description, price, thumbnail, code, stock,))
        this.id++
    }
    // Método para mostrar los productos
    getProducts(){
        return ProductManager.products
    }
    // Método para buscar un producto por ID
    getProductById(productId){
        if(ProductManager.products.some(product => product.code === productId)){
            console.log(`Producto con código ${productId}`);
        } else {
            console.log(`Not found`);
        }
    }
}

// Instancia de la clase
const producto = new ProductManager()
// Prueba del método getProducts
console.log(producto.getProducts());
// Prueba del método addProduct y revisión de correcto agregado al array
producto.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(producto.getProducts());
// Prueba del ID autoincrementable
producto.addProduct('Producto prueba 2', 'Este es el segundo producto prueba', 100, 'Sin imagen', 'abc223', 1);
console.log(producto.getProducts());
// Prueba del método getProductById
producto.getProductById('abc123')
// Forzamos la prueba del método getProductById
producto.getProductById('abc1123')

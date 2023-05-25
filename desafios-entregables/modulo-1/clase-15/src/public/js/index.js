let div = document.getElementById(`product`)
products.forEach((product) => {
    products += `<div>
        <h2>Producto: ${product.title}</h2>
        <br>
        <p>Descripción: ${product.description}</p>
        <p>Código: ${product.code}</p>
        <p>Precio: ${product.price}</p>
        <p>Cantidad en stock: ${product.stock}</p>
        <p>Categoría: ${product.category}</p>
        <p>Imágenes: ${product.thumbnail}</p>
        </div>`
})
div.innerHTML = products
const socket = io()

socket.on(`productos`, data => {
    let div = document.getElementById(`productsCards`)
    let productos = ``
    data.forEach((product) => {
        productos += `<div>
        <h2>Producto: ${product.title}</h2>
        <br>
        <p>Descripción: ${product.description}</p>
        <p>Código: ${product.code}</p>
        <p>Precio: ${product.price}</p>
        <p>Cantidad en stock: ${product.stock}</p>
        <p>Categoría: ${product.category}</p>
        </div>`
    })
    div.innerHTML = productos
})
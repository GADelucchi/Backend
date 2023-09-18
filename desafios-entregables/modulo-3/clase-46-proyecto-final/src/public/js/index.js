console.log('Este es el index')

let botonAgregarACarrito
let botonVerMas
let cartId
let productId
let response

function inicializarElemento() {
    botonAgregarACarrito = document.querySelectorAll('#agregarAlCarrito').forEach((button) => {
        button.addEventListener('click', clickAgregar);
    })
    botonVerMas = document.querySelectorAll('#verMas').forEach((button) => {
        button.addEventListener('click', clickVerMas);
    })
}

async function clickAgregar() {
    botonAgregarACarrito = event.target
    cartId = botonAgregarACarrito.getAttribute('data-cart-id');
    productId = botonAgregarACarrito.getAttribute('data-product-id')

    response = await fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => console.log(res.url))

    Toastify({
        text: "Producto agregado",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
    }).showToast()
}

async function verMas() {
    botonVerMas = event.target
    productId = botonAgregarACarrito.getAttribute('data-product-id')
}

inicializarElemento()
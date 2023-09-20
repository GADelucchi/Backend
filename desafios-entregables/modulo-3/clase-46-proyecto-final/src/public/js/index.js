console.log('Este es el index')

let botonAgregarACarrito
let botonVerMas
let botonPagar
let cartId
let productId
let response

function inicializarElemento() {
    botonAgregarACarrito = document.querySelectorAll('#agregarAlCarrito').forEach((button) => {
        button.addEventListener('click', clickAgregar);
    })

    botonPagar = document.querySelector('#botonPagar')
    botonPagar.addEventListener('click', clickPagar);

    // botonVerMas = document.querySelectorAll('#verMas').forEach((button) => {
    //     button.addEventListener('click', clickVerMas);
    // })
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

async function clickPagar() {
    botonPagar = event.target
    cartId = botonPagar.getAttribute('data-cart-id')

    response = await fetch(`http://localhost:8080/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => console.log(res))

    Toastify({
        text: "Pagado!",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
    }).showToast()
}

// async function verMas() {
//     botonVerMas = event.target
//     productId = botonAgregarACarrito.getAttribute('data-product-id')

//     response = await fetch(`http://localhost:8080/api/products/${productId}`)
//     .then((res) => console.log(res.url))
// }

inicializarElemento()
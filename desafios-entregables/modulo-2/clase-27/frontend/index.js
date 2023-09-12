console.log('index.js')

fetch('http://localhost:8080/api/products', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(res => {
        console.log(res.payload)
        let html = ``
        const productList = document.querySelector('#productList')
        res.payload.map(product => {
            return html += `
            <div class="card w-25">
                <div class="card-header">
                    ${product.title}
                </div>
                <div class="card-body">
                    ${product.description}
                </div>
                <div class="card-footer">
                    ${product.price}
                    <button class=btn btn-outline-primary w-100">Detalle</button>
                </div>
            </div>`
        })
        productList.innerHTML = html
    })
    .catch(err => console.log(err))
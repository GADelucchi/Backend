console.log('Este es el index')

const form = document.querySelector('#cookieForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = new FormData(form)

    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    fetch('/api/session/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('respuesta.access_token')}`
        },
        body: JSON.stringify(obj)
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        console.log(respuesta),
        localStorage.setItem('token', respuesta.access_token)
    })
})

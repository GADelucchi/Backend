const express = require(`express`)

const app = express()

let usuarioFalso = [
    {id: `1`,nombre: `Gastón 1`, apellido: `Delucchi 1`},
]

app.use(express.urlencoded({extended: true}))

app.get(`/`, (request, response) => {
    response.send(`Esto funciona mejor que la app de CoderHouse`)
})

app.get(`/bienvenida`, (request, response) => {
    response.send(`<h1 style="color: blue">Bienvenidos al servidor con Express</h1>`)
})

app.get(`/usuario`, (request, response) => {
    response.send(usuarioFalso)
})

app.listen(8090, () => {
    console.log(`Escuchando en el puerto 8090`);
})
const express = require(`express`)

const app = express()

let usuarios = [
    {id: `1`,nombre: `Gastón 1`, apellido: `Delucchi 1`},
    {id: `2`,nombre: `Gastón 2`, apellido: `Delucchi 2`},
    {id: `3`,nombre: `Gastón 3`, apellido: `Delucchi 3`},
]

app.get(`/`, (request, response) => {
    response.send({usuarios})
})

app.get(`/:idUsuario`, (request, response) => {
    const {idUsuario} = request.params
    const usuario = usuarios.find(user => user.id === idUsuario)
    if (!usuario) return response.send({Error: `No se eencuentra el usuario`})
    response.send({usuario})
})

app.get(`/usuario/`, (request, response) => {
    response.send(usuarioFalso)
})

app.get(`/usuario/:nombre`, (request, response) => {
    console.log(request.params);
    response.send({nombre: request.params.nombre, apellido: `Delucchi`, edad: 25, correo: `gdelucchi@me.com`})
})

app.get(`/usuario/:nombre/:apellido`, (request, response) => {
    console.log(request.params);
    response.send({nombre: request.params.nombre, apellido: request.params.apellido, edad: 25, correo: `gdelucchi@me.com`})
})

app.listen(8080, () => {
    console.log(`Escuchando en el puerto 8080`);
})
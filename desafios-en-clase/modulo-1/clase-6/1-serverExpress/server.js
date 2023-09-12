const express = require(`express`)

const app = express()

const usuarioFalso = {
    nombre: `Gastón`,
    apellido: `Delucchi`,
    edad: 25,
    correo: `gdelucchi@me.com`
}

app.get(`/bienvenida`, (request, response) => {
    response.send(`<h1 style="color: blue">Bienvenido al servidor con Express</h1>`)
})

app.get(`/usuario`, (request, response) => {
    response.send(usuarioFalso)
})

app.listen(9000, () => {
    console.log(`Escuchando en el puerto 9000`);
})
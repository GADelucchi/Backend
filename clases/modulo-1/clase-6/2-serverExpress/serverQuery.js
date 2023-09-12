const express = require(`express`)

const app = express()

let usuarios = [
    { id: `1`, nombre: `Dalia`, apellido: `Gomez`, genero: `F` },
    { id: `2`, nombre: `Myrna`, apellido: `Flores`, genero: `F` },
    { id: `3`, nombre: `Armando`, apellido: `Mendoza`, genero: `M` },
    { id: `4`, nombre: `Melina`, apellido: `Beguiristain`, genero: `F` },
    { id: `5`, nombre: `Herminio`, apellido: `Fuentes`, genero: `M` },
    { id: `6`, nombre: `Juan`, apellido: `Zepeda`, genero: `M` },
]

app.use(express.urlencoded({ extended: true }))

app.get(`/`, (request, response) => {
    response.send(usuarios)
})

app.get(`/usuarios`, (request, response) => {
    const { genero } = request.query
    if (!genero || (genero !== `M` && genero !== `F`)) return response.send(usuarios)

    let userFilter = usuarios.filter(user => user.genero === genero)
    response.send({ userFilter })
})

app.listen(8070, () => {
    console.log(`Escuchando en el puerto 8070`);
})
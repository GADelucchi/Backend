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

app.use(express.json())
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

app.post(`/usuarios`, (req, res) => {
    let user = req.body

    if (!user.nombre || !user.apellido) return res.status(404).send({
        status: `404`,
        mensaje: `Todos los campos son necesarios`
    })
    usuarios.push(user)
    res.status(200).send({ usuarios })
})

app.put(`/usuarios/:uid`, (req, res) => {
    const { uid } = req.params
    const user = req.body

    const index = usuarios.findIndex(user => user.id === uid)

    if (index === -1) return res.status(404).send({
        status: `404`,
        message: `No existe el usuario`
    })

    usuarios[index] = { id: pid, ...user }

    res.status(`200`).send(usuarios)
})

app.delete(`/usuarios/:uid`, (req, res) => {
    const { uid } = req.params

    const index = usuarios.findIndex(user => user.id === uid)

    if (index === -1) return res.status(404).send({
        status: `404`,
        message: `No existe el usuario`
    })

    usuarios = usuarios.filter(user => user.id != uid)

    res.send({
        status: `200`,
        payload: usuarios
    })
})

app.get(`/:idUsuario`, (request, response) => {
    const { idUsuario } = request.params
    const usuario = usuarios.find(user => user.id === idUsuario)
    if (!usuario) return response.send({ Error: `No se eencuentra el usuario` })
    response.send({ usuario })
})

app.get(`/usuario/`, (request, response) => {
    response.send(usuarioFalso)
})

app.get(`/usuario/:nombre`, (request, response) => {
    console.log(request.params);
    response.send({ nombre: request.params.nombre, apellido: `Delucchi`, edad: 25, correo: `gdelucchi@me.com` })
})

app.get(`/usuario/:nombre/:apellido`, (request, response) => {
    console.log(request.params);
    response.send({ nombre: request.params.nombre, apellido: request.params.apellido, edad: 25, correo: `gdelucchi@me.com` })
})

const PORT = 8070

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})
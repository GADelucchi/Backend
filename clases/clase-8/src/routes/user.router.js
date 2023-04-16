const { Router } = require(`express`)

const router = Router()

let usuarios = [
    { id: `1`, nombre: `Dalia`, apellido: `Gomez`, genero: `F` },
    { id: `2`, nombre: `Myrna`, apellido: `Flores`, genero: `F` },
    { id: `3`, nombre: `Armando`, apellido: `Mendoza`, genero: `M` },
    { id: `4`, nombre: `Melina`, apellido: `Beguiristain`, genero: `F` },
    { id: `5`, nombre: `Herminio`, apellido: `Fuentes`, genero: `M` },
    { id: `6`, nombre: `Juan`, apellido: `Zepeda`, genero: `M` },
]
function mid1(req, res, next) {
    res.status(401).send(`No tenés permiso apra ver los usuarios`)
}

function mid2(req, res, next) {
    req.dato2 = `Dato dos`
    next()
}

router.get(`/`, mid2, (req, res) => {
    const { genero } = req.query
    if (!genero || (genero !== `M` && genero !== `F`)) return res.status(200).send({ usuarios, datos: req.dato2 })

    let userFilter = usuarios.filter(user => user.genero === genero)
    res.status(200).send({ userFilter, datos: req.dato2 })
})

router.post(`/`, (req, res) => {
    let user = req.body

    if (!user.nombre || !user.apellido) return res.status(404).send({ mensaje: `Todos los campos son necesarios` })
    usuarios.push(user)
    res.status(200).send({ usuarios })
})

router.put(`/:uid`, (req, res) => {
    const { uid } = req.params
    const user = req.body

    const index = usuarios.findIndex(user => user.id === uid)

    if (index === -1) return res.status(404).send({ message: `No existe el usuario` })

    usuarios[index] = { id: pid, ...user }

    res.status(200).send(usuarios)
})

router.delete(`/:uid`, (req, res) => {
    const { uid } = req.params

    const index = usuarios.findIndex(user => user.id === uid)

    if (index === -1) return res.status(404).send({ message: `No existe el usuario` })

    usuarios = usuarios.filter(user => user.id != uid)

    res.status(200).send({ payload: usuarios })
})

module.exports = router
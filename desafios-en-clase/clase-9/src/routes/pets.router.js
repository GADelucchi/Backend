const { Router } = require(`express`)
const PetsManager = require(`../managerDaos/petsManager`)

const router = Router()
const petsManager = new PetsManager

let pets = []

router.get(`/`, async (req, res) => {
    const pet = await petsManager.getPets()
    pets.push(pet)
    res.status(200).send(pets)
})

router.post(`/`, async (req, res) => {
    let pet = {type: `Perro`, age: 3}
    // let pet = req.body

    pets.push(pet)
    res.status(200).send({ pet })
})


module.exports = router
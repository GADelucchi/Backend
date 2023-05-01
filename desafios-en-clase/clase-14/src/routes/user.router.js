const { Router } = require(`express`)
const { userModel } = require("../models/user.model")

const router = Router()

router.get(`/`, async (req, res) => {
    try {
        let users = await userModel.find()
        console.log(users);
        res.status(200).send({
            status: `Success`,
            payload: users
        })
    } catch (error) {
        console.log(error);
    }
})

router.post(`/`, async (req, res) => {
    try {
        let user = req.body

        if (!user.nombre || !user.apellido) return res.status(400).send({ mensaje: `Todos los campos son necesarios` })

        const newUser = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }
        let result = await userModel.create(newUser)

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
    }
})

router.put(`/:uid`, async (req, res) => {
    try {
        const { uid } = req.params
        const user = req.body

        if (!user.nombre || !user.apellido) return res.status(400).send({ mensaje: `Todos los campos son necesarios` })

        const userToReplace = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }

        let result = await userModel.updateOne({ _id: uid }, userToReplace)

        res.status(200).send({
            status: `Success`,
            payload: result
        })

    } catch (error) {
        console.log(error);
    }
})

router.delete(`/:uid`, async (req, res) => {
    try {
        const { uid } = req.params

        let result = await userModel.deleteOne({_id: uid})

        res.status(200).send({
            status: `Success`,
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router
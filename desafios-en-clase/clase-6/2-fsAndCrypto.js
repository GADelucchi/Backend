const fs = require(`fs`)
const crypto = require(`crypto`)

class UserManager {
    constructor() {
        this.users = []
    }

    crearUsuario(nombre, apellido, nombreDeUsuario, contrasenia) {
        const user = {
            nombre,
            apellido,
            nombreDeUsuario,
            contrasenia
        }

        fs.writeFileSync(`./usuarios.json`, JSON.stringify(user, null, 2), `utf-8`)
    }

    validarUsuario(nombreUsuario, contrasenia) {

    }
}
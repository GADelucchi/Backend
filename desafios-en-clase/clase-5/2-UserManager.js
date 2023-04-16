const fs = require(`fs`)
const crypto = require(`crypto`)

const path = `./files/users.json`

class UserManager {
    consultarUsuarios = async () => {
        try {
            if (fs.existsSync(path)) {
                const data = await fs.promises.readFile(path, `utf-8`)
                const users = JSON.parse(data)
                return users
            }
            await fs.promises.writeFile(path, `[]`, `utf-8`)
            return []
        } catch (error) {
            console.log(error);
        }
    }

    crearUsuario = async (usuario) => {
        try {
            const users = await this.consultarUsuarios()
            if (users.length === 0) {
                usuario.id = 1
            } else {
                usuario.id = users[users.length - 1].id + 1
            }
            usuario.salt = crypto.randomBytes(128).toString(`base64`) // Alfa numérica
            usuario.password = crypto.createHmac(`sha256`, usuario.salt).update(usuario.pass).digest(`hex`)
            users.push(usuario)
            await fs.promises.writeFile(path, JSON.stringify(users, null, 2), `utf-8`)
            return usuario
        } catch (error) {
            console.log(error);
        }
    }

    validarUsuario = async (nombre, pass) => {
        try {
            const usuarios = await this.consultarUsuarios()

            const usuarioIndex = usuarios.findIndex(u => u.nombre === nombre)

            if (usuarioIndex === -1) {
                console.log(`Error: Usuario no encontrado`);
                return
            }

            const usuario = usuarios[usuarioIndex]
            const newHash = crypto.createHmac(`sha256`, usuario.salt).update(pass).digest(`hex`)

            if (newHash === usuario.password) {
                console.log(`Logueado`);
            } else {
                console.log(`Contraseña erronea `);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    UserManager
}
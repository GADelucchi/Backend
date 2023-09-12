const { UserManager } = require("./2-UserManager");


const manager = new UserManager

const env = async () => {
    // let primeraConsultaUsuarios = await manager.consultarUsuarios()
    // console.log(primeraConsultaUsuarios);

    let user = {
        nombre: `Gastón`,
        apellido: `Delucchi`,
        edad: 25,
        curso: `Backend`,
        pass: `123`
    }

    // let result = await manager.crearUsuario(user)
    // console.log(result);

    // let segundaConsultaUsuarios = await manager.consultarUsuarios()
    // console.log(segundaConsultaUsuarios);

    manager.validarUsuario(`Gastón`, `123`)
}

env()

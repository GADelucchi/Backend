const fs = require('fs')

let escribirArchivo = await fs.promises.writeFile('./usuarios.json', '[]', 'utf-8')

let chequearUsuarios = await fs.promises.readFile('./usuarios.json', 'utf-8')

let modificarUsuarios = await fs.promises.appendFile('./usuarios.json', 'Contenido adicional')

class Usuario {
    crearUsuario(nombre, apellido, edad, curso){
        const usuario = {
            nombre,
            apellido,
            edad,
            curso,  
        }
    }

    consultarUsuarios(){
        console.log(usuarios);
    }
}
// Yo

const fs = require('fs')

const operacionesAsyncronicas = async () => {
        try {
                // Lectura del archivo
                let contenido = await fs.promises.readFile('./package.json', 'utf-8')
                console.log(contenido);
                const contenidoParseado = JSON.parse(contenido)
                contenidoParseado.apellido = `Delucchi`
                contenidoParseado.size = contenido.length

                const contenidoParseadoJSON = JSON.stringify(contenidoParseado, 'null', 2)
                console.log(contenidoParseadoJSON);

        } catch (err) {
                console.log(err);
        }
}

operacionesAsyncronicas()


// Profe Fede

// const { promises } = require('fs')
// const fs = promises

// const operacionesAsyncronicas = async () => {
//         try {
//                 let contenido = await fs.readFile('./package.json', 'utf-8')
//                 console.log(contenido);
//                 // convertir a objeto javascript
//                 const respuestaParseada = JSON.parse(contenido)
//                 respuestaParseada.apellido = 'Fede el mejor'
//                 respuestaParseada.size = contenido.length
//                 // convertir a objeto Json
//                 const respParseadaJson = JSON.stringify(respuestaParseada, 'null', 2)
//                 console.log(respParseadaJson)

//                 await fs.writeFile('./info.json', respParseadaJson, 'utf-8')
//         } catch (error) {
//                 console.log(error)
//         }

// }

// operacionesAsyncronicas()
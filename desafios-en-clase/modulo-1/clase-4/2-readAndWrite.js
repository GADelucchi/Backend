// const numerosRandom = (max) => {
//     return Math.ceil(Math.random() * max)
// }


// const arregloDeNumeros = []
// for (let i = 1; i <= 10000; i++) {
//     let numero = numerosRandom(20)
//     arregloDeNumeros.push(numero);
// }

// console.log(arregloDeNumeros);

const { promises } = require(`fs`)
const fs = promises

const desafio2 = async () => {
    try {
        let contenido = await fs.readFile(`./2-package.json`, `utf-8`)
        let contenidoParseado = JSON.parse(contenido)

        const info = {
            contenidoStr: contenido.toString(),
            contenidoObj: contenidoParseado,
            size: contenido.length,
        }
        console.log(info);

        await fs.writeFile(`./2-info.json`, JSON.stringify(info, null, 2), `utf-8`)
        
    } catch (error) {
        console.log(error);
    }
}




desafio2()


// console.log(info);
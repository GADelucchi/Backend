const { promises } = require('fs')
const fs = promises

// fs.writeFile(`./data-promesas.txt`, `Texto agregado con promesas!\n`, `utf-8`)
//     .then(() => console.log(`Terminó de escribir`))
//     .catch((error) => console.log(error))

const operacionesAsincronicas = async () => {
    try {
        // await fs.writeFile(`./data-promesas.txt`, `Archivo creado con promesas\n`, `utf-8`)
        // console.log(`Archivo creado`);

        await fs.appendFile(`./data-promesas.txt`, `Esto es un agregado\n`, `utf-8`)

        let contenido = await fs.readFile(`./data-promesas.txt`, `utf-8`)
        console.log(contenido);

        await fs.unlink(`./data-promesas.txt`)
    } catch (error) {
        console.log(error);
    }
}

operacionesAsincronicas()

// const escribirAsincronico = async () => {
//     try {
//         await fs.writeFile(`./data-promesas.txt`, `Texto creado con promesas!\n`, `utf-8`)
//         console.log(`Terminó de escribir`);
//     } catch (error) {
//         console.log(error);
//     }
// }

// const agrgarAsincronico = async () => {
//     try {
//         await fs.appendFile(`./data-promesas.txt`, `Texto agregado\n`)
//         console.log(`Terminó de agregar`);
//     } catch (error) {
//         console.log(error);
//     }
// }

// const leerAsincronico = async () => {
//     try {
//         let contenido = await fs.readFile(`./data-promesas.txt`, `utf-8`)
//         console.log(contenido);
//     } catch (error) {
//         console.log(error);
//     }
// }

// escribirAsincronico()

// agrgarAsincronico()

// leerAsincronico()
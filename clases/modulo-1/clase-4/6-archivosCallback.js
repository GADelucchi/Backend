const fs = require('fs')

fs.writeFile('./data-callback.txt', 'Creado con fs con callback\n', 'utf-8', (error) => {
    if (error) console.log(`Sucedió un error al escribir`);
    console.log(`Archivo creado`);
})

fs.readFile('./data-callback.txt', 'utf-8', (error, contenido) => {
    if (error) console.log(`Sucedió un error al leer`);
    console.log(contenido);
})

fs.appendFile('./data-callback.txt', 'Agregando texto!\n', 'utf-8', (error) => {
    if (error) console.log(`Sucedió un error al modificar`);
console.log(`Agregado correctamente`);
})

// fs.readFile('./data-callback.txt', 'utf-8', (error, contenido) => {
//     if (error) console.log(`Sucedió un error`);
//     console.log(contenido);
// })

fs.unlink('.data-callback.txt', (error) => {
    if (error) console.log(`Sucedió un error al eliminar`);
    console.log(`Archivo eliminado`);
})
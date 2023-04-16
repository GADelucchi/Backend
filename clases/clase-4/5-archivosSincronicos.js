const fs = require('fs') // Así se declara que vamos a usar el FileSystem

fs.writeFileSync('./data-sincronico.txt', 'Creado con fs sincrónico\n', 'utf-8') // Crea el archivo
console.log(fs.existsSync('./data-sincronico.txt')); // Devuelve si existe el archivo

fs.appendFileSync('./data-sincronico.txt', 'Agregando datos', 'utf-8') // Agrega datos al archivo existente

if (fs.existsSync) {
    const contenidoArchivo = fs.readFileSync('./data-sincronico.txt', 'utf-8') // Lee el archivo y lo guarda en una variable
    console.log(contenidoArchivo); // Mostramos la variable por consola
}

fs.unlinkSync('./data-sincronico.txt') // Elimina un archivo
console.log(fs.existsSync('./data-sincronico.txt'));

let nombre = 'Gaston'
let edad = 25
let precio = 2500
let series = ['Dr. House', 'Greys anatomy']
let pelicula = ['Piratas del Caribe', 'El Planeta del Tesoro']

console.log(nombre, edad, precio);

console.table(series)
console.table(pelicula)

let suma = edad + 1
series.push('La Leyenda de Korra')

console.log(suma);
console.table(series);
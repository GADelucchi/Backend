Math.ceil(Math.random() * 20) // El ceil redondea hacia arriba, el random genera numeros al azar entre 0 y 1

let object = {}

for (let i = 1; i <= 10000; i++) {
    let randomNumber = Math.ceil(Math.random() * 20)

    if (!object[randomNumber]) { // Acá pregunta si el objeto con la clave del numero aleatorio que salio existe
        object[randomNumber] = 1 // Si esa clave no existe, le agrega como valor un 1
    } else {
        object[randomNumber] ++ // Si esa clave existe, al valor que tiene le suma 1
    }
}

console.log(object);
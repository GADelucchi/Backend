const numerosRandom = (max) => {
    return Math.ceil(Math.random() * max)
}


const arregloDeNumeros = []
for (let i = 1; i <= 10000; i++) {
    let numero = numerosRandom(20)
    arregloDeNumeros.push(numero);
}

console.log(arregloDeNumeros);
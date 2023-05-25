const temporizador = (callback) => {
    setTimeout(() => {
        callback()
    }, 5000); // El tiempo es expresado en milisegundos
}

let operacion = () => console.log(`Realizando tarea`);

console.log(`Iniciando tarea`);
temporizador(operacion) // Posicionamos el temporizador para que se ejecute segundo
console.log(`Tarea finalizada`);

// El temporizador se mostró en consola (ejecutó) después de los 5000 milisegundos (5 segundos), pero el resto de las operaciones que son
// sincrónicas siguieron ejecutándose normalmente sin esperar a que termine ese tiempo, puesto que el setTimeOut es asincrónico
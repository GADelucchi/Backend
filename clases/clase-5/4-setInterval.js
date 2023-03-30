let contador = () => {
    let counter = 1
    console.log(`Realizando operación`);
    let timer = setInterval(() => {
        console.log(counter++);
        if (counter > 5) {
            clearInterval(timer) // Apagador. Termina el setInterval cuando llega a 5
        }
    }, 1500);
}

console.log(`Iniciando tarea`);
contador()
console.log(`Tarea finalizada`);

// Esto es un contador asincrónico, en consola primero aparecen los .logs y luego los números, ya que tienen un intervalo
// Ejemplo de operación sincrónica (bloqueante)
console.log(`Iniciando tarea`);
console.log(`Realizando operación`);
console.log(`Continuando operación`);
console.log(`Tarea finalizada!`);

// Una va después de la orientation, el orden es el que se declaró

for (let contador = 1; contador <= 100000000; contador++) {
    console.log(contador);;
}

console.log(`Tarea finalizada!`);

// Esto que acabamos de hacer es un contador sincrónico, el console.log que dice 'Tarea finalizada!' no se ejecuta hasta que no
// termina de contar, sea cual sea el límite
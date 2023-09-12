// Sincronismo:
// Las operaciones sincrónicas son bloqueantes, es decir que si o si debe terminar una para comenzar la otra. 
// Estas nos sirven cuando queremos que se ejecuten en secuencia, una después de la otra, sin importar cuánto demore cada una.

// Asincronismo:
// Las operaciones asincrónicas, por otra parent, NO son bloqueantes; sirven cuando tienen que haber muchas tareas ejecutándose 
// simultáneamente y estás no tengan que esperar unas a otras. 

// setTimeOut
// Establece un temporizador para que ejecute una tarea cuando termine.Tranquilamente se pueden ejecutar operaciónes luego del setTimeOut 
// y estas no van a esperar a que termine el tiempo, sino que se van a ejecutar y luego terminará el setTimeOut en el tiempo especificado
// (si o si va a esperar a que termine el tiempo, aunque todo el resto haya terminado)

// setInterval
// Es asincrónico al igual que setTimeOut, solo que este lo que hace es ejecutar una acción cada vez que se termina el tiempo especificado,
// y el tiempo especificado se reinicia constantemente. Al declararla tiene en su estructura un apagador (una condición que hace que deje
// de reiniciarse el conteo); se suele usar para poner tiempos límites en páginas.

// El mantener todo en memoria hace que todo sea volatil, al recargar la página se perdería todo.
// La solución es guardar la información en archivos.

// fs es la abreviación de FileSystem, es un manejador de archivos que permite crear, leer, actualizar o borrar un archivo. 
// Para utilizar fs hay que importarlo con require('fs') y guardarlo en una variable. Se puede usar de manera sincrónica, con callback o
// con promesas

// fs sincrónico, se usa como si fuese una instancia de una clase con distintos métodos.

// fs con callbacks se usa igual solo que el último parámetro obviamente va a ser una callback. El primer argumento de una callback suele ser 
// un error, esto permite saber si salio bien o mal. el readFile tienee 2 argumentos, el segundo es el resultado de la lectura del archivo. 
// Usar callback es asíncrono. Si hay que hacer muchas operaciones tener cuidado porque se termina en el callbak hell

// fs con promesas. Se usa fs.promises o destructurando al principio en una variable (const { promises } = require('fs')) por ejemplo. Usando
// estas promesas hay que usar la palabra await delante del fs.writ…

// No todo va a ser archivo .txt. Qué pasa si querés guardar un objeto o un arreglo y no texto plano? Ahí entran los métodos JSON.stringify
// y JSON.parse. El problema es que el Objeto o el Arreglo de JS no se puede guardar así como está en un archivo .json, para eso están estos
// métodos
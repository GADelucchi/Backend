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
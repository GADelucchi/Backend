// Node no es solo una librería, es un entorno completo. Permite construir  apps ligeras, rapidas y en tiempo real. 
// Modulos de Node pueden ser fs, crypto, http (para crear servidores), path. 

// NMP es un manejador de paquetes de Node

// Con el comando npm init -y te genera un package.json. Dependencias, son los módulos que se instalan para el proyecto. Con npm install 
// + el nombre del modulo instala el módulo que se indica. 

// El .gitignoree sirve para no subir al Git todo lo que no se necesite (como los módulos instalados, ya quee hace muy pesado el archivo).

// Instalar un módulo de eforma o local se entiene la ventaja y las desventajas y qué significa cada cosa, no hay que explicar mucho. Una mala
// de instalar de manera global es que TODOS los proyectos van la versión actualizada y se te arma un quilombo zarpado, hayq ue modificar todo
// y todo.

// Versionado dee dependencias. Ejemplo v2.4.1: el primer numero son los cambios grandes, el del medio son cambios chicos y el ultimo son
// modificaciones de errores que se hayan presentado

// Operadores para actualizar versiones: ^ sirve para instalar la version menor más alta, esto no instala la version mayor y protege el codigo
// de incompatibilidades. ~ Este instala los parches, los correcciones de rrores nada más. Si no tiene nada, no modifica nada por más que haya 
// actualizaciones. npm outdated es un comando que tira qué versión tenes, cuál es la última y cuál se recomienda. Para instalar lo que se 
// recomienda se hace npm update

const moment = require("moment/moment");

console.log(moment.locale(`sp`));
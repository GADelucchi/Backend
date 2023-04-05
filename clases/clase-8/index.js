// Código de estado: Cuando se le solicita algo a un servidor, además de responder la info da un código que nos dice cómo viene el proceso
// o cómo finalizó (realizado o con algún error). Los rango de 100 son informativos, los 200 son OK, los 300 de redirección, los 400 errores
// de clientes y 500 los de errores del servidor. 200 indica que la petición se realizó correctamente. 300 hace referencia a redirecciones,
// cuando un recurso se movió a otro lado. 400 cuando el cliente hizo mal la petición. 401 cuando el cliente no se identificó con la
// credencial adecuada. 403 es cuando el cliente se identificó pero sus credenciales no tienen el suficiente nivel para acceder a donde quiere.
// 404 es cuando no se encontró, ya sea el dato o el endpoint. 500 cuando sucede un problema en el servidor. Y el meme del 418 que es "soy
// una tetera", significa que el servidor se reusa a hacer la tarea, porque es una tetera.

// Es nuestra responsabilidad coomo desarrolladores back hacer los status.

// API es un conjunto de definiciones y reglas que premiten que do equipos trabajen juntos, se puede entender ocmo un "contrato entre el back
// y el front". Te permite saber a qué endpoint apuntar, qué método usar y qué información enviar. La cadena es usuario  hace una petición
// a la API, esta hace un procesamiento al procesador, envía un resultado a la API y esta última una respuesta al usuario.

// REST: Reglas listas, ahora la estructura del mensaje, el formato; de eso se trata REST que permite definir esta estructura. HTTP es el
// protocolo, API son las reglas y REST es el formato del mensaje. Los dos formatos que se utilizan son XML y JSON. Entonces API REST es un
// sistema de comunicación completo entre computadoras. 

// Métodos de petición: forma parte del protocolo HTTP, también se conoce como verbo y se usa para identificar el tipo de petición que se hace.
// GET: obtener recurso. POST crear recurso. PUT: modificar recurso. DELETE: eliminar recurso. 

// POST: se usa para crear/añadir recursos; se apolla de req.body (vimos req.params y req.query); para que el servidor entienda JSON hay que
// agregar la linea app.use(express.json()). {extendede:true} hace que el servidor sepa interpretar los objetos recibidor

// PUT: se usa para modificar recursos. en el reques, mandamos el body y lo que querramos modificar por parametro (id, nombre, etc). Para
// actualizar se puede o actualizar los campos requeridos o todo el objeto. 

// DELETE: se usa para borrar. No hay que mandar nada en el body, pero en req.params hay que mandar el identificador
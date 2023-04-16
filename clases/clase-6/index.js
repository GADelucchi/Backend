// Protocolo HTTPS (Hyper Text Transfer Protocol): Son una serie de reglas que permiten la comunicación entre varios sistemas. Gracias a 
// esto las computadoras saben comunicarse entre si y con los servidores. HTTPS significa que la conexión es segura. El cliente hace una 
// solicitud y el servidor responde con lo que pide. En HTTPS viaja encriptada. Se puede solicitar com nombre, fecha, imagenes, jsons, 
// páginas webs completas, etc. 

// Armamos servidores que escuchan múltiples peticiones de múltiples clientes al mismo tiempo por defecto. Si el servidor se apaga qué pasa?
// Importante: el cliente es quien SIEMPRE hace las peticiones y el servidor SIEMPRE responde. El frontend se centra en que todo se vea 
// bonito y el Backend en que todo funcione y brinde información. 

// Nodemon: Como el servidor escucha continuamente y está prendido, los cambios que hagamos no se van a ver automáticamente. Por eso se 
// debe apagar y volver a iniciar. Nodemon permite reiniciar el servidor cuando detecta un cambio por más mínimo que sea. 

// Express: es un framework minimalista que permite desarrollar servidores más complejos. Facilita diferentes rutas para peticiones, 
// mejorar la estructura del proyecto, manejar funcionalidades más complejas y utilizacion de middlewares. 

// El request tiene 3 propiedades .query, .params y .body

// .params se usa para obetener elementos dinámicos desde la ruta que llama  el cliente. Para poner un parámetro se pone los dos puntos (:)
// así Express reconoce que es dinámico.

// .query significa a las muchas preguntas que se le puede hacer a un endpoint. Poniendo el signo de interrogacióon en la url Express 
// reconocerá que hay que meterle información al objeto para utilizarlo. Es decir, en el .params se define el endpoint y los parametros a
// utilizar; en este caso solo se denomina el endpoint y por url viaja el resto, no hay que definirlo de antes.

// La diferencia entre estos dos es que en el query puedo meter la cantidad que se me antoje de consultas, gracias a que no vienen en la ruta.
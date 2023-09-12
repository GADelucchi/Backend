// Websocket es un protocolo de comunicacion basado en TCP

// Por qué tengo que aprender otro protocoloo? cuándo usar uno y cuándo usar otro? Sirve? 

// Su protocolo establece dos sockets (o endpoint) de comunicación, teniendo una comunicación bidireccional cliente-servidor, esto permite que:
// el cliente obtenga recursos del servidor (como en HTTP), y que el servidor le mande info al cliente sin que este haga una petición (esta 
// es la ventaja).

// Es decir que, por ejemplo, en un sistema de subastas, el cliente no tiene que actualizar la página para saber si alguien más ofreció más 
// dinero que él, el servidor le va a mandar información cuando se actualice sin que el cliente haga nada más.

// Websocket funciona:
// • Primero un cliente manda una solicitud HTTP handshake (saludo, aprton de manos), esto le dice al servidor que actualice ese cliente sin 
// que se lo pida; el servidor recibe el saludo y se lo devuelve, esto es abirr la conexión.
// • Luego el canal que conectado bidireccionalmente, sin que ninguno lo pida (tanto cliente como servidor).
// • Por último la conexión se cierra por parte de alguno de los lados (o el cliente se desconecta, o el servidor se apaga/termina el programa)

// Hasta la mitad de la clase configuramos a Socket del lado del cliente, nos falta del lado del servidor. Toodavía no le dijimos al servidor
// a escuchar el handshake. En general, al que llamamos socketServer en el router se debe llamar io
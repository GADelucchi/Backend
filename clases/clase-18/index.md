Cookies, Sesions & Storage

Qué verga son las Cookies? Es información de comportamiento del cliente con nuestro sitio web. Ejemplos de datos que guardan: 1. Nombre de usuario 2. IDs de sesiones 3. preferencias de navegación.

El cliente hace login, la cookie almacena el id de la sesion; el cliente pone la página en mmodo oscuro, la cookie almacena id de sesion y preferencia de configuraci´øn de página; el cliente busca productos, la cookie almacena busquedas recientes

NO se guarda información sensible en una cookie, ni métodos de pago, ni contraseñas, ni etc.

Las cookies tienen un tiempo de vida y un espacio limitado, se le pueden asignar claves para aumentar la seguridad.

Firmas para las cookies, es un método de seguridad para que nadie externo altere la cookie


Session: sirve para dar identidad al cliente. Primero recordemos el API REST, conexión sin estado, es decir que el cliente no sabe de donde viene la info que pide y al servidor no le interesa saber para qué la va a usar. Para hacer conexión de datos, el cliente le tiene que dar al servidor en cada petición la info de quién es.

Para hacer al back más responsable, se hace el sistema se sesiones, que permite tener guardada info del cliente en el back
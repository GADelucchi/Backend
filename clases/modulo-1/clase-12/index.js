// Empezamos con MongoDB (base de datos).

// Hasta ahora nos manejábamos con archivos, y cuál es el problema de los archivos? El tener que leerlos completos para hacer una 
// modificación y luego volver a grabarlos completos. 

// Las bases de datos brindan un almacenamiento más seguro, se pueden separar los datos por contexto, tiene una gestion sencilla despues 
// de configurada.

// la comparación es que se accede a la base y se le dice la orden de modificacion, en el fileSystem hay que traer todo el archivo, mapear 
// todos el contenido, cambiar la propiedad y volver a sobrescribir todo el códig, incluso a los datos que no se tocaron. 

// Relacional y no relacional.
// La relacional refiere a estructura, relación, dependencia y cambio controlado. La no relacional es algo menos estructurado, más flexible 
// y con cambios más rápidos. Por ejemplo la relacional sirve para hacer un e-commerce, donde se RELACIONA el ID de un producto que está 
// en la tabla de productos con el ID del producto agregado en la tabla de carrito; entonces con una consulta se trae todo, el carrito y 
// los productos que este tenga. En la base de datos no relacional, todo se ve como un .json (en la relacional como tablas de Excell). 
// Cada objeto se conoce como documento, en la no relacional

// El lenguaje de las bases de datos relacionales es SQL (Structured Query Language), como por ejemplo MySQL, PostgreSQL, Oracle, MAriaDB. Si
// las apps crecen, los datos se hacen más complejos y cambian más rápido, las bases de datos relacionales no los ppueden seguir y se hacen
// lentas.
//Los no relacionales son más flexibles, se piensa más en el desempeño y no en la consistencia. Usan cable-valor, tienen documentos (cada
// objeto de json); alto grado de performance, super escalable. no usa SQL como lenguaje. Algunos ejemplos son MongoDB, Redis, DynamoDB.

// El array es una colección, lo cual agrupa documentos (objetos)

// Instalar Mongo: en la página oficial vamos a comunity server,seleccionamos el SO y descargamos

// En MongoDB Compass usamos la terminal para dejar la de Terminal con el server funcionando.
// Con "show dbs" muestra las bases de datoos que tenemos; con "use …" se posiciona en la base de datos que escribamos el nombre, tambien te
// crear una nueva. Luego usamos el comando "db.createCollection(`usuarios`)" donde db hace referencia a la base de datos donde estamos parados,
// .createCollection es un metodo para crear como lo dice y pasamos por parametro el nombre de la colección que esn este caso es "usuarios".


// Router en Express
// Permite separar los endpoint comunes (porque se debería usar 4 métodos para el mismo endpoint (get, post, put y delete)). 
// La estructura básica de un proyecto es como se ve en la carpeta de esta clase (sin tener en cuenta al archivo index.js)

// Hay recursos que son de uso público, es decir que los clientes pueden acceder a ellos poniendo la ruta correcta. Se usan más que 
// nada para imágenes o un html

// La carpeta Public tiene prioridad en la ruta raiz antes que cualquier .use que se coloque.

// Middlewares, cada vez que usamos app.use() eso es un middlewaree, es un intermediario. Se ejecuta antes de llegar al endpoint. Los 
// middleware se ejecutan en orden, se colocan en cascada.
// Middleware a nivel app (por ejempplo el app.js en un app.use que usa next()); a nivel endpoint es una funcion utilizada como parámetro 
// en un app.use(); a nivel router se usa en el archivo router; para manejar errores se pone en la app.js; de middleware incorporado es un
// ejemplo el static que pusimos antes (express.static); el ultimo es el de carga de archivos que en nuestro caso vamos a usar el multer, 
// 
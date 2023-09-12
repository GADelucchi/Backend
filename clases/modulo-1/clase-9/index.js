// Motores de plantillas

// El problema del desarrollo web es el dinamismo. Si quisieras mostrar un dato específico a un usuario específico, deberías marcarlo para que
// antes de que renderice, el motor de plantillas lo cambie por el dato necesario/solicitado. Acá vamos a usar handlebars, pero hay más motores
// para usar. 

// Para landing pages se puede usar JS puro para el tema del dinamismo, no es necesaria otra cosa ni otra tecnología. Cuando ya tenemos un 
// sitio web, donde navegamos entre páginas y demás, mostramos algunos productos y/o queremos hacer un login sencillo para diferenciar los
// usuarios, ahí podemos usar un motor de plantillas (pero aún no tiene el nivel de complejidad como para considerarse una aplicación web).

// Handlebars da un nivel medio de dinamismo y preprocesa el HTML reconociendo el patrón {{variable}}, buscando la información para sustituir.
// No está pensado para elementos de cambio constantes. 

// Hay que pensar la estructura previamente, va a ser un proyecto lleno de plantillas o solo con algunas? 

// Tambien permite realizar ifs (que solo devuelvan booleanos) e iteraciones. Se debe poner dentro de los doble corchetes el hashtag y lo que
// se use, como por ejemplo {{#if (condicion)}} o {{#each elemento iterable}}.

// La lógica de las plantillas tiene que ir en un router, y tienen que responder con render (no con send como en los otros routers) y también
// se pone en la ruta raíz `/`, sin tener que poner `/api`.

// También se pueden agregar css y js haciendo las debidas carpetas y archivos en public y vincularlos en el index.handlebars
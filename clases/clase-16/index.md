Teoria de indexación
Es lo que se usa en Mongo para hacer consultas más rápidas. Evita que recorras todo el archivo, documento por documento hasta encontrar el valor buscado. El índice se asocia a un atributo.
Hasta ahora no nos jode porque tenemos pocos datos en la base. Es una práctica a nivel empresarial. No se indexan todos los campos, solo los que nosotros querramos.
Si buscás archivos específicos (cuando tenés muchos) los tiempos se van a la mierda; por buscar en 5.000 archivos se triplicó el tiempo.
Poniendo index: true en el model se mejoran mucho los tiempos de respuesta.
Lo que hace con el index es en una tabla agarra y pone los campos indexados, entonces en vez de recorrer todos los docs. recorre su tabla de indexación.
Population hace referencia a obtener un documento dentro de otro documento. Es guardar el ID de un doc. dentro de otro doc. para que se enlacen
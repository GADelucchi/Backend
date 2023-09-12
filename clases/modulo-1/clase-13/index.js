// CRUD: Create - Read - Update - Delete

// .md significa "markdown", es para la documentación 

// Comandos:
// 1. show dbs -> muestra todas las bases de datos
// 2. use <db name> -> crea una base de datos y se posiciona en la base nombrada
// 3. db -> muestra la base en la que estamos posicionados
// 4. show collections -> muestra las colecciones en la base seleccionada
// 5. db.createCollection(name) -> crea una colección en la base ubicada
// 6. db.dropDatabase() -> elimina la base de datos posicionada
// 7. db.collection.drop() -> elimina la colección de la base posicionada
// 8. db.collection.insertOne(doc) -> agrega un documento a la colección
// 9. db.collection.insertMany(doc) -> agrega varios documentos a una colección (debe estar dentro de un array)
// 10. db.collection.findOne(opt) -> devuelve el primer documento que cumpla con el criterio de busqueda opt
// 11. db.collection.find(opt) -> devuelve todos los documentos que cumplan con el criterio de búsqueda opt
// 12. db.collection.find(opt).pretty() -> es pra hacer más lindos los resultados del .find(opt)
// 13. db.collection.estimatedDocumentCount() -> cuenta el estimado más próximo al número de documentos según su metadata
// 14. db.collection.countDocuments() -> cuenta los documentos que hay en la colección

// En cuanto a la búsqueda, se pueden agregar operadores para hacer filtros más específicos, con el signo peso ($)
// 1. $and -> usa dos criterios como filtro {$and: [{}, {}]}
// 2. $or -> usa uno o el otro criterio {$or: [{}, {}]}
// 3. $lt -> conincide con valores que son menores que el especificado
// 4. $lte -> coincide con valores menores o iguales al valor especificado
// 5. $gt -> coincide con valores que son mayores que el especificado
// 6. $gte -> coincide con valores mayores o iguales al valor especificado
// 7. $ne -> coincide con valores que no son iguales al valor especificado
// 8. $eq -> selecciona documentos que son iguales con el valor especificado
// 9. $exist -> selecciona documentos segun la existencia de un campo
// 10. $in -> selecciona documentos especificados en un array {key: {$in: [array de valores]}}
// 11. $nin -> selecciona documentos que no coincidan con los valores especificados en un array
// 12. $size -> coincide con el numero de elementos especificados
// 13. $all -> coincide con todos los elementos especificados dentro de un array
// 14. $elemMatch -> coincide con algun valor dentro del query

// 1. db.collection.distinct(val) -> devuelve un array con los distintos valores que toma un campoen los documentos
// 2. db.collection.find({document.subdocument: value}) -> se utiliza para filtrar subdocumentos
// 3. db.collection.find({name: /^Max$/i})

// Proyecciones
// Se agrega un segundo argumento a la buscqueda para decirle qué key queremos que traiga

// Sort
// Sirve para ordenar los valores de una búsqueda

// Skip y limit
// Skip: omite la cantidad de documentos indicados
// Limit: limita el numero de documentos devueltos


//CRUD: U (Update)
// db.collection.updateOne(query, update, option) -> donde `query` filtra qué elementos modificar (igual que un find), `update` es qué actualizar,
// de los docs que cumplen con el filtro que tiene sus propios operadores, y `option` opciones para tomar en cuenta para la actualización

// db.collection.updateMany(query, update, options) -> lo mismo que lo de recién


// CRUD D (Delete)
// db.collection.deleteOne({key: val}) -> elimina solo el primer elemento que encuentre con el criterio
// db.collection.deleteMany({key: val}) -> elimina todos los documentos que cumplan con el criterio
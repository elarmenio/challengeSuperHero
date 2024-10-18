# Angular16
Para correr el proyecto , primero ha de instalarse todas las librerias dentro del package.json corriendo el comando npm i
Para obtener los datos para simular los servicios, hay que correr el script json-server --watch db.json, con esto simula la ejecucion y consumo de dos servicios para agregar y editar personas tanto como cargar los personajes como si fuera desde una base de datos.
Correr ng serve para la compilacion del proyecto para asi luego poder probar.

# Servicios e Interceptor

Para los servicios , lo primero que realice fue la creacion de una funcion para agregar y editar 
'addHeroEdit(ero: SuperHero)',
dicha funcion se le puede mandar un objeto nuevo como un objeto existe de un personaje en el cual tiene una interface que contiene, name, power, description, image y  id. 
Dependiendo del caso, si es un nuevo personaje directamente simula ejecutarse un post al servicio de tal forma que se agregaria a la db.json que es mi mock.
Si es un personaje existente, lo que hara es con los nuevos valores del personaje realizarse un put al servicio editando asi, el personaje en la db.json.
Por otra parte tenemos un servicio getAllHeroes() que nos devolvera todos los personajes que contiene el mock.
Para poder buscar un personaje existente por id o nombre, simplemente utilice un input donde se podra escribir el valor de lo que se quiera buscar y selector donde se puede elegir la busqueda por id o por nombre. Al tener ambos valores, el seleccionado en el selector y lo escrito en el input, con estos se filtrara sobre el array de personajes y se podra visualizar finalmente el personaje o en su defecto si no existe se mostrara un cartel 
'No heroes were found.'
Para eliminar lo que se hace es obtener el id del personaje a eliminar y se pisa el array de personajes filtrandolo por todos aquelos personajes que tengan un id distinto al personale a eliminar de tal forma que el array quedara sin ese personaje. 


adicional a la logica de los servicios, para poder simular un tiempo de espera de los servicios sume un interceptor que contiene el seteo de un observable booleando que se accionara al iniciar la ejecucion del servicio y al finalizar el mismo por lo que nos permitira saber cuando mostrar o no mi componente loading en este caso un mat spinner.

# Test

Tambien se ha agregado un test se probara la correcta ejecucion de los servicios a partir de un mock de heroes.
Para ello se debera de correr el script ng test y deberiamos obtener en el caso de este test, 5 casos exitosos.

# Uso de Signals

Dada mi falta de experiencia con las signals, realice un uso basico de las mismas para algunos casos de mi formulario de editar y agregar y ademas para un modal de confirmacion. 
Con ello,  me permite manejar de manera simple y eficiente cosas que cambian en el formulario (como el título y la validez) asi como tambien strings como bien comente en el modal de confirmacion. 
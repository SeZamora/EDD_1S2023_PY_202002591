###### Universidad de San Carlos de Guatemala
###### Facultad de Ingeniería
###### Estructuras de Datos
###### Primer Semestre de 2023

|Nombre  | Carnet | 
|------------- | -------------|
|Jorge Sebastian Zamora Polanco  | 202002591|

# Manual Tecnico

## Proyecto EDD "Go Drive"  Fase:3

### Resumen
El sistema debe tener un funcionamiento similar a Google Drive con la característica que nos da el enunciado,  además de otras características propias de la aplicación. 

Estructuras a utilizar:
- Árbol AVL: Usuarios que estén en el sistema ya aceptados.
- Matriz Dispersa: Se utilizará para manejar permisos en las carpetas del
directorio actual.
- Árbol Multicamino o N-ario: se usará para el manejo de los sistemas de
archivos.
- Lista Circular: Manejo de logs, creación o eliminación de carpetas o archivos
ligados a cada usuario

## Descripcion de los paquetes
a continuacion se describe las funciones y las estructuras

### scripts: admin

|  Función | Descripción  |
| :------------: | :------------: |
|  cargarEstudiante   |  Lee el archivo Json que se le envia y lo guarda en el avl, luego hace un recorrido in order para guardarlo en la Tabla Hash con la contraseña encriptada en SHA256  |
|   graficarHash | cambia la tabla y lo pone en el orden como esta en la tabla hash con la contraseña ya encriptada |
|   Buscar | Revisa en la tabla Hash que el carnet y la contraseña coincidan y redirige a la pagina de los estudiantes  |
| crearCarpeta | funcion que crea una carpeta y la muestra en la pagina |
| entrarCarpeta | hace que podamos entrar a una carpera dandole click |
| showTreeGraph |muestra el grafo no dirigido |

### scripts: cliente

|  Función | Descripción  |
| :------------: | :------------: |
|  updateChats   | Actualiza el chat, pone los archivos recividos o entregados   |
|   sendMessage | Guarda el transmisor, receptor, mensaje y hora en la lista doble del blockchain |
|   getFormattedDateTime | devuelve la hora y fecha actual  |
| getBlock | obtiene el bloque y lo imprime en el admin |



### Estrucuras 

| Estructura  |  Descripción |
| :------------: | :------------: |
| avl-tree | Crea el arbol avl de los estudiantes cargados de json|
|  nario-tree |   maneja los directorio que crea el estudiante en una estuctura de un arbol N-ario |
|  tablaHash |  Guarda los estudiantes con su contraseña encriptada en SHA256  |
|blockchain| maneja en una lista doble los mensajes con su infomacion en un bloque de los chats entre estudiantes |
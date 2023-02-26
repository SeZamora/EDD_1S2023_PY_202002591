###### Universidad de San Carlos de Guatemala
###### Facultad de Ingeniería
###### Estructuras de Datos
###### Primer Semestre de 2023

|Nombre  | Carnet | 
|------------- | -------------|
|Jorge Sebastian Zamora Polanco  | 202002591|

# Manual Tecnico

## Proyecto EDD "Go Drive"  Fase:1

### Resumen
El sistema debe tener un funcionamiento similar a Google Drive con la característica que nos da el enunciado,  además de otras características propias de la aplicación. 

Estructuras a utilizar:
- Lista Doblemente Enlazada: Visualización de los alumnos que existen en el sistema, ordenados por carnet.
- Lista de pilas: Usuario Creado ligado a una bitácora.
- Pila: Bitácora de acciones del administrador.
- Cola: Cola de estudiantes para creación de usuario.

## Descripcion de los paquetes
a continuacion se describe los diferentes paquetes y sus funciones mas importantes.
### paquete: main

|  Función | Descripción  |
| :------------: | :------------: |
|  main  |  Es menu principal en el cual podemos acceder a los usuarios o salir de programa|
|   administrador | Despliega el menu de administrador en el cual podemos realizar las acciones de administrador |
|   formato hora | Nos devuelve el dia/mes/año y hora actual  |

### paquete: cola

| Función  |  Descripción |
| :------------: | :------------: |
| Encolar  | Insertamos los datos del estudiante enviados por el administrador al final de la cola para proximamente ser aceptados o rechazados. |
| Desencolar | Eliminamos el nodo que se encuetra en al cabeza de la cola luego de ser aceptado o rechazado, y retorna el nodo en caso de ser aceptado para ser agregado a la lista doble.|
| Graph | Crea un archivo .dot y .png de los estudiantes que se encuntran en la cola en ese momento. |

### paquete: pila

| Función  |  Descripción |
| :------------: | :------------: |
| Push | Crea el nodo con la accion y hora que se realizo al principio de la pila |
|  Graph |   Crea un archivo .dot y .png de las acciones del administrador  |
|  Pila_Estudiantes |  Devuelve la pila de los estudiantes cuando iniciaron sesión |

### paquete: doble

| Función  |  Descripción |
| :------------: | :------------: |
| Insertar | Cuando el administrador acepta un estudiante ingresa sus datos en la lista doble y los inserta en orden de carnet de menos a mayor |
|  Print |   Imprime la lista doble en la consola  |
|  Buscar |  Busca si el carnet y su contraseña para ver si coinciden con un estudiante existente en la lista |
| Graph | Crea un archivo .dot y .png de la lista doble con los inicios de sesion de los estuantes |
| ExportarJSON | Crea un archivo .json de los estudiantes |

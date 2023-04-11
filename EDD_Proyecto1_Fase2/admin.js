
let avlTree = new AvlTree();
let nario = new NarioTree();
let circulo = new ListaCircular();

function cargarEstudiante(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr>
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
          
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
            }
            localStorage.setItem("arbolavl", JSON.stringify(JSON.decycle(avlTree)));
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    console.log(temp);


}

function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
    console.log(avlTree.search(1231243)); // true
    console.log(avlTree.search(201901801)); // false
    
    //prueba
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;

    const resulta = avlTree.search(201700918);
    console.log(resulta);
    if (resulta == true) {
        alert("entre a estudiante");
        //window.location = "../Estudiante/Estudiante.html";    
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de error
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
}
 
function administrador(){
    var carnet = document.getElementById('carnet');
    var pass = document.getElementById('contraseña');
 
    if (carnet.value === "admin" && pass.value === "admin") {
         console.log("entro");
         window.location.href = "admin.html";
         // Si las credenciales son correctas, redirigir al usuario a la página de bienvenida
    } else {
         buscar();
         //window.location = "../Estudiante/Estudiante.html";    
    } 
}

function buscar(){
    var carnet
    var carnetInt
    var pass
    // Obtener referencias a los elementos de la página
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;

    alert("entre a buscar");
    carnet = document.getElementById('carnet');
    carnetInt = parseInt(carnet.value);
    pass = document.getElementById('contraseña');
    localStorage.setItem("carnet", carnetInt);
    localStorage.setItem("pass", pass.value);
    const resulta = avlTree.search(carnetInt, pass.value);
    if (resulta != null) {
        alert("->"+resulta.item.nombre);        
        window.location.href = "estudiante.html?carnet=" + carnet.value; 
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de error
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
}

function volver(){
    location.href = "Inicio.html";
}

function ver(){
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    console.log(temp);

}
// usuario
function crearCarpeta(e){
    e.preventDefault();
    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    nario.root = resulta.arbolnario.root;
    circulo.root = resulta.listacircular.root;

    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    nario.insert(folderName, path);
    alert("Todo bien!");
    $('#carpetas').html(nario.getHTML(path))

    const fecha = obtenerFecha();
    const hora = obtenerHora();
    circulo.agregar("Crear Carpeta",folderName,fecha, hora );

    resulta.arbolnario.root = nario.root;
    resulta.listacircular.root = circulo.root;

    localStorage.setItem("arbolavl", JSON.stringify(JSON.decycle(avlTree)));
    
}

function cambiarDirectorio(){
    var direccion = prompt("Que direccion:");
    console.log(direccion);

    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    nario.root = resulta.arbolnario.root;

    $('#path').val(direccion);
    $('#carpetas').html(nario.getHTML(direccion))
}
function entrarCarpeta(folderName){
    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    nario.root = resulta.arbolnario.root;
    
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(nario.getHTML(curretPath))
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(nario.getHTML("/"))
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


function showTreeGraph(){
    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    nario.root = resulta.arbolnario.root;

    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${nario.graph()} }`
    $("#graph").attr("src", url + body);
}
function ShowBitacora(){
    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    circulo.root = resulta.listacircular.root;
    console.log(circulo.root);
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${circulo.graph()} }`
    $("#bitacora").attr("src", url + body);
}

let nombreArchivo = ""
let base64String = ""

const subirArchivo =  async (e) =>  {
    e.preventDefault();

    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    nario.root = resulta.arbolnario.root;



    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    console.log(form.file.type);
    let path = $('#path').val();
    if(form.file.type === 'text/plain'){
        // ARCHIVO DE TEXTO
        let fr = new FileReader();
        fr.readAsText(form.file);
        console.log(form.file.name)
        fr.onload = () => { 
            // CARGAR ARCHIVO A LA MATRIZ
            nario.getFolder(path).files.push({
                name: form.file.name, 
                content: fr.result, 
                type: form.file.type
            })
            $('#carpetas').html(nario.getHTML(path));
        };
    }else{
        // IMÁGENES O PDF 
        let parseBase64 = await toBase64(form.file);
        nario.getFolder(path).files.push({
            name: form.file.name, 
            content: parseBase64, 
            type: form.file.type
        })
        $('#carpetas').html(nario.getHTML(path));
        // console.log(parseBase64)
        // $("#imagenSubida").attr("src", imgBase64); 
        // console.log(await toBase64(form.file));
    }
    alert('Archivo Subido!')
    



    resulta.arbolnario.root = nario.root;
    localStorage.setItem("arbolavl", JSON.stringify(JSON.decycle(avlTree)));
}



function deleteCarpeta(){
    var direccion = prompt("Que direccion:");
    console.log(direccion);

    let carnetInt = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");
    let temp = localStorage.getItem("arbolavl");
    avlTree.root = JSON.parse(temp).root;
    const resulta = avlTree.search(carnetInt, pass);
    nario.root = resulta.arbolnario.root;
    circulo.root = resulta.listacircular.root;

    nario.eliminarDirectorio(direccion);

    const fecha = obtenerFecha();
    const hora = obtenerHora();
    circulo.agregar("Eliminar Carpeta",direccion,fecha, hora );


    resulta.arbolnario.root = nario.root;
    resulta.listacircular.root = circulo.root;

    $('#path').val("/");
    $('#carpetas').html(nario.getHTML("/"))

    localStorage.setItem("arbolavl", JSON.stringify(JSON.decycle(avlTree)));

}

function obtenerFecha() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaActual.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

function obtenerHora() {
    const horaActual = new Date();
    const hora = horaActual.getHours().toString().padStart(2, "0");
    const minutos = horaActual.getMinutes().toString().padStart(2, "0");
    const segundos = horaActual.getSeconds().toString().padStart(2, "0");
    return `${hora}:${minutos}:${segundos}`;

}
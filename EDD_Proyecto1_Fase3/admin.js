
let avlTree = new AvlTree();
let nario = new NarioTree();
let hashTable = new HashTable();


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
            console.log("voy a in order");
            const arrayHash = avlTree.inOrder()
            
            arrayHash.forEach((item) => {
               
                let pass = CryptoJS.SHA256(item.password).toString();
                
                hashTable.insert(item.carnet, item.nombre, pass);
              });
            localStorage.setItem("hashTable", JSON.stringify(hashTable));
            localStorage.setItem("arbolavl", JSON.stringify(JSON.decycle(avlTree)));
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}


  

function graficarHash(){

    $('#studentsTable tbody').html(
        hashTable.imprimirTabla()
    )

    console.log("voy a imprimir la tabla hash")
    let pass = CryptoJS.SHA256("Luis32").toString();
    let compr = hashTable.search(9616453, pass);
    if (compr != null) {
        console.log("encontre el estudiante");
    } else {
        console.log("no encontre el estudiante");
    }

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
    
    let temp2 = localStorage.getItem("hashTable");
    hashTable.table = JSON.parse(temp2).table;
    hashTable.capacidad = JSON.parse(temp2).capacidad;
    hashTable.espaciosUsados = JSON.parse(temp2).espaciosUsados;
    console.log(hashTable);

    alert("entre a buscar");
    carnet = document.getElementById('carnet');
    carnetInt = parseInt(carnet.value);
    pass = document.getElementById('contraseña');
    localStorage.setItem("carnet", carnetInt);
    localStorage.setItem("pass", pass.value);
   
    let password = CryptoJS.SHA256(pass.value).toString();
    console.log(password);
    console.log(carnetInt);
    let compr = hashTable.search(carnetInt, password);
    console.log(compr);
    if (compr != null) {
        window.location.href = "estudiante.html?carnet=" + compr.carnet ; 
    } else {
        console.log("no encontre el estudiante");
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
  

    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    nario.insert(folderName, path);
    alert("Todo bien!");
    $('#carpetas').html(nario.getHTML(path))

  
    

    resulta.arbolnario.root = nario.root;


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
  

    nario.eliminarDirectorio(direccion);





    resulta.arbolnario.root = nario.root;


    $('#path').val("/");
    $('#carpetas').html(nario.getHTML("/"))

    localStorage.setItem("arbolavl", JSON.stringify(JSON.decycle(avlTree)));

}


let tabla = new HashTable();
let blockChain = new BlockChain();

$(document).ready(() => {
    
    let carnet = localStorage.getItem("carnet");
    let pass = localStorage.getItem("pass");

    let temp2 = localStorage.getItem("hashTable");
    tabla.table = JSON.parse(temp2).table;
    tabla.capacidad = JSON.parse(temp2).capacidad;
    tabla.espaciosUsados = JSON.parse(temp2).espaciosUsados;

    let password = CryptoJS.SHA256(pass).toString();
    let carnetInt = parseInt(carnet);
    let usuario = tabla.search(carnetInt, password);

    if (localStorage.getItem("Array") == null){
        let array = [];
        localStorage.setItem("Array", JSON.stringify(array));
    }

    let optionsForSelect1 = "";
    let optionsForSelect2 = "";
    
        
    optionsForSelect1 += `
    <option value="${usuario.carnet}">${usuario.nombre}</option>
    `;    
          
    let matriz = tabla.getMatrix();
    console.log(matriz);

    matriz.forEach(item => {
        optionsForSelect2 += `
        <option value="${item.carnet}">${item.nombre}</option>
        `; 
    });
    $('#transmitter').append(optionsForSelect1);
    $('#receiver').append(optionsForSelect2);

});

async function updateChats(){

    
    blockChain.clear();
    let ArrayS = localStorage.getItem("Array");
    let myArray = JSON.parse(ArrayS);
    let Recorrer = [];
    Recorrer = myArray;

    if (myArray != null) {
        for (let i = 0; i < Recorrer.length; i++) {
           await rellenar('transmitter',Recorrer[i].transmisor, Recorrer[i].receptor, Recorrer[i].mensaje, Recorrer[i].fecha);

        }
      
    }
    
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    $('#transmitter-chat').html(blockChain.getMessages(transmitter, receiver));
    $('#receiver-chat').html(blockChain.getMessages(receiver, transmitter));
    console.log("updateChats");

    

}

async function Bloque(){
    blockChain.clear();
    let ArrayS = localStorage.getItem("Array");
    let myArray = JSON.parse(ArrayS);
    let Recorrer = [];
    Recorrer = myArray;

    if (myArray != null) {
        for (let i = 0; i < Recorrer.length; i++) {
           await rellenar('transmitter',Recorrer[i].transmisor, Recorrer[i].receptor, Recorrer[i].mensaje, Recorrer[i].fecha);


        }
      
    }
}



async function sendMessage(whoSend){

    let ArrayS = localStorage.getItem("Array");
    let myArray = JSON.parse(ArrayS);

    // OBTENER VALORES DEL SELECT 
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    
    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':
                // OBTENER MENSAJE A ENVIAR
                let msgt = $('#msg-transmitter').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                let fecha = getFormattedDateTime();
                await blockChain.insert(transmitter, receiver, msgt, fecha);     
                $('#msg-transmitter').val("");
                myArray.push({transmisor: transmitter, receptor: receiver, mensaje: msgt, fecha: fecha})
            break;
            case 'receiver':
                console.log("entro receptor");
                // OBTENER MENSAJE A ENVIAR
                let msgr = $('#msg-receiver').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                let fecha2 = getFormattedDateTime();
                await blockChain.insert(receiver, transmitter, msgr, fecha2);
                $('#msg-receiver').val("");
            break;
        }

        alert("Mensaje enviado");
        // ACTUALIZAR CHATS
      
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }

 
    localStorage.setItem("Array", JSON.stringify(myArray));
    console.log("SendMessage");
    console.log(blockChain);
    
}

async function rellenar(whoSend, transmitter, receiver, msgt, fecha){



    // OBTENER VALORES DEL SELECT 
 
    
    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':

                await blockChain.insert(transmitter, receiver, msgt, fecha);     
                
            break;
            case 'receiver':
                // OBTENER MENSAJE A ENVIAR
                
                console.log("entro receptor");
               
            break;
        }


        // ACTUALIZAR CHATS
      
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }


}

function getFormattedDateTime() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().padStart(4, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} :: ${hours}:${minutes}:${seconds}`;
  }

async function getBlock(index){
    await Bloque();
    console.log(blockChain);
    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));
        
        if(index < 0){ // MOSTRAR EL ANTERIOR
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){ // MOSTRAR EL SIGUIENTE
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }

    console.log("getBlock");
    console.log(blockChain);
}

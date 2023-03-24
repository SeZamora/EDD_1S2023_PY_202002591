
function login(){
    // Obtener referencias a los elementos de la página
    var carnet = document.getElementById('carnet');
    var pass = document.getElementById('contraseña');

   
    if (carnet.value === "admin" && pass.value === "admin") {
        console.log("entro")
        window.location = "../admin/admin.html";
        // Si las credenciales son correctas, redirigir al usuario a la página de bienvenida
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de error
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        
    }
 
}
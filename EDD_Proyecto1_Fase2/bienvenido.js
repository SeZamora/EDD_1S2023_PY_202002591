var carnet = new URLSearchParams(window.location.search).get("carnet");
document.getElementById("mensaje").innerHTML = "Bienvenido " + carnet + "!";
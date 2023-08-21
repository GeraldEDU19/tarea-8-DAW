function mostrarTodo() {
    var tipoVehiculo = document.getElementById("tipoVehiculo").selectedOptions[0].text;
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    var img3 = document.getElementById("img3");

    
    // Cambiar imagen principal
    var imgVista = document.getElementById("imgVista");
    imgVista.src = "images/" + tipoVehiculo + "1.png";

    // Cambiar las imagenes de abajo
    img1.src = "images/" + tipoVehiculo + "1.png";
    img2.src = "images/" + tipoVehiculo + "2.png";
    img3.src = "images/" + tipoVehiculo + "3.png";
    
    // Cambiar descripción
    var descripcion = document.getElementById("infTCar");
    descripcion.textContent = obtenerDescripcion(tipoVehiculo);
}

function mostrarImagen(imagenNumero) {
    var tipoVehiculo = document.getElementById("tipoVehiculo").selectedOptions[0].text;
    var imgVista = document.getElementById("imgVista");
    
    // Cambiar imagen principal
    imgVista.src = "images/" + tipoVehiculo + imagenNumero + ".png";
    
    // Cambiar descripción
    var descripcion = document.getElementById("infTCar");
    descripcion.textContent = obtenerDescripcion(tipoVehiculo, imagenNumero);
}

function obtenerDescripcion(tipo, imagenNumero) {
    var descripciones = {
        "Compacto": ["KIA PICANTO, Año 2016", "FORD FIESTA ST, Año 2015", "PEUGEOT 308, Año 2018"],
        "Mediano": ["HONDA CITY CAR, Año 2017", "MERCEDES SLS, Año 2015", "FORD FIESTA ST, Año 2016"],
        "TodoTerreno": ["TOYOTA FJ CRUISER, Año 2016", "TOYOTA Prado, Año 2018", "NISSAN JUKE, Año 2017"],
        "Familiar": ["TOYOTA SIENNA, Año 2018", "DODGE GRAND CARAVAN, Año 2015", "HYUNDAI ELANTRA, Año 2016"]
    };
    
    var indice = imagenNumero ? imagenNumero - 1 : 0;
    return descripciones[tipo][indice];
}
// Función para cargar la lista de nacionalidades desde la API REST
async function cargarNacionalidades() {
    const selectNacionalidad = document.getElementById("nacionalidad");

    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.cca3;
            option.textContent = country.name.common;
            selectNacionalidad.appendChild(option);
        });

        // Verificar si hay una nacionalidad guardada localmente
        const nacionalidadGuardada = localStorage.getItem("nacionalidad");
        if (nacionalidadGuardada) {
            selectNacionalidad.value = nacionalidadGuardada;
        } else {
            // Si no hay nada guardado, preseleccionar Costa Rica
            selectNacionalidad.value = "CRI";
        }
    } catch (error) {
        console.error("Error al cargar las nacionalidades:", error);
    }
}

// Llamada a la función para cargar las nacionalidades al cargar la página
cargarNacionalidades();
function calcularCostos() {
    const fechaRetiro = new Date(document.querySelector('input[name="fechaRetiro"]').value);
    const fechaDevolucion = new Date(document.querySelector('input[name="fechadevolucion"]').value);
    const tipoVehiculo = parseFloat(document.querySelector('#tipoVehiculo').value);
    const tipoSeguro = parseFloat(document.querySelector('#seguro').value);

    // Calcular la cantidad de días
    const cantidadDias = Math.round((fechaDevolucion - fechaRetiro) / (1000 * 60 * 60 * 24));
    document.querySelector('input[name="dias"]').value = cantidadDias;

    // Calcular la tarifa diaria
    let tarifaDiaria = tipoVehiculo + tipoSeguro;

    // Aplicar descuentos según el total de días
    if (cantidadDias > 30 && cantidadDias < 120) {
        tarifaDiaria -= tarifaDiaria * 0.15;
    } else if (cantidadDias >= 120 && cantidadDias <= 365) {
        tarifaDiaria -= tarifaDiaria * 0.25;
    } else if (cantidadDias < 3 || cantidadDias > 365) {
        alert("Los días no son correctos.");
        return;
    }

    document.querySelector('input[name="td"]').value = tarifaDiaria.toFixed(2);

    // Obtener el porcentaje de descuento según la región
    obtenerPorcentajeDescuento().then(porcentajeDescuento => {
        // Calcular el total a pagar
        const totalPagar = tarifaDiaria * cantidadDias - (tarifaDiaria * cantidadDias * porcentajeDescuento);
        document.querySelector('input[name="totalPagar"]').value = totalPagar.toFixed(2);
    });
}

async function obtenerPorcentajeDescuento() {
    const nacionalidad = document.querySelector('#nacionalidad').value;
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${nacionalidad}`);
    const data = await response.json();

    let porcentajeDescuento = 0;

    // Calcular el porcentaje de descuento según la región
    switch (data[0]?.region) {
        case "Americas":
        case "Europe":
            porcentajeDescuento = 0.10;
            break;
        case "Africa":
            porcentajeDescuento = 0.05;
            break;
    }

    return porcentajeDescuento;
}

function MensajeTipoSeguro() {
    const selectSeguro = document.getElementById("seguro");
    const selectedOption = selectSeguro.options[selectSeguro.selectedIndex];

    let mensaje = "";

    switch (selectedOption.id) {
        case "PBO":
            mensaje = "Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.\nCosto de alquiler diario: $ 5.45 por día.";
            break;
        case "PED":
            mensaje = "Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.\nCosto de alquiler diario: $ 9.50 por día.";
            break;
        case "PGM":
            mensaje = "Cubre la Protección Extendida de Daños(PED) más gastos médicos para los ocupantes del vehículo.\nCosto de alquiler diario: $ 11.25 por día.";
            break;
        default:
            mensaje = "Seleccione un tipo de seguro";
            break;
    }

    alert(mensaje);
}

//Guardar en LocalStorage
const fechaRetiro = document.querySelector('input[name="fechaRetiro"]');
const fechaDevolucion = document.querySelector('input[name="fechadevolucion"]');
const tipoVehiculo = document.querySelector('#tipoVehiculo');
const tipoSeguro = document.querySelector('#seguro');
const cantidadDias = document.querySelector('input[name="dias"]');
const tarifaDiaria = document.querySelector('input[name="td"]');
const totalPagar = document.querySelector('input[name="totalPagar"]');

function guardarCotizacion() {

    const cotizacion = {
        fechaRetiro: fechaRetiro.value,
        fechaDevolucion: fechaDevolucion.value,
        tipoVehiculo: tipoVehiculo.selectedOption,
        tipoSeguro: tipoSeguro.selectedOption,
        cantidadDias: cantidadDias.value,
        tarifaDiaria: tarifaDiaria.value,
        totalPagar: totalPagar.value
    };

    localStorage.setItem("cotizacion", JSON.stringify(cotizacion));
    alert("Cotización guardada en LocalStorage");
}

function mostrarUltimaCotizacion() {
    const cotizacionGuardada = localStorage.getItem("cotizacion");
    if (cotizacionGuardada) {
        const cotizacion = JSON.parse(cotizacionGuardada);
        // Mostrar la información
        fechaRetiro.value = cotizacion.fechaRetiro;
        fechaDevolucion.value = cotizacion.fechaDevolucion;
        tipoVehiculo.selectedOption = cotizacion.tipoVehiculo;
        tipoSeguro.selectedOption = cotizacion.tipoSeguro;
        cantidadDias.value = cotizacion.cantidadDias;
        tarifaDiaria.value = cotizacion.tarifaDiaria;
        totalPagar.value = cotizacion.totalPagar;

    }
}

// Llamada a la función para mostrar la última cotización al cargar la página
window.onload = mostrarUltimaCotizacion;
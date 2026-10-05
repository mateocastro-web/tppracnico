// ==============================
// REGISTRO DE CONDUCTORES
// ==============================

let listaConductores = JSON.parse(localStorage.getItem("listaConductores")) || [];

function guardarConductor() {
    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value;
    let carnet = document.getElementById("carnet").value;
    let seguro = document.getElementById("seguro").value;

    if (nombre === "" || edad === "" || carnet === "" || seguro === "") {
        alert("Completá todos los campos");
        return;
    }

    if (edad < 18) {
        alert("La edad debe ser de 18 años o más");
        return;
    }

    let conductor = {
        nombre: nombre,
        edad: edad,
        carnet: carnet,
        seguro: seguro
    };

    listaConductores.push(conductor);
    localStorage.setItem("listaConductores", JSON.stringify(listaConductores));

    alert("CONDUCTOR GUARDADO");
    limpiarFormularioConductor();
}

function limpiarFormularioConductor() {
    if (document.getElementById("nombre")) {
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("carnet").value = "";
        document.getElementById("seguro").value = "";
    }
}

function mostrarConductores() {
    let div = document.getElementById("resultados_conductores");

    if (!div) {
        return;
    }

    let selectSeguro = document.getElementById("filtroSeguro");
    let selectCarnet = document.getElementById("filtroCarnet");

    let filtroSeguro = selectSeguro ? selectSeguro.value : "TODOS";
    let filtroCarnet = selectCarnet ? selectCarnet.value : "TODOS";

    if (selectSeguro && selectCarnet) {
        if (filtroSeguro !== "TODOS") {
            selectCarnet.disabled = true;
        } else {
            selectCarnet.disabled = false;
        }

        if (filtroCarnet !== "TODOS") {
            selectSeguro.disabled = true;
        } else {
            selectSeguro.disabled = false;
        }
    }

    let listaFiltrada = listaConductores.filter(function(conductor) {
        if (filtroSeguro !== "TODOS") {
            return conductor.seguro === filtroSeguro;
        }

        if (filtroCarnet !== "TODOS") {
            return conductor.carnet === filtroCarnet;
        }

        return true;
    });

    div.innerHTML = "";

    if (listaFiltrada.length === 0) {
        div.innerHTML = "<p class='sin_resultados'>No hay conductores guardados o que coincidan con el filtro.</p>";
        return;
    }

    for (let i = 0; i < listaFiltrada.length; i++) {
        let conductor = listaFiltrada[i];

        div.innerHTML +=
            "<div class='tarjeta'>" +
            "<h2>" + conductor.nombre + "</h2>" +
            "<p><strong>Edad:</strong> " + conductor.edad + "</p>" +
            "<p><strong>Carnet:</strong> " + conductor.carnet + "</p>" +
            "<p><strong>Seguro:</strong> " + conductor.seguro + "</p>" +
            "</div>";
    }
}

function borrarConductores() {
    if (confirm("¿Seguro que querés borrar todos los conductores?")) {
        listaConductores = [];
        localStorage.removeItem("listaConductores");
        mostrarConductores();
        alert("CONDUCTORES BORRADOS");
    }
}


let listaVehiculos = JSON.parse(localStorage.getItem("listaVehiculos")) || [];

function guardarVehiculo() {
    let marca = document.getElementById("marca").value.trim();
    let modelo = document.getElementById("modelo").value.trim();
    let patente = document.getElementById("patente").value.trim().toUpperCase();
    let tipo = document.getElementById("tipo").value;

    if (marca === "" || modelo === "" || patente === "" || tipo === "") {
        alert("Completá todos los campos");
        return;
    }

    let vehiculo = {
        marca: marca,
        modelo: modelo,
        patente: patente,
        tipo: tipo
    };

    listaVehiculos.push(vehiculo);
    localStorage.setItem("listaVehiculos", JSON.stringify(listaVehiculos));

    alert("VEHÍCULO GUARDADO");
    limpiarFormularioVehiculo();
}

function limpiarFormularioVehiculo() {
    if (document.getElementById("marca")) {
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("patente").value = "";
        document.getElementById("tipo").value = "";
    }
}

function mostrarVehiculos() {
    let div = document.getElementById("resultados_vehiculos");

    // Si no estamos en la página de ver vehículos, salir
    if (!div) {
        return;
    }

    let inputMarca = document.getElementById("filtroMarca");
    let selectTipo = document.getElementById("filtroTipo");

    let filtroMarca = inputMarca ? inputMarca.value.trim().toLowerCase() : "";
    let filtroTipo = selectTipo ? selectTipo.value : "TODOS";

    // Manejo de filtros deshabilitados
    if (inputMarca && selectTipo) {
        if (filtroMarca !== "") {
            selectTipo.disabled = true;
        } else {
            selectTipo.disabled = false;
        }

        if (filtroTipo !== "TODOS") {
            inputMarca.disabled = true;
        } else {
            inputMarca.disabled = false;
        }
    }

    let listaFiltrada = listaVehiculos.filter(function(vehiculo) {
        if (filtroMarca !== "") {
            return vehiculo.marca.toLowerCase().includes(filtroMarca);
        }

        if (filtroTipo !== "TODOS") {
            return vehiculo.tipo === filtroTipo;
        }

        return true;
    });

    div.innerHTML = "";

    if (listaFiltrada.length === 0) {
        div.innerHTML = "<p class='sin_resultados'>No hay vehículos guardados o que coincidan con el filtro.</p>";
        return;
    }

    for (let i = 0; i < listaFiltrada.length; i++) {
        let vehiculo = listaFiltrada[i];

        div.innerHTML +=
            "<div class='tarjeta'>" +
            "<h2>" + vehiculo.marca + " " + vehiculo.modelo + "</h2>" +
            "<p><strong>Patente:</strong> " + vehiculo.patente + "</p>" +
            "<p><strong>Tipo:</strong> " + vehiculo.tipo + "</p>" +
            "</div>";
    }
}

function borrarVehiculos() {
    if (confirm("¿Seguro que querés borrar todos los vehículos?")) {
        listaVehiculos = [];
        localStorage.removeItem("listaVehiculos");
        mostrarVehiculos();
        alert("VEHÍCULOS BORRADOS");
    }
}
mostrarConductores();
mostrarVehiculos();
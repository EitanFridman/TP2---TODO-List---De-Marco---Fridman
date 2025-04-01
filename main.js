let botonAgregar = document.querySelector(".boton-crear-tarea");
let contenedorTareas = document.querySelector(".contenedor-tareas");
let contenedorTareasResueltas = document.querySelector(".contenedor-tareas-resueltas");
let botonMasRapida = document.querySelector(".boton-mas-rapida");

let tareas = [];
let tareasResueltas = [];
let idActual = 0;

const crearInput = () => {
    let nuevaTarea = `
    <div class="nueva-tarea">
        <input type="text" id="titulo-nueva-tarea">
        <button class="boton-subir-tarea" onclick="subirTarea()">
            <img src="img/arrow-up.svg" alt="" class="img-subir-tarea">
        </button>
    </div>`;

    contenedorTareas.insertAdjacentHTML('afterbegin', nuevaTarea);
};

botonAgregar.addEventListener("click", () => crearInput());

function subirTarea() {
    let tituloNuevaTarea = document.getElementById('titulo-nueva-tarea').value;

    if (tituloNuevaTarea == "") {
        return;
    }

    let tarea = {
        id: idActual++,
        titulo: tituloNuevaTarea,
        tiempoCreacion: Date.now(),
        tiempoResolucion: null
    };

    tareas.push(tarea);

    traerTareas();
}

function traerTareas() {
    contenedorTareas.innerHTML = "";
    tareas.forEach(tarea => {
        let divTarea = `
        <div class="tarea" id="tarea-${tarea.id}">
            <button class="boton-checkout" onclick="marcarTareaResuelta(${tarea.id})"></button>
            <p>${tarea.titulo} <small>(${new Date(tarea.tiempoCreacion).toLocaleString()})</small></p>
            <button class="boton-eliminar" onclick="eliminarTarea(${tarea.id})">X</button>
        </div>`;
        contenedorTareas.insertAdjacentHTML('afterbegin', divTarea);
    });
}

function marcarTareaResuelta(id) {
    let tareaResuelta = tareas[id];
    tareaResuelta.tiempoResolucion = Date.now();
    tareasResueltas.push(tareaResuelta);
    tareas.splice(id, 1);

    traerTareas();
    mostrarTareasResueltas();
}

function mostrarTareasResueltas() {
    contenedorTareasResueltas.innerHTML = "";
    tareasResueltas.forEach(tarea => {
        let tiempoResolucion = ((tarea.tiempoResolucion - tarea.tiempoCreacion) / 1000).toFixed(2);
        let divTarea = `
        <div class="tarea tarea-resuelta">
            <p>${tarea.titulo} <small>(${new Date(tarea.tiempoResolucion).toLocaleString()})</small> - Tiempo: ${tiempoResolucion} seg</p>
        </div>`;
        contenedorTareasResueltas.insertAdjacentHTML('afterbegin', divTarea);
    });
}

function tareaMasRapida() {
    if (tareasResueltas.length === 0) {
        alert("No hay tareas resueltas aún.");
        return;
    }
    let tareaMasRapida = tareasResueltas[0];
    for (let i = 1; i < tareasResueltas.length; i++) {
        let tiempoA = tareasResueltas[i].tiempoResolucion - tareasResueltas[i].tiempoCreacion;
        let tiempoB = tareaMasRapida.tiempoResolucion - tareaMasRapida.tiempoCreacion;
        if (tiempoA < tiempoB) {
            tareaMasRapida = tareasResueltas[i];
        }
    }
    let tiempoResolucion = ((tareaMasRapida.tiempoResolucion - tareaMasRapida.tiempoCreacion) / 1000).toFixed(2);
    alert("La tarea más rápida fue \"" + tareaMasRapida.titulo + "\" con un tiempo de " + tiempoResolucion + " segundos.");
}

function eliminarTarea(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas.splice(i, 1);
            break;
        }
    }
    traerTareas();
}
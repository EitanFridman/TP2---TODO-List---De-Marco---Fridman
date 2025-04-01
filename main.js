let botonAgregar = document.querySelector(".crear-tarea");
let contenedorTareas = document.querySelector(".contenedor-tareas");
let contenedorTareasResueltas = document.querySelector(".contenedor-tareas-resueltas");

let tareas = [];

const crearInput = () => {
    let nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("nuevaTarea");

    let inputTarea = document.createElement("input");
    inputTarea.type = "text";
    inputTarea.classList.add("tituloNuevaTarea");

    let botonSubir = document.createElement("button");
    botonSubir.classList.add("subirTarea");
    botonSubir.textContent = "Agregar";

    nuevaTarea.appendChild(inputTarea);
    nuevaTarea.appendChild(botonSubir);
    contenedorTareas.prepend(nuevaTarea);

    botonSubir.addEventListener("click", () => subirTarea(inputTarea.value));
};

botonAgregar.addEventListener("click", crearInput);

function subirTarea(titulo) {
    if (!titulo.trim()) return;

    let timestamp = Date.now();

    const tarea = {
        titulo: titulo,
        creada: timestamp,
        resuelta: null
    };

    tareas.push(tarea);
    renderizarTareas();
}

function renderizarTareas() {
    contenedorTareas.innerHTML = "";
    contenedorTareasResueltas.innerHTML = "";

    tareas.forEach((tarea, index) => {
        let divTarea = document.createElement("div");
        divTarea.classList.add("tarea");

        let botonCheckout = document.createElement("button");
        botonCheckout.classList.add("checkout");
        botonCheckout.textContent = tarea.resuelta ? "\u2713" : "Tachar";  // u2713 es un tick
        botonCheckout.addEventListener("click", () => marcarTareaResuelta(index));

        let p = document.createElement("p");
        p.textContent = `${tarea.titulo} - Creada: ${new Date(tarea.creada).toLocaleString()}`;

        divTarea.appendChild(botonCheckout);
        divTarea.appendChild(p);

        if (tarea.resuelta) {
            let tiempoResuelto = document.createElement("p");
            tiempoResuelto.textContent = `Resuelta: ${new Date(tarea.resuelta).toLocaleString()}`;
            divTarea.appendChild(tiempoResuelto);
            contenedorTareasResueltas.appendChild(divTarea);
        } else {
            contenedorTareas.appendChild(divTarea);
        }
    });
}

function marcarTareaResuelta(index) {
    if (!tareas[index].resuelta) {
        tareas[index].resuelta = Date.now();
    }
    renderizarTareas();
}

function tareaMasRapida() {
    let tareasResueltas = tareas.filter(t => t.resuelta);
    
    if (tareasResueltas.length === 0) {
        alert("No hay tareas resueltas.");
        return;
    }

    let tareaRapida = tareasResueltas.reduce((min, tarea) => {
        let tiempo = tarea.resuelta - tarea.creada;
        return tiempo < (min.resuelta - min.creada) ? tarea : min;
    });

    alert(`La tarea más rápida fue "${tareaRapida.titulo}", realizada en ${(tareaRapida.resuelta - tareaRapida.creada) / 1000} segundos.`);
}

// Boton para ver la tarea más rápida
let botonMasRapida = document.createElement("button");
botonMasRapida.textContent = "Tarea más rápida";
botonMasRapida.addEventListener("click", tareaMasRapida);
document.body.appendChild(botonMasRapida);

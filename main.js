let botonAgregar = document.querySelector(".crear-tarea");

let contenedorTareas = document.querySelector(".contenedor-tareas");

let tareas = [];
let tareasResueltas = [];

const crearInput = () =>{
    let nuevaTarea = `
    <div class="nuevaTarea">
        <input type="text" id="tituloNuevaTarea">
        <button class="subirTarea" onclick="subirTarea()"><img src="img/arrow-up.svg" alt=""></button>
    </div>`;

    let botonSubir = document.querySelector(".subirTarea");

    contenedorTareas.insertAdjacentHTML('afterbegin', nuevaTarea);
}

botonAgregar.addEventListener("click", () => crearInput());

function subirTarea () {

    let tituloNuevaTarea = document.getElementById('tituloNuevaTarea').value;

    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);

    const tarea = {
        fecha: today.toDateString(),
        titulo: tituloNuevaTarea
    }

    tareas.push(tarea);

    traerTareas();

}

function traerTareas () {

    contenedorTareas.innerHTML = ``;

    tareas.forEach(tarea => {
        let divTarea = `
        <div class="tarea">
            <button class="checkout" onclick="marcarTareaResuelta()" id="${tareas.indexOf(tarea)}"></button>
            <p>${tarea.titulo}</p>
        </div>`;

        contenedorTareas.insertAdjacentHTML('afterbegin', divTarea  );

    })
}

function marcarTareaResuelta () {

}
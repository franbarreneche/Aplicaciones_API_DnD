window.addEventListener('load',iniciar);

//registro de los listeners del DnD, el input y el boton reiniciar
function iniciar() {
    var zona = document.getElementById('zonaArrastre');
    zona.addEventListener('drop',manejadorDrop);
    zona.addEventListener('dragenter',manejadodrDragEnter);
    zona.addEventListener('dragleave',manejadorDragLeave);
    zona.addEventListener('dragover',manejadorDragOver);
    var input = document.getElementById('inputArchivos');
    input.addEventListener('input',manejadorInputArchivos);
    var reiniciar = document.getElementById('reiniciar');
    reiniciar.addEventListener('click',manejadorBotonReiniciar);
}

//implementaciones de los listeners del DnD
function manejadorDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('zonaArrastre').classList.remove('is-primary');    

    if (event.dataTransfer.files.length > 0) {
        mostrarInfoDeArchivos(event.dataTransfer.files);
    }
    else {
        alert("Tiene que traer un archivo de su computadora");
        return;
    }

}

function manejadodrDragEnter(event) {
    event.dataTransfer.dropEffect = 'copy';
    document.getElementById('zonaArrastre').classList.add('is-primary');
    console.log("dragenter");
}

function manejadorDragLeave(event) {

    document.getElementById('zonaArrastre').classList.remove('is-primary');
    console.log("dragleave");
}

function manejadorDragOver(event) {
    event.preventDefault();    
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    document.getElementById('zonaArrastre').classList.add('is-primary');
    console.log("dragOver");
}

//implementacion del listener del boton reiniciar
function manejadorBotonReiniciar() {
    var listaArchivos = document.getElementById('listaArchivos');
    listaArchivos.querySelectorAll('*').forEach(n => n.remove());
}

//implementacion listener del input de archivos
function manejadorInputArchivos() {    
    var inputArchivos = document.getElementById('inputArchivos');
    if(inputArchivos.files.length > 0 ) {
        mostrarInfoDeArchivos(inputArchivos.files);
    }
}

//funcion que recibe una lista de archivos, los filtra y genera los elementos visuales con su informacion
function mostrarInfoDeArchivos(archivos) {
    //if (file.type contains "image" or contains "pdf" ) alert("no son soportados")
    var listaInfoDeArchivos = document.getElementById('listaArchivos');
    for (var i = 0; i < archivos.length; i++) {
        var nuevoRecuadroInfoArchivo = generarBox(archivos[i]);
        listaInfoDeArchivos.appendChild(nuevoRecuadroInfoArchivo);
    }
}

//funcion auxiliar que genera un elemento grafico con la info del archivo
function generarBox(archivo) {
    var titulo = document.createElement("h4");
    titulo.classList.add("title","is-3");
    titulo.innerHTML = archivo.name;
    var mensaje = document.createElement("div");
    mensaje.classList.add("message-body");
    mensaje.innerHTML = "Tipo de Archivo: "+archivo.type + " | Tamaño: "+archivo.size/1000+"kb.";

    var boton = document.createElement("button");
    boton.classList.add("button","is-danger");
    boton.innerHTML = "Eliminar";
    boton.addEventListener('click',eliminarBox);
    
    var box = document.createElement("div");
    box.id=archivo.name;    
    box.classList.add("box");
    box.appendChild(titulo);
    box.appendChild(mensaje);
    box.appendChild(boton)
    return box;
}

//listener que eliminar los elementos graficos con la info de los archivos
function eliminarBox(event) {    
    event.target.parentNode.remove();
}




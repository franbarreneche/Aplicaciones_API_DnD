window.addEventListener('load',iniciar);

//registro de los listeners del DnD y el input
function iniciar() {
    var zona = document.getElementById('zonaArrastre');
    zona.addEventListener('drop',manejadorDrop);
    zona.addEventListener('dragenter',manejadodrDragEnter);
    zona.addEventListener('dragleave',manejadorDragLeave);
    zona.addEventListener('dragover',manejadorDragOver);
    var input = document.getElementById('inputArchivos');
    input.addEventListener('input',manejadorInputArchivos);
}

//implementaciones de los listeners del DnD
function manejadorDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('zonaArrastre').classList.remove('is-primary');
    var listaArchivos = document.getElementById('listaArchivos');
    //encontrar el archivo
    if (event.dataTransfer.files.length > 0) {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            var nuevoArchivo = generarBox(event.dataTransfer.files[i]);
            listaArchivos.appendChild(nuevoArchivo);
        }
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

//implementacion listener del input de archivos
function manejadorInputArchivos() {
    console.log("se eejcuto el input de archivo");
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




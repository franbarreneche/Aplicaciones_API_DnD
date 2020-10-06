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
}

function manejadorDragLeave(event) {
    document.getElementById('zonaArrastre').classList.remove('is-primary');
}

function manejadorDragOver(event) {
    event.preventDefault();    
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    document.getElementById('zonaArrastre').classList.add('is-primary');
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
    var archivosPermitidos = ["txt","json","html","xml","jpg","png","gif","docx","xlsx","pptx","pdf"];
    var listaInfoDeArchivos = document.getElementById('listaArchivos');
    for (var i = 0; i < archivos.length; i++) {
        var archivo = archivos[i];
        var extension = getExt(archivo.name);
        if(archivosPermitidos.includes(extension[0])) {
            var nuevoRecuadroInfoArchivo = generarBox2(archivo,extension);
            listaInfoDeArchivos.appendChild(nuevoRecuadroInfoArchivo);
        }
        else alert('El archivo '+archivo.name+' no es de un formato permitido');
    }
}


//listener que eliminar los elementos graficos con la info de los archivos
function eliminarBox(event) {    
    event.target.parentNode.parentNode.remove();
}

//funcion auxiliar que genera un elemento grafico con la info del archivo
function generarBox2(archivo,extension) {
    var titulo = document.createElement("p");
    titulo.classList.add("has-text-weight-semibold","is-size-6");
    titulo.innerHTML = archivo.name;

    var listaDatos = document.createElement('ul');
    listaDatos.classList.add("is-size-6");
    var tipo = document.createElement('li');
    tipo.innerHTML = "Tipo: "+archivo.type;
    var tamanio = document.createElement('li');
    tamanio.innerHTML = "Tamaño: "+archivo.size/1000+"KB";
    var fechaModificacion = document.createElement('li');
    fechaModificacion.innerHTML = "Fecha Modificación: "+archivo.lastModifiedDate;
    listaDatos.appendChild(tipo);
    listaDatos.appendChild(tamanio);
    listaDatos.appendChild(fechaModificacion);

    var boton = document.createElement("button");
    //boton.classList.add("button","is-danger","is-small");
    boton.classList.add("delete");
    boton.innerHTML = "Eliminar";
    boton.addEventListener('click',eliminarBox);

    var contenido = document.createElement("div");
    contenido.classList.add("content");
    contenido.appendChild(titulo);
    contenido.appendChild(listaDatos);
    //si el archivo es de texto, entonces mostramos sus primeras 2 lineas
    if(archivo.type.includes('text') || archivo.type.includes('json')) {
        var fr = new FileReader();
        var texto = document.createElement('code');
        fr.onload=function() {            
            texto.innerHTML = fr.result.substring(0,150) + "...";            
        }
        fr.readAsText(archivo);         
        contenido.appendChild(texto);
    }
    

    var contenidoMedia = document.createElement("div");
    contenidoMedia.classList.add("media-content");
    contenidoMedia.appendChild(contenido);

    var imagen = document.createElement("img");
    var origen = "img/placeholder.png";
    if(archivo.type.includes('image')){
        origen = URL.createObjectURL(archivo);
    }else origen = "img/"+extension+".png";
    imagen.src = origen;
    imagen.alt ="Alternativo";

    var figure = document.createElement("figure");
    figure.classList.add("image","imagen150");
    figure.appendChild(imagen);

    var media = document.createElement("div");
    media.classList.add("media");
        
    media.appendChild(figure);
    media.appendChild(contenidoMedia);
    media.appendChild(boton);

    //el box propiamente
    var div = document.createElement("div");
    div.classList.add("box");    
    div.appendChild(media);
    return div;
}

//funcion auxiliar que retorna la extension del archivo
function getExt(path){
    return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1): 'null';
}



console.log("Esperando a que el botón sea pulsado.......");

//-- Leer el elemento del botón.
const imprime = document.getElementById('Print');

// Obtener el elemento del párrafo para introducir mensaje.
const parrafo = document.getElementById('parrafo');

//-- Funcion de retrollamada de la pulsación del párrafo
imprime.onclick = () => {
    console.log(" ¡Has entrado en la NAVE DEL MISTERIO! ");

    parrafo.innerHTML(' ¡HAS ENTRADO EN EL CONCURSO DE LA TV ');
}

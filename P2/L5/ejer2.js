console.log("Esperando a que el botón sea pulsado.......");

//-- Leer el id del botón.
const imprime = document.getElementById('Print');

// Cargar el párrafo.
const parrafo = document.getElementsByTagName('P');

//-- Funcion de retrollamada de la pulsación del párrafo
imprime.onclick = () => {
    console.log(" ¡Has entrado en la NAVE DEL MISTERIO! ");

    parrafo.innerHTML(' ¡HAS ENTRADO EN EL CONCURSO DE LA TV ');
}

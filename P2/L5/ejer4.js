console.log("Esperando a que el botón sea pulsado.......");

//-- Leer el elemento del botón 1.
const boton1 = document.getElementById('b1');

//-- Leer el elemento del botón 2.
const boton2 = document.getElementById('b2');

// Obtener el elemento del párrafo para introducir mensaje.
const parrafo = document.getElementById('parrafo');

//-- Funcion de retrollamada del botón 1.
boton1.onclick = () => {
    console.log(" ¡Has entrado en la NAVE DEL MISTERIO! ");

    parrafo.innerHTML = 1;
}

//-- Funcion de retrollamada del botón 2.
boton2.onclick = () => {
    console.log(" ¡Has entrado en la NAVE DE LA COMEDIA! ");

    parrafo.innerHTML = 2;
}
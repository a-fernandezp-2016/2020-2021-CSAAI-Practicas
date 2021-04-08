console.log("Esperando a que el botón sea pulsado.......");

//-- Obtener el párrafo
const imprime = document.getElementById('Print');

//-- Funcion de retrollamada de la pulsación del párrafo
imprime.onclick = () => {
    console.log(" ¡Has entrado en la NAVE DEL MISTERIO! ");
}
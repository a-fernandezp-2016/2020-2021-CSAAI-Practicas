console.log("Esperando a que el botón sea pulsado.......");

//-- Obtener el párrafo
const imprime = document.getElementById('Print');

//-- Funcion de retrollamada de la pulsación del párrafo
imprime.onclick = () => {

    // Variable contador.
    var cont = 0;

    // Condicionante.
    if (cont == 0)
    {
        console.log(" ¡Has entrado en la NAVE DEL MISTERIO! ");
        var cont = 1;
    }
    else
    {
        console.log(" ¡Has entrado en la NAVE DE LA COMEDIA! ");
    }
}
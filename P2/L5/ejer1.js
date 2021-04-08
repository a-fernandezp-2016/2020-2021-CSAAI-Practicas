console.log("Esperando a que el botón sea pulsado.......");

//-- Obtener el párrafo
const imprime = document.getElementById('Print');

// Variable contador.
let cont = true;

//-- Funcion de retrollamada de la pulsación del párrafo
imprime.onclick = () => {

    // Condicionante.
    if (cont == true)
    {
        console.log(" ¡Has entrado en la NAVE DEL MISTERIO! ");
        let cont = false;
    }
    else
    {
        console.log(" ¡Has entrado en la NAVE DE LA COMEDIA! ");
        let cont = true;
    }
}
console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 
 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

//-- Función de retrollamada de los digitos
function digito(ev)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;

    } else {
       
        if(estado == ESTADO.OP1)
        {
            //--En cualquier otro estado lo añadimos
            display.innerHTML += ev.target.value;

            //-- Pasar al siguiente estado
            estado = ESTADO.OPERATION;
        }
        else
        {
            //--En cualquier otro estado lo añadimos
            display.innerHTML += ev.target.value;

            //-- Pasar al siguiente estado
            estado = ESTADO.OP2;
        }
    } 
    
}

//-- Obtener una colección con todos los elementos
//-- de la clase digito
digitos = document.getElementsByClassName("digito")

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {

    //-- Se ejecuta cuando se pulsa un boton
    //-- que es un dígito. Para que el código sea 
    //-- mas legible la función de retrollamada se
    //-- escribe como una función normal (digito)
    boton.onclick = digito;
}

//-------- Resto de funciones de retrollamada

//-- Operación de sumar
suma.onclick = (ev) => {

    if(estado == ESTADO.OP1)
    {
        //-- Insertar simbolo de sumar
        display.innerHTML += ev.target.value;

        //-- Pasar al siguiente estado.
        estado = ESTADO.OPERATION;
    }
    else
    {
        display.innerHTML = "ERROR! Botón incorrecto."
        console.log("ERROR! Botón incorrecto.");
        display.innerHTML = "0";
        estado = ESTADO.INIT;
    }
}

//-- Evaluar la expresion
igual.onclick = () => {

    if(estado == ESTADO.OP2)
    {
        //-- Calcular la expresión y añadirla al display
        display.innerHTML = eval(display.innerHTML);

        //-- Pasar al estado final de op1.
        estado = ESTADO.OP1;
    }
    else
    {
        display.innerHTML = "ERROR! Botón incorrecto."
        console.log("ERROR! Botón incorrecto.");
        display.innerHTML = "0";
        estado = ESTADO.INIT;
    }
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
    display.innerHTML = "0";
    estado = ESTADO.INIT;
}
// Hecho por: Alejandro Fernández Pérez.

// Punto de inicio en el depurador del navegador.
console.log("Arranca la Calculadora Web.....");

// Crear un elemento display a partir del ID display.
display = document.getElementById("display")
// Obtener el array con todos los elementos de la clase operador, que son 4 tipos.
operadores = document.getElementsByClassName("operador");
//-- Obtener el array con todos los elementos de la clase digito, que son 10 nº.
numeros = document.getElementsByClassName("digito");

// Momento/Fase en que estas de la calculadora:
// Momento/Fase 0: inicial, no has metido nada.
// Momento/Fase 1: 1º operando.
// Momento/Fase 2: operador.
// Momento/Fase 3: 2º operando.
// Con todos esos momentos ya puedes dar a =.
// Si metes otro nº, se mantiene en la fase 3.
// Cuando pulsas =, va a la fase 1.
const MOMENTO = {
  INIT: 0,
  OP1: 1,
  OPER: 2,
  OP2: 3,
}

// Variable de la fase inicial.
let fase = MOMENTO.INIT;

//-- Función de retrollamada de los botones
//-- de la función digito donde se procesan las operaciones.
function digito(ev)
{
    // Empezamos comprobando, con el estado o momento inicial.
    if(fase == MOMENTO.INIT)
    {
      // Escribimos en la pantalla.
      display.innerHTML = ev.target.value;
      // Pasamos al siguiente estado.
      fase = MOMENTO.OP1;
      // Ponemos un mensaje en consola, para avisar.
      console.log(fase,"Ahora estas en el operador 1");
    }
    else if(fase == MOMENTO.OP1 || fase == MOMENTO.OP2 || fase == MOMENTO.OPER)
    {
      // Escribimos en la pantalla a continuación de lo anterior.
      display.innerHTML += ev.target.value;
      // Entra sólo cuando se haya escrito el operador.
      if(fase == MOMENTO.OPER)
      {
        // Pasamos al siguiente estado.
        fase = MOMENTO.OP2;
        // Ponemos un mensaje en consola, para avisar.
        console.log(fase,"Ahora estas en el operando 2.");
      }
      else
      {
        // Ponemos un mensaje en consola, para avisar.
        console.log(fase,"Sigues en la fase 1.");
      }
    }
}

// Para pulsar uno de los 10 digitos o nº que componen la calculadora web.
for (let boton of numeros) {
  //-- Al pulsar un dígito, se accede a la function digito.
  boton.onclick = digito;
}

// Al pulsar un operador.
for (let operador of operadores) {
  operador.onclick = (ev) => {
      if(fase == MOMENTO.OP1)
      {
        // Escribimos en la pantalla a continuación de lo anterior.
        display.innerHTML += ev.target.value;
        // Pasamos al siguiente estado.
        fase = MOMENTO.OPER;
        // Ponemos un mensaje en consola, para avisar.
        console.log(fase,"Ahora estas en el operador");
      }
      else
      {
        // Ponemos un mensaje en consola, para avisar.
        console.log(fase,"Todavía no es momento para pulsar a un operador.");
      }
  }
}
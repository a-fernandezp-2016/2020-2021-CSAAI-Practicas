// Hecho por: Alejandro Fernández Pérez.

console.log("Arranca la Calculadora Web.....");

// Crear un elemento display (y guardarlo como cte) a partir del ID display.
const display = document.getElementById("display")

// Cte del array de los 10 nº, a partir de la clase digito.
const numeros = document.getElementsByClassName("digito");
// Cte del array de los operadores, a partir de la clase operador.
const operadores = document.getElementsByClassName("operador");

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
};

// Variable de la fase inicial.
var fase = MOMENTO.INIT;

// Acciones de la calculadora (pulsando botones).

// Pulsando 1 de los 10 nº.
for (let boton of numeros) {
  //-- Establecer la funcion de llamada del boton del 0 al 9.
  //-- El parámetro ev.target contiene el boton
  //-- que ha recibido el click, y por el valor "value".
  boton.onclick = (ev) => {
    digito(ev.target.value);
  }
}

//-- Función de retrollamada de los botones
//-- de la función digito donde se procesan las operaciones.
function digito(value)
{
    // Empezamos comprobando, con el estado o momento inicial.
    if(fase = MOMENTO.INIT)
    {
      // Escribimos en la pantalla.
      display.innerHTML = value;
      // Pasamos al siguiente estado.
      fase = MOMENTO.OP1;
      // Ponemos un mensaje en consola, para avisar.
      console.log(fase,"Ahora estas en el operador 1");
    }
    else if(fase == MOMENTO.OP1 || fase == MOMENTO.OP2 || fase == MOMENTO.OPER)
    {
      // Escribimos en la pantalla a continuación de lo anterior.
      display.innerHTML += value;
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
        console.log(fase,"Ahora estas en el operando");
      }
  }
}
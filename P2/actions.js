// Hecho por: Alejandro Fernández Pérez.

// Empezamos con la función start.
function start() {
  // Mensaje de inicio de ejecución en consola.
  console.log("Página cargada....");
  console.log("Ejecutando Calculadora HUAWEI con seguridad");
}

// Crear un elemento display a partir del ID display.
display = document.getElementById("display")
// Crear un elemento igual a partir del ID igual.
igual = document.getElementById("igual")
// Crear un elemento para resetear la pantalla a 0 a partir del ID AC.
clear = document.getElementById("clear")
// Crear un elemento para borrar ultimo caracter a partir del ID DEL.
deletLast = document.getElementById("delete_lastChar");
// Crear un elemento array de los 10 nº, a partir de la clase digito.
numeros = document.getElementsByClassName("digito");
// Crear un elemento array de los operandos, a partir de la clase operacion.
operandos = document.getElementsByClassName("operacion");

// Momento/Fase en que estas de la calculadora:
// Momento/Fase 0: inicial, no has metido nada.
// Momento/Fase 1: 1º operando.
// Momento/Fase 2: operador.
// Momento/Fase 3: 2º operando.
// Momento/Fase 4: resultado. Este es dandole a igual, no aparece en la estructura de const
// porque es la misma que la fase 1 en verdad, ya que el resultado es 1 nº solo.
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
    if(fase = MOMENTO.INIT)
    {
      display.innerHTML = ev.target.value;
      fase = MOMENTO.OP1;
      console.log(fase,"Ahora estas en el operador 1");
    }
    else if(fase == MOMENTO.OP1 || fase == MOMENTO.OP2 || fase == MOMENTO.OPER)
    {
      display.innerHTML += ev.target.value;
      if(fase == MOMENTO.OPER)
      {
        fase = MOMENTO.OP2;
        console.log(fase,"Ahora estas en el operador 2");
      }
    }
}

// Acciones de la calculadora (pulsando botones).

// Pulsando 1 de los 10 nº.
for (i=0; i<numeros.length; i++) {
  //-- Establecer la funcion de llamada del boton del 0 al 9.
  //-- El parámetro ev.target contiene el boton
  //-- que ha recibido el click, y por el valor "value".
  numeros[i].onclick = (ev) => {
    digito(ev.target.value);
  }
}
// Pulsando un operando.
for (j=0; j<operandos.length; j++) {
  operandos[j].onclick = (ev) => {
      if(fase == MOMENTO.OP1)
      {
        display.innerHTML += ev.target.value;
        fase = MOMENTO.OPER;
        console.log(fase,"Ahora estas en el operando");
      }
  }
}
// Pulsando el botón igual.
igual.onclick = (ev) => {
  if(fase == MOMENTO.OP1 || fase == MOMENTO.OP2)
  {
    display.innerHTML = eval(display.innerHTML);
    fase = MOMENTO.OP1;
    console.log(fase,"Ahora estas en la FASE DE RESULTADO 4");
  }
}
//-- Pulsando el DEL para borrar el último caracter.
deletLast.onclick = (ev) => {
  display.innerHTML = display.innerHTML.slice(0,-1);
  console.log(fase,"Reduciendo....");
}

//-- Pulsando el AC para resetear el display a 0.
clear.onclick = (ev) => {
  display.innerHTML = "0";
  fase = MOMENTO.INIT;
  console.log(fase,"Ahora estas en el Estado Inicial");
}
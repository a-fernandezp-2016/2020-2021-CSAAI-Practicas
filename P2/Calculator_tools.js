// Hecho por: Alejandro Fernández Pérez.

function start() {
  // Mensaje de inicio de ejecución en consola.
  console.log("Página cargada....");
  console.log("Ejecutando Calculadora HUAWEI con seguridad");
}

// Fase en que estas de la calculadora:
// Fase 0: inicial, no has metido nada.
// Fase 1: 1º operando.
// Fase 2: operador.
// Fase 3: 2º operando.
// Fase 4: resultado. Este es dandole a igual, no aparece en la estructura de const
// porque es la misma que la fase 1 en verdad, ya que el resultado es 1 nº solo.
const FASES = {
    INIT: 0,
    OP1: 1,
    OPER: 2,
    OP2: 3,
}

// Asignar la clase de los números a una variable o array de numeros.
let numeros = document.getElementsByClassName("digito")
// Asignar el id del display a la variable del display.
let display = document.getElementById("display")
// Asignar la clase de los operandos a una variable o array operandos.
let operandos = document.getElementsByClassName("operacion")
// Asignar el id de igual a la variable del igual.
let igual = document.getElementById("igual")

// Variable de la fase inicial.
let fase = FASES.INIT;

//-- Función de retrollamada de los botones
//-- de la función digito donde se procesan las operaciones.
function digito(boton)
{
    if(fase = FASES.INIT)
    {
      display.innerHTML = boton;
      fase = FASES.OP1;
      console.log(fase,"Ahora estas en el operador 1");
    }
    else if(fase == FASES.OP1 || fase == FASES.OP2 || fase == FASES.OPER)
    {
      display.innerHTML += boton;
      if(fase == FASES.OPER)
      {
        fase = FASES.OP2;
        console.log(fase,"Ahora estas en el operador 2");
      }
    }
}
// Realización de la expresión igual.
igual.onclick = (ev) => {
  if(fase == FASES.OP1 || fase == FASES.OP2)
  {
    display.innerHTML = eval(display.innerHTML);
    fase = FASES.OP1;
    console.log(fase,"Ahora estas en la FASE DE RESULTADO 4");
  }
}

// Bucle que recorre todos los operandos y pasa al siguiente estado
// del OP1 al OPER.
for (j=0; j<operandos.length; j++) {
  operandos[j].onclick = (ev) => {
      if(fase == FASES.OP1)
      {
        display.innerHTML += ev.target.value;
        fase = FASES.OPER;
        console.log(fase,"Ahora estas en el operando");
      }
  }
}

// Bucle que recorre todos los nº del 0 al 9 y saca como valor a la funcion digito
// al que se le haya hecho click.
for (i=0; i<numeros.length; i++) {

    //-- Establecer la funcion de llamada del boton del 0 al 9.
    //-- El parámetro ev.target contiene el boton
    //-- que ha recibido el click, y por el valor "value".
    numeros[i].onclick = (ev) => {
      digito(ev.target.value);
    }
  }
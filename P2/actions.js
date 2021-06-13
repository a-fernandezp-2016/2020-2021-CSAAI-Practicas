// Hecho por: Alejandro Fernández Pérez.

// Punto de inicio en el consola del navegador.
console.log("Arranca la Calculadora Huawei Web.....");
console.log("Esperando a utilizarse....");
// Mensaje-recordatorio de donde empiezas.
console.log("Al ejecutar la pag HTML de la calculadora Huawei Web, empiezas en la fase 0: inicial");

// Crear un elemento display a partir del ID display.
display = document.getElementById("display")
// Obtener el array con todos los elementos de la clase operador, que son 4 tipos.
operadores = document.getElementsByClassName("operador");
//-- Obtener el array con todos los elementos de la clase digito, que son 10 nº.
numeros = document.getElementsByClassName("digito");
// Crear un elemento igual, para dar la solucion a la operación mostrada en display, a partir del ID igual.
igual = document.getElementById("igual");
// Crear un elemento para reiniciar el display o pantalla a 0, mostrando el 0,
// a partir del ID clear.
clear = document.getElementById("clear");
// Crear un elemento para borrar el último nº o carácter del display o pantalla,
// empezando por la derecha, a partir del ID del.
del = document.getElementById("del");
// Crear un elemento para calcular el porcentaje de un nº a partir del ID percien.
porcentaje = document.getElementById("percien");

// Estados o momentos de la calculadora en una cte Momento.
// Momento/Fase en que estás, de la calculadora:
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

// Variable que cuenta los nº que hay en el operando 2.
let numOp2 = 0;

//-- La función digito es una función donde se procesan las operaciones con los
// dígitos, en cada momento o cada fase.
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
      console.log(fase,"Ahora estas en la fase 1: operando 1.");
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
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Ahora estas en la fase 3: operando 2.");
        // Inicializamos a 1 la variable que cuenta los nº que hay en el operando 2.
        numOp2 = 1;
      }
      else if(fase == MOMENTO.OP1)
      {
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Sigues en la fase 1: operando 1.");
      }
      else if(fase == MOMENTO.OP2)
      {
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Sigues en la fase 3: operando 2.");
        // Incrementamos la variable que cuenta los nº que hay en el operando 2.
        numOp2 += 1;
      }
    }
}

// Al pulsar un dígito de los 10 digitos o nº que componen la calculadora Huawei web.
for (let boton of numeros) {
  // Al pulsar, accedemos a la función digito.
  boton.onclick = digito;
}

// Al pulsar un botón de los operadores.
for (let operador of operadores) {
  operador.onclick = (ev) => {
      if(fase == MOMENTO.OP1)
      {
        // Escribimos en la pantalla a continuación de lo anterior.
        display.innerHTML += ev.target.value;
        // Pasamos al siguiente estado.
        fase = MOMENTO.OPER;
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Ahora estas en la fase 2: operador");
      }
      else
      {
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"PROCESO NO VÁLIDO, LO SIENTO");
      }
  }
}

// Al pulsar el botón igual, nos da el resultado final de la operación.
igual.onclick = () => {
  if(fase == MOMENTO.OP1 || fase == MOMENTO.OP2)
  {
    // Evaluamos lo que hay en pantalla o display con función eval(). 
    // Y sobreescribimos lo que hay en dicha pantalla o display 
    // con el resultado final de la operación evaluada.
    display.innerHTML = eval(display.innerHTML);
    // Pasamos a la fase 1.
    fase = MOMENTO.OP1;
    // Ponemos un mensaje en consola del navegador, para avisar.
    console.log(fase,"Ahora estas en la fase 1: operando 1");
  }
  else
  {
    // Ponemos un mensaje en consola del navegador, para avisar.
    console.log(fase,"PROCESO NO VÁLIDO, LO SIENTO");
  }
}

// Al pulsar el botón de AC, para reiniciar a 0, mostrando el 0.
clear.onclick = (ev) => {
  // Reiniciar el display o pantalla a 0, mostrando el 0.
  display.innerHTML = ev.target.value;
  // Pasamos a la fase 0.
  fase = MOMENTO.INIT;
  // Ponemos un mensaje en consola del navegador, para avisar.
  console.log(fase,"Ahora estas en la fase 0: inicial");
}

// Al pulsar el botón de DEL, borras el último nº o carácter del display,
// empezando por la derecha.
del.onclick = () => {
  // Borrar el último nº o carácter del display, empezando por la derecha.
  display.innerHTML = display.innerHTML.slice(0,-1);
  // Procedimiento que opera según en qué fase se encuentre.
  switch(fase) 
  {
    case MOMENTO.INIT:
      // Ponemos un mensaje en consola del navegador, para avisar.
      console.log(fase,"Sigues en la fase 0: inicial.");
      break;

    case MOMENTO.OP1:
      if(display.innerHTML == "")
      {
        // Pasamos a la fase 0.
        fase = MOMENTO.INIT;
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Ahora estas en la fase 0: inicial");
      }
      else
      {
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Sigues en la fase 1: operando 1.");
      }
      break;

    case MOMENTO.OPER:
      // Pasamos a la fase 1.
      fase = MOMENTO.OP1;
      // Ponemos un mensaje en consola del navegador, para avisar.
      console.log(fase,"Ahora estas en la fase 1: operando 1");
      break;

    case MOMENTO.OP2:
      // Decrementamos la variable que cuenta los nº que hay en el operando 2.
      numOp2 -= 1;
      if(numOp2 == 0)
      {
        // Cambio fase.
        fase = MOMENTO.OPER;
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Ahora estas en la fase 2: operador");
      }
      else
      {
        // Ponemos un mensaje en consola del navegador, para avisar.
        console.log(fase,"Sigues en la fase 3: operando 2.");
      }
      break;
  }
}

// Al pulsar el %, calcula el porcentaje del OP1 o del OP2, o del resultado final.
porcentaje.onclick = (ev) => {
  if(fase == MOMENTO.OP1 || fase == MOMENTO.OP2)
  {
    // Multiplico el valor del operando 1 por 0.01 y se sobreescribe.
    display.innerHTML *= ev.target.value;
  }
  else
  {
    // Ponemos un mensaje en consola del navegador, para avisar.
    console.log(fase,"PROCESO NO VÁLIDO, LO SIENTO");
  }
}
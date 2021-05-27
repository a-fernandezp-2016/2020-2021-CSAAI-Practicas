// Mensaje de inicio de ejecución en consola.
console.log("Página cargada....");
console.log("Ejecutando Calculadora HUAWEI con seguridad");

// Asignar la clase de los números a una cte.
const numeros = document.getElementsByClassName("digito")

//-- Función de retrollamada de los botones
//-- botones de la clase dígito
function digito(value)
{
  console.log("Valor: " + value);
}

// Para pulsar cualquiera de los números.
for (let numero of numeros) {

    //-- Establecer la funcion de llamada del boton i
    //-- El parámetro ev.target contiene el boton
    //-- que ha recibido el click
    numero.onclick = (ev) => {
      digito(ev.target.value)
    }
  }
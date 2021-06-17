// Aquí empieza el programa, con la consola del Navegador Web.
console.log("Comienza: KICK BLOCKS Game!!!!!!");
// Empezamos en la fase inicial.
console.log("Empezamos en la fase inicial 0...");

// Creamos el elemento canvas, que es la pantalla del videojuego, con el ID canvas.
// Lo almacenamos en la cte pantalla.
const pantalla = document.getElementById("canvas");

// Definimos el tamaño de la pantalla sobre la que jugar o el canvas.
pantalla.width = 550;
pantalla.height = 700;

// Definimos el texto sólido de puntuación, tiempo y vidas.
const texto = pantalla.getContext("2d");
// Definimos la raqueta, en forma de rectángulo.
const raqueta = pantalla.getContext("2d");
// Definimos el objeto bola, en forma de círculo.
const bola = pantalla.getContext("2d");

// Diagrama de estados. Hay 4 estados: 0, 1, 2 y 3.
// El Estado 0 es el inicial, que cambia al Estado 1 cuando pulsamos espacio.
// Después viene el Estado 1, donde empezamos a jugar con 3 vidas. Y cuando no conseguimos
// dar a la bola con la raqueta y se cae para abajo, el Estado cambia al Estado 2,
// donde seguimos jugando, pero con 2 vidas. Si volvemos a NO darle a la bola y se cae abajo,
// perderíamos otra vida más, pasando del Estado 2 al Estado 3, donde seguimos jugando, pero
// con 1 sola vida. En este último Estado, si fallamos, perdemos, GAME OVER, y se reinicia a la
// fase o estado inicial 0.
const ESTADO = {
    INIT: 0,
    SAQUE: 1,
    PLAYING: 2,
    FINAL: 3
}

// Dimensiones raqueta.
let anchoRAQ = 70;
let altoRAQ = 12;

// Definimos variable velocidad del eje x.
let velX = 5;
// Definimos variable posición del eje x.
let posX = 0;
// Definimos la variable fase, para ir cambiando de fase y saber donde estamos.
let fase = ESTADO.INIT;

// Estructuramos el texto sólido.
// De puntuación.
texto.font = "40px Arial";
texto.fillStyle = 'white';
texto.fillText("Puntuación: ",32,80);
//texto.fillText(score, 35,80);
// De vidas.
texto.font = "40px Arial";
texto.fillStyle = 'white';
texto.fillText("Vidas: ",350,80);
//texto.fillText(vidas, 38,80);
// De tiempo.
texto.font = "35px Arial";
texto.fillStyle = 'white';
texto.fillText("Tiempo: ",102,130);

// Delimitación del objeto bola.
bola.beginPath();
    // Creamos el círculo con la función arc(posición x, posición y, radio, ángulo inicial, ángulo final);
    bola.arc(225,430,10,0,2*Math.PI);
    // Rellenamos el rectángulo de blanco.
    bola.fillStyle = 'white';
    // Mostramos el trazo.
    bola.stroke();
    // Mostramos el relleno.
    bola.fill();
bola.closePath();

// Animación de la raqueta a través de la función update.
function update() 
{
  //-- Implementación del algoritmo de animación de la raqueta:
  console.log("Analizando posición de la raqueta....");
  //-- 1) Actualizar posicion de los elementos.
  posX = posX + velX;
  //-- 2) Borrar el canvas.
  raqueta.clearRect(0, 0, pantalla.width, pantalla.height);
  //-- 3) Pintar los elementos en el canvas, delimitando el objeto raqueta.
  raqueta.beginPath();
        // Creamos el rectángulo con la función rect(posición x variable, posición y fija, ancho, alto);
        raqueta.rect(posX, 630, anchoRAQ, altoRAQ);
        //-- Rellenamos el rectángulo de blanco.
        raqueta.fillStyle = 'white';
        // Mostramos el trazo.
        raqueta.stroke();
        // Mostramos el relleno.
        raqueta.fill();
  raqueta.closePath();
  //-- 4) Repetir
  requestAnimationFrame(update);
}

// Al pulsar la tecla ESPACIO, FLECHA DER o FLECHA IZQ.
window.onkeydown = (e) => {
    if(e.key == ' ')
    {

    }
    // Si pulsamos la flecha de la derecha.
    else if(e.keyCode == '39')
    {

    }
    // Si pulsamos la flecha de la izquierda.
    else if(e.keyCode == '37')
    {

    }
}
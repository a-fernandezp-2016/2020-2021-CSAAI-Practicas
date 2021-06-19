// Aquí empieza el programa, con la consola del Navegador Web.
console.log("Comienza: KICK BLOCKS Game!!!!!!");
// Empezamos en la fase inicial.
console.log("Empezamos en la fase inicial 0...");

// Creamos el elemento canvas, que es la pantalla del videojuego, con el ID canvas.
// Lo almacenamos en la cte pantalla.
const pantalla = document.getElementById("canvas");

// Definimos el tamaño de la pantalla sobre la que jugar o el canvas.
pantalla.width = 600;
pantalla.height = 1000;

// Creamos el elemento ID del botón play para poder pulsarlo.
const play = document.getElementById("play");
// Creamos el elemento ID del botón restart para poder pulsarlo.
const restart = document.getElementById("restart");

// Definimos el contenido de la pantalla o canvas para poder dibujar en ello.
const paintIT = pantalla.getContext("2d");

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

// Características de los textos sólidos de arriba de la pantalla.
    // Coordenadas de la puntuación.
    let puntX = 50;
    let puntY = 60;
    // Variable de la puntuación total.
    let score = 0;
    // Coordenadas de las vidas.
    let vidX = 380;
    let vidY = 60;
    // Variable de las vidas totales.
    let vidas = 3;
    // Coordenadas del tiempo.
    let timeX = 50;
    let timeY = 120;
    // Variable tiempo.
    // let timer = ;

// Características de la línea de separación trazada para separar la cabecera del juego en sí.
    // Coordenadas de la separación de la cabecera con el juego en sí.
    let separX = 0;
    let separY = 165;

// Características de la raqueta.
    // Dimensiones raqueta.
    let anchoRAQ = 100;
    let altoRAQ = 25;
    // Definimos las coordenadas de la raqueta.
    let raqX = 275;
    let raqY = 650;
// Definimos las coordenadas de la bola.
let bolaX = 274;
let bolaY = 650;

// Definimos variable velocidad del eje x.
let velX = 5;
// Definimos la variable fase, para ir cambiando de fase y saber donde estamos.
let fase = ESTADO.INIT;

// Definimos la vidas que tiene un jugador.
let vidas = 3;

// Estructuramos el texto sólido.
    // De puntuación.
    paintIT.font = "35px Arial";
    paintIT.fillStyle = 'white';
    paintIT.fillText("Puntuación: ",puntX,puntY);
    //texto.fillText(score, 35,80);
    // De vidas.
    paintIT.font = "35px Arial";
    paintIT.fillStyle = 'white';
    paintIT.fillText("Vidas: ",vidX,vidY);
    //texto.fillText(vidas, 38,80);
    // De tiempo.
    paintIT.font = "35px Arial";
    paintIT.fillStyle = 'white';
    paintIT.fillText("Tiempo: ",timeX,timeY);

// Trazamos la línea de separación: cabecera de textos - juego en sí,
// a través del bucle for. Usando líneas discontinuas.
for(let i=separX; i<600; i += 100)
{
    for(let j=60; j<600; j += 100)
    {
        // Inicio trazo.
        paintIT.beginPath();
        //-- Trazo de la línea horizontal desde el pto inicial al final.
        paintIT.moveTo(i,separY);
        paintIT.lineTo(j, separY);
        // Coloreamos de blanco la línea.
        paintIT.strokeStyle = 'white';
        //-- Le ponemos un tamaño visible al trazo.
        paintIT.lineWidth = 4;
        //-- Mostrar el trazo.
        paintIT.stroke()
        // Final trazo.
        paintIT.closePath()
        // Parte o trazo invisible.
        paintIT.beginPath();
        //-- Trazo de la línea horizontal desde el pto inicial al final.
        paintIT.moveTo(j,separY);
        paintIT.lineTo(j+=40, separY);
        // Coloreamos de blanco la línea.
        paintIT.strokeStyle = 'black';
        //-- Mostrar el trazo.
        paintIT.stroke()
        // Final trazo.
        paintIT.closePath()
    }
}

// // Delimitación del objeto bola.
// paintIT.beginPath();
//     // Creamos el círculo con la función arc(posición x, posición y, radio, ángulo inicial, ángulo final);
//     paintIT.arc(225,430,10,0,2*Math.PI);
//     // Rellenamos el rectángulo de blanco.
//     paintIT.fillStyle = 'white';
//     // Mostramos el trazo.
//     paintIT.stroke();
//     // Mostramos el relleno.
//     paintIT.fill();
// paintIT.closePath()

// // Animación de la raqueta y de la bola a través de la función update.
// function update() 
// {
//   //-- Implementación del algoritmo de animación de la raqueta:
//   console.log("Analizando posición de la raqueta y de la bola....");
//   //-- 1) Actualizar posicion de los elementos.
//   raqX = raqX + velX;
//   //-- 2) Borrar el canvas.
//   paintIT.clearRect(0, 0, pantalla.width, pantalla.height);
//   //-- 3) Pintar los elementos en el canvas, delimitando el objeto raqueta.
//   paintIT.beginPath();
//         // Creamos el rectángulo con la función rect(posición x variable, posición y fija, ancho, alto);
//         paintIT.rect(raqX, raqY, anchoRAQ, altoRAQ);
//         //-- Rellenamos el rectángulo de blanco.
//         paintIT.fillStyle = 'white';
//         // Mostramos el trazo.
//         paintIT.stroke();
//         // Mostramos el relleno.
//         paintIT.fill();
//   paintIT.closePath()
//   //-- 4) Repetir
//   requestAnimationFrame(update);
// }
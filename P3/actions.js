// Aquí empieza el programa, con la consola del Navegador Web.
console.log("Comienza: KICK BLOCKS Game!!!!!!");
// Empezamos en la fase inicial.
console.log("Empezamos en la fase inicial...");

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

// Delimitación del objeto raqueta.
raqueta.beginPath();
    // Creamos el rectángulo con la función rect(posición x, posición y, ancho, alto);
    raqueta.rect(0,630, 70,12);
    // Rellenamos el rectángulo de blanco.
    raqueta.fillStyle = 'white';
    // Mostramos el trazo.
    raqueta.stroke();
    // Mostramos el relleno.
    raqueta.fill();
raqueta.closePath();

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
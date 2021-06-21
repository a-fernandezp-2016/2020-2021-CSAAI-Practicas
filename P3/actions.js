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

// Definimos el contenido de la pantalla o canvas para poder dibujar en ello.
const paintIT = pantalla.getContext("2d");

// Creamos el elemento para poder pulsar el botón PLAY, a través del ID play.
const PLAY = document.getElementById("play");

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

// Definimos la variable fase, para ir cambiando de fase y saber donde estamos.
let fase = ESTADO.INIT;

// Características de los textos sólidos de arriba de la pantalla.
    // Coordenadas de la puntuación.
    let puntX = 50;
    let puntY = 60;
    // Variable de la puntuación total.
    let puntuacion = 0;
    // Coordenadas de las vidas.
    let vidX = 380;
    let vidY = 60;
    // Variable de las vidas totales.
    let vidas = 3;
    // Coordenadas del tiempo.
    let timeX = 50;
    let timeY = 120;

// Características de la línea de separación trazada para separar la cabecera del juego en sí.
    // Coordenadas de la separación de la cabecera con el juego en sí.
    let separX = 0;
    let separY = 165;

// Características de la raqueta.
    // Dimensiones de la raqueta.
    let anchoRAQ = 80;
    let altoRAQ = 12;
    // Definimos las coordenadas de la raqueta.
    let raqX = 250;
    let raqY = 900;
    // Definimos la variable velocidad del eje x de la raqueta.
    let velX_raq = 10;

// Características de la bola.
    // Definimos las coordenadas de la bola.
    let bolaX = 300;
    let bolaY = 889;
    // Definimos el radio de la bola.
    let radio = 10;
    // Definimos los ángulos de la bola.
    let ang0 = 0;
    let angF = 2 * Math.PI;
    // Definimos la variable velocidad del eje x e y de la bola.
    let velX_bol = 5;
    let velY_bol = -5;
    // Visibilidad de la bola.
    let viewBola = false;

// Definimos la estructura del bloque de ladrillos.
const LADRILLO = {
    FILA: 7,   //-- Filas.
    COLUM: 9,   //-- Columnas.
    ANCHO: 60,  //-- Anchura.
    ALTO: 15,  //-- Altura.
    origen_y: separY,    //-- De donde parten los ladrillos en el eje y.
    RELLENO: 6,  //-- Espacio alrededor del ladrillo.
    STATUS: true    //-- Activado o desactivado del ladrillo.
}
// Definimos la variable o array donde almacenar los ladrillos.
var ladrillos = [];

// Estructura inicial de los ladrillos.
for(let i=1; i<=LADRILLO.FILA; i++)
{
    ladrillos[i] = [];
    for(let j=1; j<=LADRILLO.COLUM; j++)
    {
        ladrillos[i][j] = 
        {
            posX: (LADRILLO.ANCHO * (j-1)) + (LADRILLO.RELLENO * j),
            posY: (LADRILLO.origen_y + 20) + ((LADRILLO.ALTO + LADRILLO.RELLENO) * i),
            ancho: LADRILLO.ANCHO,
            alto: LADRILLO.ALTO,
            relleno: LADRILLO.RELLENO,
            status: LADRILLO.STATUS
        };
    }
}

// Función para establecer la cabecera de los textos sólidos.
function drawCabecera()
{
    // Texto sólido de puntuación.
    paintIT.font = "35px Arial";
    paintIT.fillStyle = 'white';
    paintIT.fillText("Puntuación: ",puntX,puntY);
    paintIT.fillText(puntuacion, puntX+200,puntY);
    // Texto sólido de vidas.
    paintIT.font = "35px Arial";
    paintIT.fillStyle = 'white';
    paintIT.fillText("Vidas: ",vidX,vidY);
    paintIT.fillText(vidas, vidX+120,vidY);
    // Texto sólido de tiempo.
    paintIT.font = "35px Arial";
    paintIT.fillStyle = 'white';
    paintIT.fillText("Tiempo: ",timeX,timeY);
}

// Función de la victoria.
function drawVictoria()
{
    paintIT.font = "120px Arial Black";
    paintIT.fillStyle = 'green';
    paintIT.fillText("¡MUY BIEN! LLEGASTE A LA PUNTUACIÓN MÁXIMA DE",(pantalla.width-100)/2,pantalla.height/2);
    paintIT.fillText(puntuacion,(pantalla.width-100)/2,(pantalla.height+100)/2);
    paintIT.fillText("¡  F E L I C I D A D E S  !",(pantalla.width-100)/2,(pantalla.height+200)/2);
}

// Función de la derrota.
function drawDerrota()
{
    paintIT.font = "120px Arial Black";
    paintIT.fillStyle = 'red';
    paintIT.fillText("¡  G A M E   O V E R  !",(pantalla.width-100)/2,pantalla.height/2);
}

// Función para trazar la línea de separación: cabecera de textos - juego en sí,
// a través del bucle for. Usando líneas discontinuas.
function drawSeparacion()
{
    for(let i=separX; i<=pantalla.width; i += 100)
    {
        for(let j=separX+60; j<pantalla.width; j += 100)
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
            paintIT.stroke();
            // Final trazo.
            paintIT.closePath();
            // Parte o trazo invisible.
            paintIT.beginPath();
            //-- Trazo de la línea horizontal desde el pto inicial al final.
            paintIT.moveTo(j,separY);
            paintIT.lineTo(j+=40, separY);
            // Coloreamos de blanco la línea.
            paintIT.strokeStyle = 'black';
            //-- Mostrar el trazo.
            paintIT.stroke();
            // Final trazo.
            paintIT.closePath();
        }
    }
}

//-- Función que dibuja la raqueta.
function drawRaqueta()
{
    paintIT.beginPath();
        //-- Definimos las dimensiones de la raqueta: (posición x, posición y, ancho, alto).
        paintIT.rect(raqX,raqY,anchoRAQ,altoRAQ);
        //-- Definimos un color para la raqueta.
        paintIT.fillStyle = 'white';
        //-- Lo coloreamos.
        paintIT.fill();
    paintIT.closePath();
}

//-- Función que dibuja la bola.
function drawBola()
{
    if(viewBola == true)
    {
        paintIT.beginPath();
            //-- Definimos las dimensiones de la bola: 
            // (posición x, posición y, radio, ángulo inicial, ángulo final).
            paintIT.arc(bolaX,bolaY,radio,ang0,angF);
            //-- Definimos un color para la bola.
            paintIT.fillStyle = '#FF0066'; //-- Color Fuctsia.
            //-- Lo coloreamos.
            paintIT.fill();
        paintIT.closePath();
    }
}

// Función que dibuja los ladrillos, si está activado su visibilidad a true. Si no, desaparecen.
function drawLadrillos()
{
    for(let i=1; i<=LADRILLO.FILA; i++)
    {
        for(let j=1; j<=LADRILLO.COLUM; j++)
        {
            if(ladrillos[i][j].status == true)
            {
                paintIT.beginPath();
                // Diseñamos ladrillo a ladrillo.
                paintIT.rect(ladrillos[i][j].posX, ladrillos[i][j].posY, LADRILLO.ANCHO, LADRILLO.ALTO);
                paintIT.fillStyle = 'yellow';
                //-- Lo coloreamos.
                paintIT.fill();
                paintIT.closePath();
            }
            else
            {
                ladrillos[i][j] = [];
            }
        }
    }
}

// Función que produce la colisión de la bola con el ladrillo y, en cuyo caso, desaparece éste último.
function colisionLadrillos()
{
    for(let i=1; i<=LADRILLO.FILA; i++)
    {
        for(let j=1; j<=LADRILLO.COLUM; j++)
        {
            if(ladrillos[i][j].status == true)
            {
                if(((bolaX + radio) >= ladrillos[i][j].posX) && (bolaX <= (ladrillos[i][j].posX + ladrillos[i][j].ancho)) &&
                ((bolaY + radio) >= ladrillos[i][j].posY) && (bolaY <= (ladrillos[i][j].posY + ladrillos[i][j].alto)))
                {
                    ladrillos[i][j].status = false;
                    velY_bol = -velY_bol;
                    // Incrementamos en función vayamos dando con la bola en cada ladrillo.
                    puntuacion += 1;
                    // Si se llega a la puntuación final, se pasa al último estado (3).
                    if(puntuacion == (LADRILLO.FILA * LADRILLO.COLUM))
                    {
                        // Mensaje de que se ha llegado a la max puntuación.
                        console.log("¡HEMOS LLEGADO A LA MÁXIMA PUNTUACIÓN!");
                        // Cambio de fase, a la final o 3.
                        fase = ESTADO.FINAL;
                    }
                }
            }
        }
    }
}

//-- Función para llevar a cabo la animación del juego.
function update() 
{
    //-- Implementación del algoritmo de animación con mensaje en consola:
    console.log("Proceso de animación del juego");

    //-- 1) Actualizar las posiciones de la raqueta, la bola, los ladrillos y otros ajustes.
    if(fase == ESTADO.PLAYING)
    {
        // Condición para que la bola rebote entre las paredes verticales.
        if((bolaX > (pantalla.width-radio)) || (bolaX < radio))
        {
            velX_bol = -velX_bol;
        }
        // Condición para que la bola rebote con la parte superior de la pantalla.
        if(bolaY < (separY-50-radio)) 
        {
            velY_bol = -velY_bol;
        }
        // Condición para que rebote la bola en la raqueta.
        if((((bolaX-radio) <= raqX) || ((bolaX-radio) >= (raqX + anchoRAQ))) && 
        (((bolaY-radio) <= raqY) || ((bolaY-radio) >= (raqY + altoRAQ))))
        {
            // Cálculo del rebote en eje x e y.
            velX_bol = -velX_bol;
            velY_bol = -velY_bol;
        }
        // Condición para que la bola no circule más abajo de por donde se mueve la raqueta.
        else if((bolaY-radio) <= raqY)
        {
            // Movimiento de la bola en el eje x.
            bolaX += velX_bol;
            // Movimiento de la bola en el eje y.
            bolaY += velY_bol;
        }
        else if((bolaY-radio) >= (raqY + altoRAQ))
        {
            if(vidas > 0)
            {
                // Pasamos a la fase 1 de saque y perdemos vida.
                fase = ESTADO.SAQUE;
                vidas -= 1;
                // Establecemos a false, para que desaparezca la bola.
                viewBola = false;
            }
            else if(vidas == 0)
            {
                // Pasamos a la fase 3 final.
                fase = ESTADO.FINAL;
            }
        }
    }
    // Condición para que al pulsar la tecla: flecha der/izq, la raqueta no se salga de la pantalla.
    if((raqX > 0) && (raqX < (pantalla.width-anchoRAQ))) 
    {
        window.onkeydown = (e) => {
            if(vidas != 0)
            {
                switch(e.keyCode)
                {
                    // Tecla: espacio.
                    case 32:
                        if(fase == ESTADO.SAQUE)
                        {
                            // Cambiamos a la fase 2 o del juego.
                            fase = ESTADO.PLAYING;
                            // Mensaje del saque en consola.
                            console.log("Saque realizado");
                        }
                        break;
                    // Tecla: Izquierda.
                    case 37:
                        if(fase == ESTADO.PLAYING)
                        {
                            // Cálculo para mover hacia la izquierda.
                            raqX -= velX_raq;
                            // Mensaje del mvto de la raqueta hacia la izquierda.
                            console.log("Moviendo la raqueta hacia la izquierda");
                        }
                        break;
                    // Tecla: Derecha.
                    case 39:
                        if(fase == ESTADO.PLAYING)
                        {
                            // Cálculo para mover hacia la derecha.
                            raqX += velX_raq;
                            // Mensaje del mvto de la raqueta hacia la derecha.
                            console.log("Moviendo la raqueta hacia la derecha");
                        }
                        break;
                }
            }
        }
    }

    //-- 2) Borrar la pantalla del juego.
    paintIT.clearRect(0,0,pantalla.width, pantalla.height);

    //-- 3) Pintar todos y cada uno de los elementos en la pantalla.
    // El texto sólido de la cabecera.
    drawCabecera();
    // La línea discontinua de separación entre: cabecera de textos sólidos - juego en sí.
    drawSeparacion();
    // La bola.
    drawBola();
    // La raqueta.
    drawRaqueta();
    // Los ladrillos.
    drawLadrillos();
    // La colisión de la bola con los ladrillos.
    colisionLadrillos();
    // Mensaje de victoria si has llegado al máximo de puntuación sin que se acaben las vidas.
    // Mensaje de derrota si has perdido las 3 vidas que tenías antes de llegar a la máxima de puntuación.
    if(fase == ESTADO.FINAL)
    {
        // Victoria.
        if(puntuacion == (LADRILLO.FILA * LADRILLO.COLUM))
        {
            drawVictoria();
        }
        // Derrota.
        else
        {
            drawDerrota();
        }
    }

    //-- 4) Repetir de nuevo el proceso de animación del juego.
    requestAnimationFrame(update);
}

// Para poder iniciar la partida, es necesario pulsar al botón de PLAY.
PLAY.onclick = () => {
    if(fase == ESTADO.INIT)
    {
        // Cambiamos a la fase 1 o de saque.
        fase = ESTADO.SAQUE;
        // Establecemos a true, para que aparezca la bola.
        viewBola = true;
    }
}

//-- Punto de entrada de la función update.
update();
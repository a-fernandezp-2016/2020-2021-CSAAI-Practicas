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

// Sonidos del juego.
// Creación del elemento para que se escuche el sonido principal de fondo.
const AUDIO_PRINC = document.getElementById("audiofondo");
const Sonido_Victoria = new Audio("Winner.mp3");
const Sonido_Derrota = new Audio("Game_over.mp3");
const Sonido_Saque = new Audio("Al_sacar.mp3");
const Sonido_PierdeVida = new Audio("Pierde_vida.mp3");
const Sonido_Rebote = new Audio("Rebote_bola_raqueta_pared.mp3");
const Sonido_Romper = new Audio("Romper_ladrillo.mp3");

// Creamos el elemento para poder pulsar el botón PLAY e iniciar el juego, a través del ID play.
const PLAY = document.getElementById("play");
// Creamos el elemento para poder pulsar el botón PLAY de los ajustes de sonido y, que haya
// interactividad entre el usuario y el sonido del juego.
const PLAYSOUND = document.getElementById("playSound");
// Creamos el elemento para poder ajustar el nivel de volumen que se quiera.
const DeslizaVol = document.getElementById("volumen");
// Creamos el elemento para poder ver a que nivel se ha puesto.
const DisplayVol = document.getElementById("displayDesliza");

// Creamos tres elementos para poder pulsar un botón de entre los tres nivel de dificultad: 
// Fácil, Medio y Difícil. Por defecto: Fácil.
const L_FACIL = document.getElementById("facil");
const L_MEDIO = document.getElementById("medio");
const L_DIFICIL = document.getElementById("dificil");

// Creamos la variable CAPAR = 0, para capar si elegimos el nivel de dificultad: fácil.
let CAPAR = 0;

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
    // CTE vidas.
    const VIDAS = 3;

// Características de la línea de separación trazada para separar la cabecera del juego en sí.
    // Coordenadas de la separación de la cabecera con el juego en sí.
    let separX = 0;
    let separY = 100;

// Características de la raqueta.
    // Dimensiones de la raqueta.
    let anchoRAQ = 80;
    let altoRAQ = 12;
    // Definimos las coordenadas de la raqueta.
    let raqX = 260;
    let raqY = 900;
    // Definimos la variable velocidad del eje x de la raqueta.
    let velX_raq = 30;

// Características de la bola.
    // Definimos las coordenadas de la bola.
    let bolaX = 300;
    let bolaY = 890;
    // Definimos el radio de la bola.
    let radio = 10;
    // Definimos los ángulos de la bola.
    let ang0 = 0;
    let angF = 2 * Math.PI;
    // Definimos la variable velocidad del eje x e y de la bola.
    let velX_bol = 4;
    let velY_bol = -4;
    // Visibilidad de la bola.
    let viewBola = false;

// Posiciones de la bola y de la raqueta iniciales.
bolaX_init = bolaX;
bolaY_init = bolaY;
raqX_init = raqX;
raqY_init = raqY;

// Incógnitas de la velocidad en x e y de la bola, inicialmente.
VX = velX_bol;
VY = velY_bol;

// Características del mar.
    // Coordenadas del mar.
    let marX = 0;
    marY = raqY + altoRAQ;
    // Dimensión del mar.
    anchoMAR = pantalla.width;
    altoMAR = pantalla.height - (raqY + altoRAQ);

// Definimos la estructura del bloque de ladrillos.
const LADRILLO = {
    FILA: 10,   //-- Filas: yo he puesto 10, pero puede ser variable.
    COLUM: 9,   //-- Columnas: Sólo caben 9 columnas (este nº no se puede cambiar).
    ANCHO: 60,  //-- Anchura.
    ALTO: 15,  //-- Altura.
    origen_y: separY,    //-- De donde parten los ladrillos en el eje y.
    RELLENO: 6,  //-- Espacio alrededor del ladrillo.
    STATUS: true    //-- Activado o desactivado del ladrillo.
}

// Puntuación máxima que se puede conseguir.
let punt_max = LADRILLO.FILA * LADRILLO.COLUM;
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

// Función para que suene el sonido o audio principal.
function soundPrincipal()
{
    // Se activa el audio principal del juego retro, desde el principio.
    AUDIO_PRINC.currentTime = 0;
    AUDIO_PRINC.play();
    AUDIO_PRINC.volume = 0.1;
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
}

// Función de la victoria.
function drawVictoria()
{
    paintIT.font = "25px Arial Black";
    paintIT.fillStyle = 'green';
    paintIT.fillText(" ¡  M U Y   B I E N  ! ",(pantalla.width-400)/2,pantalla.height/2);
    paintIT.fillText("LLEGASTE A LA PUNTUACIÓN",(pantalla.width-530)/2,(pantalla.height+100)/2);
    paintIT.fillText("MÁXIMA DE ",(pantalla.width-210)/2,(pantalla.height+200)/2);
    paintIT.fillText(puntuacion,(pantalla.width+170)/2,(pantalla.height+200)/2);
    paintIT.fillText("¡  F E L I C I D A D E S  !",(pantalla.width-450)/2,(pantalla.height+300)/2);
}

// Función de la derrota.
function drawDerrota()
{
    paintIT.font = "25px Arial Black";
    paintIT.fillStyle = 'red';
    paintIT.fillText("¡  G A M E   O V E R  !",(pantalla.width-400)/2,pantalla.height/2);
    paintIT.fillText("EL Nº DE PTOS QUE TE HA QUEDADO",(pantalla.width-570)/2,(pantalla.height+100)/2);
    paintIT.fillText("HA SIDO DE ",(pantalla.width-210)/2,(pantalla.height+200)/2);
    paintIT.fillText(punt_max-puntuacion,(pantalla.width+170)/2,(pantalla.height+200)/2);
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

// Función que dibuja el mar de la parte inferior.
function drawMar()
{
    paintIT.beginPath();
        //-- Definimos las dimensiones del mar: (posición x, posición y, ancho, alto).
        paintIT.rect(marX,marY,anchoMAR,altoMAR);
        //-- Definimos un color para el mar.
        paintIT.fillStyle = 'blue'; //-- Color azul.
        //-- Lo coloreamos.
        paintIT.fill();
    paintIT.closePath();
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
                    // Se activa el audio de ROMPER LOS LADRILLOS.
                    Sonido_Romper.currentTime = 0;
                    Sonido_Romper.play();
                    // Si se llega a la puntuación final, se pasa al último estado (3).
                    if(puntuacion == (LADRILLO.FILA * LADRILLO.COLUM))
                    {
                        // Mensaje de que se ha llegado a la max puntuación.
                        console.log("¡HEMOS LLEGADO A LA MÁXIMA PUNTUACIÓN!");
                        // Cambio de fase, a la final o 3.
                        fase = ESTADO.FINAL;
                        // Si se llega a la puntuación MÁXIMA, se activa el audio de VICTORIA.
                        Sonido_Victoria.currentTime = 0;
                        Sonido_Victoria.play();
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
        // Movimiento de la bola en el eje x.
        bolaX += velX_bol;
        // Movimiento de la bola en el eje y.
        bolaY += velY_bol;
        // Condición para que la bola rebote entre las paredes verticales.
        if((bolaX > (pantalla.width-radio)) || (bolaX < radio))
        {
            velX_bol = -velX_bol;
            // Se activa el audio del REBOTE.
            Sonido_Rebote.currentTime = 0;
            Sonido_Rebote.play();
        }
        // Condición para que la bola rebote con la parte superior de la pantalla.
        if(bolaY < (separY+20+radio)) 
        {
            velY_bol = -velY_bol;
            // Se activa el audio del REBOTE.
            Sonido_Rebote.currentTime = 0;
            Sonido_Rebote.play();
        }
        // Condición para que rebote la bola en la raqueta.
        if(((bolaX+radio) >= raqX) && ((bolaX-radio) <= (raqX + anchoRAQ)) 
        && ((bolaY+radio) > raqY))
        {
            // Cálculo del rebote bola - raqueta.
            velY_bol = -velY_bol;
            // Se activa el audio del REBOTE.
            Sonido_Rebote.currentTime = 0;
            Sonido_Rebote.play();
        }
        // Condición para que, si la bola toca el mar, ésta desaparezca y, haya que sacar de nuevo.
        if((bolaY + radio) > (raqY + altoRAQ))
        {
            if(vidas > 0)
            {
                // Pasamos a la fase 1 de saque y perdemos vida.
                fase = ESTADO.SAQUE;
                vidas -= 1;
                // Se activa el audio de una VIDA MENOS.
                Sonido_PierdeVida.currentTime = 0;
                Sonido_PierdeVida.play();
                // Establecemos la bola a false, cuando llega al mar, para que desaparezca la bola.
                viewBola = false;
                // Que la raqueta vuelva a la posición inicial.
                raqX = raqX_init;
                raqY = raqY_init;
                // Que la bola vuelva a la posición inicial.
                bolaX = bolaX_init;
                bolaY = bolaY_init;
                // Dibujamos la raqueta en su posición inicial.
                drawRaqueta();
            }
            else if(vidas == 0)
            {
                // Pasamos a la fase 3 final.
                fase = ESTADO.FINAL;
                // Establecemos a false, para que desaparezca la bola.
                viewBola = false;
                // Si la bola cae al agua cuando se tiene 0 vidas, se activa el audio de DERROTA.
                Sonido_Derrota.currentTime = 0;
                Sonido_Derrota.play();
            }
        }
        if((vidas <= (VIDAS-1)) && (fase == ESTADO.SAQUE))
        {
            // Establecemos a true, para que aparezca la bola.
            viewBola = true;
        }
    }
    // Condición para que al pulsar la tecla: flecha der/izq, la raqueta no se salga de la pantalla.
    window.onkeydown = (e) => 
    {
        switch(e.keyCode)
        {
            // Tecla: espacio.
            case 32:
                if(fase == ESTADO.SAQUE)
                {
                    // Cambiamos a la fase 2 o del juego.
                    fase = ESTADO.PLAYING;
                    // Se activa el audio de saque.
                    Sonido_Saque.currentTime = 0;
                    Sonido_Saque.play();
                    // Mensaje del saque en consola.
                    console.log("Saque realizado");
                }
                break;
            // Tecla: Izquierda.
            case 37:
                if((fase == ESTADO.PLAYING) && (raqX > 0))
                {
                    // Cálculo para mover hacia la izquierda.
                    raqX -= velX_raq;
                    // Mensaje del mvto de la raqueta hacia la izquierda.
                    console.log("Moviendo la raqueta hacia la izquierda");
                }
                break;
            // Tecla: Derecha.
            case 39:
                if((fase == ESTADO.PLAYING) && (raqX < (pantalla.width-anchoRAQ)))
                {
                    // Cálculo para mover hacia la derecha.
                    raqX += velX_raq;
                    // Mensaje del mvto de la raqueta hacia la derecha.
                    console.log("Moviendo la raqueta hacia la derecha");
                }
                break;
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
    // El mar.
    drawMar();
    // Los ladrillos.
    drawLadrillos();
    // La colisión de la bola con los ladrillos.
    colisionLadrillos();
    // Mensaje de victoria si has llegado al máximo de puntuación sin que se acaben las vidas.
    // Mensaje de derrota si has perdido las 3 vidas que tenías antes de llegar a la máxima de puntuación.
    if(fase == ESTADO.FINAL)
    {
        // Mensaje Victoria.
        if(puntuacion == (LADRILLO.FILA * LADRILLO.COLUM))
        {
            drawVictoria();
        }
        // Mensaje Derrota.
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
        // Llamar a la función del audio principal, para que empiece a sonar dicho audio.
        soundPrincipal();
    }
}

// Para volver a escuchar el sonido de fondo o el sonido principal.
PLAYSOUND.onclick = () => {
    // Llamar a la función del audio principal, para que empiece a sonar dicho audio.
    soundPrincipal();
}

// Para ajustar el nivel de volumen del sonido de fondo o sonido principal.
DeslizaVol.onclick = (ev) => {
    AUDIO_PRINC.volume = ev.currentTarget.value;
    DisplayVol.innerHTML = ev.currentTarget.value;
}

// Para elegir el nivel de dificultad. Por defecto es fácil.
L_FACIL.onclick = () => {
    if(fase == ESTADO.INIT && velX_bol == VX && velY_bol == VY && CAPAR == 0)
    {
        velX_bol *= 1;
        velY_bol *= 1;
        CAPAR = 1;
    }
    else
    {
        // Mensaje en consola de aviso.
        console.log("PROCESO NO VÁLIDO");
    }
}
L_MEDIO.onclick = () => {
    if(fase == ESTADO.INIT && velX_bol == VX && velY_bol == VY && CAPAR == 0)
    {
        velX_bol *= 1.4;
        velY_bol *= 1.4;
        velX_raq += 10;
    }
    else
    {
        // Mensaje en consola de aviso.
        console.log("PROCESO NO VÁLIDO");
    }
}
L_DIFICIL.onclick = () => {
    if(fase == ESTADO.INIT && velX_bol == VX && velY_bol == VY && CAPAR == 0)
    {
        velX_bol *= 1.8;
        velY_bol *= 1.8;
        velX_raq += 20;
    }
    else
    {
        // Mensaje en consola de aviso.
        console.log("PROCESO NO VÁLIDO");
    }
}

//-- Punto de entrada de la función update.
update();
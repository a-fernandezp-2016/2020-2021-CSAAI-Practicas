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

// Definimos la variable fase, para ir cambiando de fase y saber donde estamos.
let fase = ESTADO.INIT;

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
    // Dimensiones de la raqueta.
    let anchoRAQ = 100;
    let altoRAQ = 15;
    // Definimos las coordenadas de la raqueta.
    let raqX = 250;
    let raqY = 900;
    // Definimos la variable velocidad del eje x de la raqueta.
    let velX_raq = 50;

// Características de la bola.
    // Definimos las coordenadas de la bola.
    let bolaX = 300;
    let bolaY = 888;
    // Definimos el radio de la bola.
    let radio = 12;
    // Definimos los ángulos de la bola.
    let ang0 = 0;
    let angF = 2 * Math.PI;
    // Definimos la variable velocidad del eje x e y de la bola.
    let velX_bol = 40;
    let velY_bol = 50;
    // Pintar o borrar bola.
    let actBola = false;

// Definimos la cte o array donde almacenar los ladrillos.
const ladrillos = [];
// Definimos la estructura del bloque de ladrillos.
const LADRILLO = {
    FILA: 5,   //-- Filas.
    COLUM: 9,   //-- Columnas.
    ANCH: 60,  //-- Anchura.
    ALT: 30,  //-- Altura.
    relleno: 10,  //-- Espacio alrededor del ladrillo.
    activacion: true //-- Estado del ladrillo: activo (true) o no (false).
}

// Estructura inicial de los ladrillos.
for(let i=1; i<=LADRILLO.FILA; i++)
{
    for(let j=1; j<=LADRILLO.COLUM; j++)
    {
        ladrillos[i][j] = {
            posX: (LADRILLO.ANCH + LADRILLO.relleno) * j,
            posY: (LADRILLO.ALT + LADRILLO.relleno) * i,
            w: LADRILLO.ANCH,
            h: LADRILLO.ALT,
            relleno: LADRILLO.relleno,
            active: LADRILLO.activacion
        };
    }
}

// Dibujamos los ladrillos si está activado su visibilidad a true.
for(let i=1; i<=LADRILLO.FILA; i++)
{
    for(let j=1; j<=LADRILLO.COLUM; j++)
    {
        if (ladrillos[i][j].active) {
            paintIT.beginPath();
            // Diseñamos ladrillo a ladrillo.
            paintIT.rect(ladrillos[i][j].posX, ladrillos[i][j].posY, LADRILLO.w, LADRILLO.h);
            paintIT.fillStyle = 'yellow';
            //-- Lo coloreamos.
            paintIT.fill();
            //-- Mostramos el trazo.
            paintIT.stroke();
            paintIT.closePath();
        }
    }
}

// Función donde se procesa la animación de la raqueta, bola y ladrillos.
function update() 
{
    // 0) Mensaje inicial de toma de contacto de la animación.
    console.log("Chequeando posiciones y características de la raqueta y de la bola....");
    //-- 1) Actualizar las posiciones: Física del MRU.
    // Darle a play para iniciar la partida y cambiar de fase.
    play.onclick = ()=> {
        if(fase == ESTADO.INIT)
        {
            // Mensaje de inicio del juego.
            paintIT.font = "80px Arial";
            paintIT.fillStyle = 'blue';
            paintIT.fillText("Puntuación: ",250,500);
            // Cambio a la fase 1 del saque.
            fase = ESTADO.SAQUE;
            // Aparición de la bola.
            actBola = true;
        }
        else
        {
            // Mensaje de aviso.
            console.log("El botón PLAY sólo es para iniciar la partida y cambiar a la fase 1 del saque.");
        }
    }
    // Condición para que la raqueta no se salga por las paredes verticales.
    if((raqX>2) && (raqX<=pantalla.width-anchoRAQ))
    {
        window.onkeydown = (e) => {
            if(vidas != 0)
            {
                switch(e.keyCode)
                {
                    // Pulsar espacio.
                    case '32':
                        if(fase == ESTADO.SAQUE)
                        {
                            console.log("Saque");
                            // Si cae la bola, hay que volver a sacar y con 1 vida menos.
                            vidas -= 1;
                            // Pasamos al estado Playing.
                            fase = ESTADO.PLAYING;
                        }
                        break;
                    // Pulsar Arrow Left.
                    case '37':
                        if(fase == ESTADO.PLAYING)
                        {
                            raqX = raqX - velX_raq;
                            console.log("Moviendo hacia la izquierda.");
                        }
                        else
                        {
                            // Mensaje de aviso.
                            console.log("PROCESO NO VÁLIDO, LO SIENTO.");
                        }
                        break;
                    // Pulsar Arrow Right.
                    case '39':
                        if(fase == ESTADO.PLAYING)
                        {
                            raqX = raqX + velX_raq;
                            console.log("Moviendo hacia la derecha.");
                        }
                        else
                        {
                            // Mensaje de aviso.
                            console.log("PROCESO NO VÁLIDO, LO SIENTO.");
                        }
                        break;
                    default:
                        // Mensaje aviso, no es válido pulsar otra tecla.
                        console.log("NO ES VÁLIDO PULSAR UNA TECLA DIFERENTE");
                }
            }
        }
    }
    //-- Colisión de la bola con la raqueta.
    if((bolaX + radio) >= raqX && bolaX <=(raqX + anchoRAQ) && (bolaY + radio) >= raqY && bolaY <=(raqY + altoRAQ)) {
        velY_bol = -velY_bol;
    }
    //-- Actualizamos la posición de la bola.
    if (fase == ESTADO.PLAYING) {
        bolaX = bolaX + velX_bol;
        bolaY = bolaY + velY_bol; 
    }
    // Cuando te quedas sin vidas, finaliza el juego.
    if(vidas == 0)
    {
        console.log("GAME OVER. FIN DEL JUEGO.");
        // Pasamos a la fase final y última (3).
        fase = ESTADO.FINAL;
    }

    //-- 2) Borramos la pantalla de juego.
    paintIT.clearRect(0, 0, pantalla.width, pantalla.height);
    
    //-- 3) Dibujamos de nuevo los elementos actualizados.
    paintIT.beginPath();
        // Dibujando la bola.
        if(actBola == true)
        {
            //-- Definimos las dimensiones de la bola: 
            // (posición x, posición y, radio, ángulo inicial, ángulo final).
            paintIT.arc(bolaX,bolaY,radio,ang0,angF);
        }
        //-- Definimos un color para la bola.
        paintIT.fillStyle = 'white';
        //-- Lo coloreamos.
        paintIT.fill();
        //-- Mostramos el trazo.
        paintIT.stroke();
    paintIT.closePath();

    // Estructuramos el texto sólido.
        // De puntuación.
        paintIT.font = "35px Arial";
        paintIT.fillStyle = 'white';
        paintIT.fillText("Puntuación: ",puntX,puntY);
        paintIT.fillText(score, puntX+10,puntY);
        // De vidas.
        paintIT.font = "35px Arial";
        paintIT.fillStyle = 'white';
        paintIT.fillText("Vidas: ",vidX,vidY);
        paintIT.fillText(vidas, vidX+10,vidY);
        // De tiempo.
        paintIT.font = "35px Arial";
        paintIT.fillStyle = 'white';
        paintIT.fillText("Tiempo: ",timeX,timeY);
    
    // Al llegar al final, puedes ganar (aún te quedan vidas), o perder (no te quedan vidas).
    if (fase == ESTADO.FINAL) 
    {
        if(score == 45) 
        {
            //-- Si ganamos, el mensaje que saldrá en el centro es el siguiente.
            paintIT.font = "100px Arial Black";
            paintIT.fillStyle = 'green';
            paintIT.fillText("¡VICTORIA!",(pantalla.width-15)/2, pantalla.height/2);
            paintIT.fillText("¡ENHORABUENA!",(pantalla.width-15)/2,(pantalla.height-10)/2);
        }
        else
        {
            //-- Si perdemos, el mensaje que saldrá en el centro es el siguiente.
            paintIT.font = "100px Arial Black";
            paintIT.fillStyle = 'red';
            paintIT.fillText("¡GAME OVER!",(pantalla.width-15)/2, pantalla.height/2);
        }
    }
    else
    {
        // Mensaje de aviso.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }

    // Trazamos la línea de separación: cabecera de textos - juego en sí,
    // a través del bucle for. Usando líneas discontinuas.
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

    // Dibujando la raqueta.
    paintIT.beginPath();
        //-- Definimos las dimensiones de la raqueta: (posición x, posición y, ancho, alto).
        paintIT.rect(raqX,raqY,anchoRAQ,altoRAQ);
        //-- Definimos un color para la raqueta.
        paintIT.fillStyle = 'white';
        //-- Lo coloreamos.
        paintIT.fill();
        //-- Mostramos el trazo.
        paintIT.stroke();
    paintIT.closePath();

    //-- 4) Repetir el proceso de ejecución con la función update de nuevo.
    requestAnimationFrame(update);
}

//-- Punto de entrada de la animación del videojuego.
update();
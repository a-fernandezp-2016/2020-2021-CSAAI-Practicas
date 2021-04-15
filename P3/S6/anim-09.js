console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 300;
canvas.height = 100;

//-- Obtener el contexto del canvas
const contxto = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 0;
let y = 10;

//-- Velocidad horizontal del objeto
let velx = 1;

//-- Funcion principal de animacion
function update() 
{
    console.log("test");
    //-- Algoritmo de animacion:
    //-- 1) Actualizar posicion del  elemento
    //-- (física del movimiento rectilineo uniforme)
    x = x + velx;

    //-- 2) Borrar el canvas
    contxto.clearRect(0, 0, canvas.width, canvas.height);

    //-- 3) Dibujar los elementos visibles
    contxto.beginPath();
    contxto.rect(x, y, 20, 20);

    //-- Dibujar
    contxto.fillStyle = 'red';

    //-- Rellenar
    contxto.fill();

    //-- Dibujar el trazo
    contxto.stroke()
    contxto.closePath();

    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

//-- ¡Que empiece la función! Llamar la primera vez a la función update.
update();
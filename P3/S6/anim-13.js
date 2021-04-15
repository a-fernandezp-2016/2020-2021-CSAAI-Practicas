// Mensaje de iniciación en la consola de comandos.
console.log("Ejecutando JS....");

// Leemos el canvas de html en JS y, lo almacenamos en la cte canvas.
const canvas = document.getElementById("canvas");

// Definimos las dimensiones del canvas.
canvas.width = 800;
canvas.height = 420;

// Leemos un contexto para poder dibujar en 2D en nuestro canvas y, lo almacenamos en la cte contxto.
const contxto = canvas.getContext("2d");

// Posición del elemento a animar.
let x = 0;
let y = 0;

// Variable velocidad de x y, variable velocidad de y.
let velx = 5;
let vely = 0.3;

// Asignar el radio del círculo.
let radio = 20;

//-- Función principal de actualización
function update() 
{
    // Mensaje, al entrar en la función update, en la consola.
    console.log("Test");

    // Debemos marcar el límite horizontal a ambos lados, para que
    // la figura 2D esté confinada entre las paredes verticales.
    if(x < 0 || x >= (canvas.width-radio))
    {
        velx = -velx;
    }
    // Debemos marcar el límite vertical en la parte superior e inferior, para que
    // la figura 2D esté confinada entre las paredes horizontales.
    if(y < 0 || y >= (canvas.height-radio))
    {
        vely = -vely;
    }
    //-- 1) Actualizar posicion de los elementos.
    x = x + velx;
    y = y + vely;
    
    //-- 2) Borrar el canvas.
    contxto.clearRect(0, 0, canvas.width, canvas.height);

    //-- 3) Pintar los elementos en el canvas
    
    // Delimitar los objetos en 2D.
    contxto.beginPath();

    // Definimos la figura concreta en 2D a dibujar en el canvas.
    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final.
    contxto.arc(x,y,radio, 0, 2 * Math.PI);

    // Coloreamos circunferencia del círculo de negro.
    contxto.strokeStyle = 'black';

    // Editar el grosor de la circunferencia del círculo.
    contxto.lineWidth = 3;

    // Coloreamos el círculo de rojo.
    contxto.fillStyle = 'red';

    // Mostrar o dibujar el relleno del círculo.
    contxto.fill();

    // Mostrar o dibujar la circunferencia del círculo.
    contxto.stroke();

    // Cerrar delimitación de los objetos en 2D.
    contxto.closePath();

    //-- 4) Repetir.
    requestAnimationFrame(update);
}

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez.
update();
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
let velx = 4;
let vely = 2;

//-- Función principal de actualización
function update() 
{
    console.log("Test");

    //-- 1) Actualizar posicion de los elementos, pero antes...
    // Debemos marcar el límite de que al llegar a la pared de la derecha,
    // la figura 2D vuelva para atrás o retroceda.
    if(x < 0 || x >= canvas.width-rectx)
    {
        velx = -velx;
    }
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
    contxto.arc(x,y,12, 0, 2 * Math.PI);

    // Mostrar el relleno de la figura 2D en rojo.
    contxto.fillStyle = 'red';

    // Mostrar el relleno de la figura 2D.
    contxto.fill();

    // Mostrar el trazo del rectángulo.
    contxto.stroke();

    // Cerrar delimitación de los objetos en 2D.
    contxto.closePath();

    //-- 4) Repetir.
    requestAnimationFrame(update);
}

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez.
update();
// Mensaje de iniciación en la consola de comandos.
console.log("Ejecutando JS....");

// Leemos el canvas de html en JS y, lo almacenamos en la cte canvas.
const canvas = document.getElementById("canvas");

// Definimos las dimensiones del canvas.
canvas.width = 400;
canvas.height = 250;

// Leemos un contexto para poder dibujar en 2D en nuestro canvas y, lo almacenamos en la cte contxto.
const contxto = canvas.getContext("2d");

// Delimitar los objetos en 2D.
contxto.beginPath();

// Definimos la figura concreta en 2D a dibujar en el canvas.
contxto.rec(0,0,80,40);

// Mostrar el relleno de la figura 2D en rojo.
contxto.fillStyle = 'red';

// Mostrar el relleno de la figura 2D.
contxto.fill();

// Mostrar el trazo del rectángulo.
contxto.stroke();

// Cerrar delimitación de los objetos en 2D.
contxto.closePath();
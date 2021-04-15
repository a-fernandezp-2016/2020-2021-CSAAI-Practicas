// Mensaje de iniciación en la consola de comandos.
console.log(" BIENVENIDO AL ESCENARIO DE LA P3");

// Leemos el canvas de html en JS y, lo almacenamos en la cte canvas.
const canvas = document.getElementById("canvas");

// Definimos las dimensiones del canvas.
canvas.width = 300;
canvas.height = 700;

// Leemos un contexto para poder dibujar en 2D en nuestro canvas y, lo almacenamos en la cte contxto.
const contxto = canvas.getContext("2d");
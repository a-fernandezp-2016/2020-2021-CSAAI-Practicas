// Mensaje de iniciación en la consola de comandos.
console.log("Ejecutando JS....");

// Leemos el canvas de html en JS y, lo almacenamos en la cte canvas.
const canvas = document.getElementById("canvas");

// Definimos las dimensiones del canvas.
canvas.width = 800;
canvas.height = 650;

// Leemos un contexto para poder dibujar en 2D en nuestro canvas y, lo almacenamos en la cte contxto.
const contxto = canvas.getContext("2d");

//-- Leer la imagen del documento html, que está deshabilitada.
var myimage = document.getElementById("Alex");

// Cargamos la imagen en nuestro canvas.
myimage.onload = () => {
    //-- Insertar la imagen en el canvas, una vez que ya esté cargada. Elegir posición a situarla (x,y).
    contxto.drawImage(myimage, 20, 20);
};
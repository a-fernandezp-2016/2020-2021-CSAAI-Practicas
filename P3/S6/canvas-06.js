// Mensaje de iniciación en la consola de comandos.
console.log("Ejecutando JS....");

// Leemos el canvas de html en JS y, lo almacenamos en la cte canvas.
const canvas = document.getElementById("canvas");

// Definimos las dimensiones del canvas.
canvas.width = 400;
canvas.height = 250;

// Leemos un contexto para poder dibujar en 2D en nuestro canvas y, lo almacenamos en la cte contxto.
const contxto = canvas.getContext("2d");

// Texto sólido.
contxto.font = "30px Arial";
contxto.fillStyle = 'red'
// Con fillText mostramos y definimos: "Lo que va a aparecer como texto sólido", 
// dimensión de x, dimensión de y.
contxto.fillText("Alexito", 15, 40);

// Texto de trazado.
contxto.strokeStyle = 'blue';
contxto.font = "30px Arial";
// Con strokeText mostramos y definimos: "Lo que va a aparecer como texto sólido", 
// situación del texto en x, situación del texto en y.
contxto.strokeText("Paula", 100, 80);
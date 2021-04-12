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

//-- Dibujar un circulo: coordenadas x,y del centro
//-- Radio, Angulo inicial y angulo final.
contxto.arc(100, 50, 30, 0, 2 * Math.PI);

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
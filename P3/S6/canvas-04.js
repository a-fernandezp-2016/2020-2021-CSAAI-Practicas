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

// Definimos el pto de partida (x,y) de una línea horizontal. x = varía e y = cte.
contxto.moveTo(10,20);

// Definimos el pto final de la línea horizontal.
contxto.lineTo(100,20);

// Definimos otra línea horizontal en otra parte del canvas.
contxto.moveTo(10,80);
contxto.lineTo(150,80);

// Unimos una línea vertical (x,y) a la anterior línea horizontal. En vertical: x = cte e y = varía.
contxto.lineTo(150,20);

// Coloreamos las líneas o trazados de color rojo.
contxto.strokeStyle = 'red';

// Editar el grosor de las líneas o trazos.
contxto.lineWidth = 5;

// Mostrar o dibujar los trazados.
contxto.stroke();

// Cerrar delimitación de los objetos en 2D.
contxto.closePath();
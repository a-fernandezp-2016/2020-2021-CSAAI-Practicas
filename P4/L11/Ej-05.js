console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

// Obtener el elemento del deslizador del canal R para interconectarlo con la pag HTML.
const deslizadorR = document.getElementById('deslizadorR');
// Obtener el elemento del deslizador del canal G para interconectarlo con la pag HTML.
const deslizadorG = document.getElementById("deslizadorG");
// Obtener el elemento del deslizador del canal B para interconectarlo con la pag HTML.
const deslizadorB = document.getElementById("deslizadorB");

// Crear el elemento del botón para cambiar a escala de grises.
const escalaGrises = document.getElementById("scale_gray");

// Obtener el elemento del display del deslizador del canal R para interconectarlo con la pag HTML.
const displayR = document.getElementById('displayR');
// Obtener el elemento del display del deslizador del canal G para interconectarlo con la pag HTML.
const displayG = document.getElementById('displayG');
// Obtener el elemento del display del deslizador del canal B para interconectarlo con la pag HTML.
const displayB = document.getElementById('displayB');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () 
{

    //-- Se establece como tamaño del canvas el mismo
    //-- que el de la imagen original
    canvas.width = img.width;
    canvas.height = img.height;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img,0,0);

    // Mensaje indicando que la imagen ya está puesta en el canvas.
    console.log("Imagen lista...");
};

//-- Funcion de retrollamada del deslizador del canal R.
deslizadorR.oninput = () => 
{
    //-- Mostrar el nuevo valor del deslizador R en su display.
    displayR.innerHTML = deslizadorR.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let dataR = imgData.data

    //-- Obtener el umbral de rojo del deslizador.
    umbralR = deslizadorR.value

    //-- Filtrar la imagen según el nuevo umbral de R.
    for (let i = 0; i < dataR.length; i+=4) 
    {
        if(dataR[i] > umbralR)
        {
            dataR[i] = umbralR;
        }
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
};

//-- Funcion de retrollamada del deslizador del canal G.
deslizadorG.oninput = () => 
{
    //-- Mostrar el nuevo valor del deslizador G en su display.
    displayG.innerHTML = deslizadorG.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let dataG = imgData.data

    //-- Obtener el umbral de verde del deslizador.
    umbralG = deslizadorG.value

    //-- Filtrar la imagen según el nuevo umbral de G.
    for(let i = 1; i < dataG.length; i+=4)
    {
        if(dataG[i] > umbralG)
        {
            dataG[i] = umbralG;
        }
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
};

//-- Funcion de retrollamada del deslizador del canal B.
deslizadorB.oninput = () => 
{
    //-- Mostrar el nuevo valor del deslizador B en su display.
    displayB.innerHTML = deslizadorB.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let dataB = imgData.data

    //-- Obtener el umbral de azul del deslizador.
    umbralB = deslizadorB.value

    //-- Filtrar la imagen según el nuevo umbral de B.
    for(let i = 2; i < dataB.length; i+=4)
    {
        if(dataB[i] > umbralB)
        {
            dataB[i] = umbralB;
        }
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
};

escalaGrises.onclick = () => 
{
    brillo = (3 * umbralR + 4 * umbralG + umbralB)/8;
}

console.log("Fin...");
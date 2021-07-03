// Mensaje de inicio del procesado de las 2 imágenes.
console.log("Empieza el PROCESADO DE LAS 2 IMÁGENES");

// Interconexión de elementos de HTML con elementos de JS.
const Lienzo_Img_Manipulada = document.getElementById('canvasManip');
const BotonA = document.getElementById('butA');
const BotonB = document.getElementById('butB');
const ImagenA = document.getElementById('imgA');
const ImagenB = document.getElementById('imgB');

// Para insertar imágenes en el canvas o en el Lienzo de la Imagen Manipulada.
const paintImgManipulate = Lienzo_Img_Manipulada.getContext('2d');

// Configuración de Estados o fases para llevar un orden.
// Estado INIT => 0 => donde elegimos si manipular la imagen A o la B.
// Estado MANIPULATE => 1 => nos disponemos a manipular la imagen elegida.
// Estado FINAL => 2 => si pulsamos el botón de cambiar a la otra imagen, volvemos al Estado INIT.
const ESTADO = {
    INIT: 0,
    MANIPULATE: 1,
    FINAL: 2
}
// Inicializar la variable fase con el objeto literal Estado de 0.
let fase = ESTADO.INIT;

// Función que dibuja la imagen de A en la imagen manipulada.
function insertImgA()
{
    //-- Se establece el tamaño de la imagen A en la imagen manipulada.
    Lienzo_Img_Manipulada.width = ImagenA.width;
    Lienzo_Img_Manipulada.height = ImagenA.height;

    //-- Insertar la imagen A como imagen manipulada, sin hacer manipulaciones todavía.
    paintImgManipulate.drawImage(ImagenA,0,0);

    // Mensaje indicando que la imagen A ya está puesta en el canvas o en el Lienzo de la Imagen Manipulada.
    console.log("Imagen A lista para manipular.....");
}
// Función que dibuja la imagen de B en la imagen manipulada.
function insertImgB()
{
    //-- Se establece el tamaño de la imagen B en la imagen manipulada.
    Lienzo_Img_Manipulada.width = ImagenB.width;
    Lienzo_Img_Manipulada.height = ImagenB.height;

    //-- Insertar la imagen B como imagen manipulada, sin hacer manipulaciones todavía.
    paintImgManipulate.drawImage(ImagenB,0,0);

    // Mensaje indicando que la imagen B ya está puesta en el canvas o en el Lienzo de la Imagen Manipulada.
    console.log("Imagen B lista para manipular.....");
}

// Se pulsa el botón de la imagen A.
BotonA.onclick = () => 
{
    if(fase == ESTADO.INIT)
    {
        // Pasamos a la fase de manipulación o Estado 1.
        fase = ESTADO.MANIPULATE;
        // Cargamos la función de la imagen de A.
        ImagenA.onload = insertImgA();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Se pulsa el botón de la imagen B.
BotonB.onclick = () => 
{
    if(fase == ESTADO.INIT)
    {
        // Pasamos a la fase de manipulación o Estado 1.
        fase = ESTADO.MANIPULATE;
        // Cargamos la función de la imagen de B.
        ImagenB.onload = insertImgB();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Mensaje de inicio del procesado de las 2 imágenes.
console.log("Empieza el PROCESADO DE LAS 2 IMÁGENES");

// Interconexión de elementos de HTML con elementos de JS.
const LienzoImgManipulada = document.getElementById('canvasManip');
const BotonA = document.getElementById('butA');
const BotonB = document.getElementById('butB');
const BotonInicio = document.getElementById('homeBut');
const ImagenA = document.getElementById('imgA');
const ImagenB = document.getElementById('imgB');

// Para insertar imágenes en el canvas o en el Lienzo de la Imagen Manipulada.
const paintImgManipulate = LienzoImgManipulada.getContext('2d');

// Configuración de Estados o fases para llevar un orden.
// Estado INIT => 0 => donde elegimos si manipular la imagen A o la B.
// Estado MANIPULATE => 1 => nos disponemos a manipular la imagen elegida. Aquí
// podemos volver al Estado inicial 0, al pulsar el botón de la casa o inicio.
const ESTADO = {
    INIT: 0,
    MANIPULATE: 1
}
// Inicializar la variable fase con el objeto literal Estado de 0.
let fase = ESTADO.INIT;

// Función que dibuja la imagen de A en la imagen manipulada.
function insertImgA()
{
    //-- Se establece el tamaño de la imagen A en la imagen manipulada.
    LienzoImgManipulada.width = ImagenA.width;
    LienzoImgManipulada.height = ImagenA.height;

    //-- Insertar la imagen A como imagen manipulada, sin hacer manipulaciones todavía.
    paintImgManipulate.drawImage(ImagenA,0,0);

    // Mensaje indicando que la imagen A ya está puesta en el canvas o en el Lienzo de la Imagen Manipulada.
    console.log("Imagen A lista para manipular.....");
}
// Función que dibuja la imagen de B en la imagen manipulada.
function insertImgB()
{
    //-- Se establece el tamaño de la imagen B en la imagen manipulada.
    LienzoImgManipulada.width = ImagenB.width;
    LienzoImgManipulada.height = ImagenB.height;

    //-- Insertar la imagen B como imagen manipulada, sin hacer manipulaciones todavía.
    paintImgManipulate.drawImage(ImagenB,0,0);

    // Mensaje indicando que la imagen B ya está puesta en el canvas o en el Lienzo de la Imagen Manipulada.
    console.log("Imagen B lista para manipular.....");
}

// Se pulsa el botón de la imagen A para añadir dicha imagen en el lienzo de la imagen manipulada.
BotonA.onclick = () => 
{
    if(fase == ESTADO.INIT)
    {
        // Pasamos a la fase de manipulación o Estado 1.
        fase = ESTADO.MANIPULATE;
        // Cargamos la función de la imagen de A (es decir, cargamos la imagen en su posición).
        ImagenA.onload = insertImgA();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Se pulsa el botón de la imagen B para añadir dicha imagen en el lienzo de la imagen manipulada.
BotonB.onclick = () => 
{
    if(fase == ESTADO.INIT)
    {
        // Pasamos a la fase de manipulación o Estado 1.
        fase = ESTADO.MANIPULATE;
        // Cargamos la función de la imagen de B (es decir, cargamos la imagen en su posición).
        ImagenB.onload = insertImgB();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Se pulsa el botón de la casa (inicio), para volver al Estado inicial a elegir de nuevo imagen.
BotonInicio.onclick = () =>
{
    if(fase == ESTADO.MANIPULATE)
    {
        // Pasamos a la fase inicial o Estado 0.
        fase = ESTADO.INIT;
        // Mensaje indicando que se ha vuelto a la fase inicial, a elegir imagen de nuevo.
        console.log("Vuelve a elegir una imagen.....");
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
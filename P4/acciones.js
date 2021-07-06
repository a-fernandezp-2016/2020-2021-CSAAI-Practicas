// Mensaje de inicio del procesado de las 2 imágenes.
console.log("Empieza el PROCESADO DE LAS 2 IMÁGENES");

// Interconexión de elementos de HTML con elementos de JS.
const LienzoImgManipulada = document.getElementById('canvasManip');
const BotonA = document.getElementById('butA');
const BotonB = document.getElementById('butB');
const BotonInicio = document.getElementById('homeBut');
const ImagenA = document.getElementById('imgA');
const ImagenB = document.getElementById('imgB');
const EscalaGrises = document.getElementById('grayBut');

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

// Variable que indica si estamos trabajando con la imagen A = 1, o la imagen B = 2.
let choice = 1;

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

// Función que borra la imagen A y de B.
function borraImgs()
{
    // Se borra la imagen del lienzo de la imagen manipulada.
    paintImgManipulate.clearRect(0,0,LienzoImgManipulada.width, LienzoImgManipulada.height);
    // Mensaje en consola.
    console.log("Imagen borrada de nuevo....");
}
// Función que accede a los px de la imagen.
function accesoPxenGrises()
{
    // Variable que accede a los datos o px de la imagen.
    let imgData = paintImgManipulate.getImageData(0, 0, LienzoImgManipulada.width, LienzoImgManipulada.height);
    // Variable que accede px a px de la imagen.
    let data = imgData.data
    //-- Obtener el numero de pixel a partir de su posicion
    let i = 200 + 50*LienzoImgManipulada.width;
    // Creamos el elemento de la escala de grises.
    gris_Scale = parseInt((data[i*4] + data[i*4 + 1] + data[i*4 + 2]) / 3);
    // Actualizar px a px en escala de grises.
    data[i*4] = gris_Scale;    
    data[i*4 + 1] = gris_Scale;  
    data[i*4 + 2] = gris_Scale;
    //-- Poner la imagen modificada en el canvas.
    paintImgManipulate.putImageData(imgData, 0, 0);
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
        // Ponemos variable choice a 1.
        choice = 1;
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
        // Ponemos variable choice a 2.
        choice = 2;
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
        if(choice == 1)
        {
            // Descargamos la función de la imagen de A (es decir, quitamos la imagen de su posición).
            ImagenA.onUnLoad = borraImgs();
        }
        else if(choice == 2)
        {
            // Descargamos la función de la imagen de B (es decir, quitamos la imagen de su posición).
            ImagenB.onUnLoad = borraImgs();
        }
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Se pulsa el botón escala de grises, para transformar la imagen elegida en escala de grises.
EscalaGrises.onclick = () =>
{
    if(fase == ESTADO.MANIPULATE)
    {
        // Mensaje de selección de imagen en escala de grises.
        console.log("Transformando la imagen a escala de grises...");
        if(choice == 1)
        {
            // Partiendo de la imagen A del inicio, la volvemos a dibujar.
            ImagenA.onload = insertImgA();
            // Pintamos la imagen de A en escala de grises, accediendo a los px de la imagen.
            ImagenA.onload = accesoPxenGrises();
        }
        else if(choice == 2)
        {
            // Partiendo de la imagen B del inicio, la volvemos a dibujar.
            ImagenB.onload = insertImgB();
            // Pintamos la imagen de B en escala de grises, accediendo a los px de la imagen.
            ImagenB.onload = accesoPxenGrises();
        }
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
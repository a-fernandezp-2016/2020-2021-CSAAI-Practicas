// Mensaje de inicio del procesado de las 2 imágenes.
console.log("Empieza el PROCESADO DE LAS 2 IMÁGENES");

// Elementos o ctes de las propias imágenes a manipular.
const ImagenA = document.getElementById('imgA');
const ImagenB = document.getElementById('imgB');

// Elemento o cte del canvas o del lienzo donde estará la imagen a manipular.
const LienzoImgManipulada = document.getElementById('canvasManip');

// Elementos o ctes de los botones para poder elegir la imagen a manipular.
const BotonA = document.getElementById('butA');
const BotonB = document.getElementById('butB');

// Elemento o cte del botón de inicio, para volver al estado inicial y poder elegir de nuevo imagen.
const BotonInicio = document.getElementById('homeBut');

// Elementos o ctes de los ajustes de la manipulación de la imagen elegida.
const botonScaleGrises = document.getElementById('grayBut');
const botonRGB = document.getElementById('rgbBut');
const botonVolteo = document.getElementById('rotatBut');
const botonEspec = document.getElementById('especBut');

// Elementos o ctes de los deslizadores de R, G y B.
const deslizaR = document.getElementById('red');
const deslizaG = document.getElementById('green');
const deslizaB = document.getElementById('blue');
// Elementos o ctes de los Displays de los deslizadores de R, G y B.
const displayR = document.getElementById('displayRed');
const displayG = document.getElementById('displayGreen');
const displayB = document.getElementById('displayBlue');
// Ocultación de los deslizadores hasta que se pulse el botón de RGB.
document.getElementById('deslizador').style.display = 'none';

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
    console.log("Vuelve a elegir una imagen...");
}
// Función que accede a los px de la imagen para convertirla en escala de grises.
function EscaladeGrises()
{
    let gris_Scale = 0;
    // Variable que accede a los datos o px de la imagen.
    let imgData = paintImgManipulate.getImageData(0, 0, LienzoImgManipulada.width, LienzoImgManipulada.height);
    // Variable que accede px a px de la imagen.
    let data = imgData.data;
    //-- Bucle for para modificar a grises cada pixel de la imagen.
    for(let i=0; i<data.length; i+=4)
    {
        gris_Scale = (3*data[i] + 4*data[i+1] + data[i+2])/8;
        // Actualizar px a px en escala de grises.
        data[i] = gris_Scale;    
        data[i + 1] = gris_Scale;  
        data[i + 2] = gris_Scale;
    }
    //-- Poner la imagen modificada en el canvas.
    paintImgManipulate.putImageData(imgData, 0, 0);
    // Mensaje de finzalización imagen en escala de grises.
    console.log("Imagen en ESCALA DE GRISES...");
}
// Función para obtener el umbral de R, G o B elegido con su deslizador.
function filtroColores(data)
{
    // Creamos las variables de R G B para dar valor a los canales de cada uno de sus px.
    let red = deslizaR.value;
    let green = deslizaG.value;
    let blue = deslizaB.value;
    // Filtramos la imagen según el nuevo umbral.
    for(let i=0; i<data.length; i+=4)
    {
        if (data[i] > red)
        {
            data[i] = red;
        }
        if (data[i+1] > green)
        {
            data[i+1] = green;
        }
        if (data[i+2] > blue)
        {
            data[i+2] = blue;
        }
    }
}
// Función encargada de voltear 180º la imagen elegida en rgb o en grises.
function drawVolteo()
{
    paintImgManipulate.drawImage(LienzoImgManipulada,0,0);
    paintImgManipulate.translate(0,2*(LienzoImgManipulada.height)/2);
    paintImgManipulate.scale(1,-1);
    paintImgManipulate.drawImage(LienzoImgManipulada,0,0);
}
// Función encargada de poner la imagen elegida en rgb o en grises en espejo o especular.
function drawEspecular()
{
    paintImgManipulate.drawImage(LienzoImgManipulada,0,0);
    paintImgManipulate.translate(2*(LienzoImgManipulada.width)/2,0);
    paintImgManipulate.scale(-1,1);
    paintImgManipulate.drawImage(LienzoImgManipulada,0,0);
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
        // Desactivamos los deslizadores.
        document.getElementById('deslizador').style.display = 'none';
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
botonScaleGrises.onclick = () =>
{
    if(fase == ESTADO.MANIPULATE)
    {
        // Desactivamos los deslizadores.
        document.getElementById('deslizador').style.display = 'none';
        // Mensaje de selección de imagen en escala de grises.
        console.log("Aplicando FILTRO escala de grises...");
        // Pintamos la imagen de A o de B en escala de grises, accediendo a los px de la imagen.
        EscaladeGrises();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Se pulsa el botón RGB, para activar los deslizadores de RGB.
botonRGB.onclick = () =>
{
    if(fase == ESTADO.MANIPULATE)
    {
        // Mensaje de selección de imagen en RGB.
        console.log("Aplicando FILTRO RGB...");
        // Activamos los deslizadores al pulsar el botón de RGB.
        document.getElementById('deslizador').style.display = 'block';
        // Mensaje en consola.
        console.log("Deslizadores activados.....");
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Al mover el deslizador de R.
deslizaR.oninput = () =>
{
    // Mostramos en display el valor del R.
    displayR.innerHTML = deslizaR.value;
    // Variable que accede a los datos o px de la imagen.
    let imgData = paintImgManipulate.getImageData(0, 0, LienzoImgManipulada.width, LienzoImgManipulada.height);
    // Variable que accede px a px de la imagen.
    let data = imgData.data;
    // Obtener el umbral del deslizador R.
    filtroColores(data);
    //-- Poner la imagen modificada en el canvas.
    paintImgManipulate.putImageData(imgData, 0, 0);
    // Mensaje de configuración imagen RGB acabado.
    console.log("LA NUEVA IMAGEN RGB YA ESTÁ LISTA....");
}
// Al mover el deslizador de G.
deslizaG.oninput = () =>
{
    // Mostramos en display el valor del G.
    displayG.innerHTML = deslizaG.value;
    // Variable que accede a los datos o px de la imagen.
    let imgData = paintImgManipulate.getImageData(0, 0, LienzoImgManipulada.width, LienzoImgManipulada.height);
    // Variable que accede px a px de la imagen.
    let data = imgData.data;
    // Obtener el umbral del deslizador G.
    filtroColores(data);
    //-- Poner la imagen modificada en el canvas.
    paintImgManipulate.putImageData(imgData, 0, 0);
    // Mensaje de configuración imagen RGB acabado.
    console.log("LA NUEVA IMAGEN RGB YA ESTÁ LISTA....");
}
// Al mover el deslizador de B.
deslizaB.oninput = () =>
{
    // Mostramos en display el valor del B.
    displayB.innerHTML = deslizaB.value;
    // Variable que accede a los datos o px de la imagen.
    let imgData = paintImgManipulate.getImageData(0, 0, LienzoImgManipulada.width, LienzoImgManipulada.height);
    // Variable que accede px a px de la imagen.
    let data = imgData.data;
    // Obtener el umbral del deslizador B.
    filtroColores(data);
    //-- Poner la imagen modificada en el canvas.
    paintImgManipulate.putImageData(imgData, 0, 0);
    // Mensaje de configuración imagen RGB acabado.
    console.log("LA NUEVA IMAGEN RGB YA ESTÁ LISTA....");
}
// Se pulsa el botón voltear 180º, para dar la vuelta a la imagen verticalmente:
// lo que estaba arriba, pasa a estar abajo y, lo de abajo, a arriba.
botonVolteo.onclick = () =>
{
    if(fase == ESTADO.MANIPULATE)
    {
        // Mensaje de volteo 180º de la imagen en RGB o en escala de grises.
        console.log("Aplicando el ajuste de voltear la imagen 180º...");
        // Volteamos 180º la imagen de A o de B.
        drawVolteo();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Se pulsa el botón Imagen especular, para mostrar la imagen como si se viera en un espejo.
botonEspec.onclick = () =>
{
    if(fase == ESTADO.MANIPULATE)
    {
        // Mensaje de volteo 180º de la imagen en RGB o en escala de grises.
        console.log("Aplicando el ajuste de convertir en imagen especular...");
        // Imagen especular de la imagen de A o de B.
        drawEspecular();
    }
    else
    {
        // Mensaje de acción inválida.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
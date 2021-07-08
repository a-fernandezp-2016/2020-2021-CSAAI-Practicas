// Que comiencen las acciones de javascript del Realizador de TV.
console.log("Ejecutando el Realizador de TV....");

// Obtención del elemento de vídeo principal de emisión en directo desde HTML para configurarlo con JavaScript.
let vidPrincipal = document.getElementById("videoDirecto");

// Obtención de los elementos botones del panel de control.
const botonCamON = document.getElementById("camON");
const botonCamOFF = document.getElementById("camOFF");
const botonVidPadel = document.getElementById("padel");
const botonVidTenis = document.getElementById("tenis");
const botonVidFutbol = document.getElementById("futbol");
const botonImgStatic = document.getElementById("imgStatic");

// Obtención de los elementos de los tres vídeos a elegir, para que el usuario puede ver
// qué está eligiendo.
const VidPadel = document.getElementById("vidPadel");
const VidTenis = document.getElementById("vidTenis");
const VidFutbol = document.getElementById("vidFutbol");

// Imagen de barras verticales indicando que la cámara está apagada.
const ImgBarrasVert = "barrasVerticales_multicolors.png";
// Imagen estática usada.
const ImgStatic = "Imagen_static_FFTV.png";

// Establecer las dimensiones del vídeo en directo.
vidPrincipal.width = 640;
vidPrincipal.height = 360;
// Establecer las dimensiones de los tres vídeos en segundo plano.
VidPadel.width = 426;
VidPadel.height = 240;
VidTenis.width = 426;
VidTenis.height = 240;
VidFutbol.width = 426;
VidFutbol.height = 240;

// Fase de estados para indicar si partimos desde el inicio con cámara OFF o pasamos
// al siguiente estado con cámara en ON.
const ESTADO = {
    INIT = 0,
    EMISION = 1
}

// Variable fase inicializada en la fase 0 o inicial.
let fase = ESTADO.INIT;

// Por defecto, el vídeo principal y los otros 3 están apagados y su imagen son las barras verticales
// multicolor.
vidPrincipal.poster = ImgBarrasVert;
VidPadel.poster = ImgBarrasVert;
VidTenis.poster = ImgBarrasVert;
VidFutbol.poster = ImgBarrasVert;

// Pulsamos el botón de cámara ON para empezar a emitir el vídeo que queramos.
botonCamON.onclick = () => 
{
    if(fase == ESTADO.INIT)
    {
        // Pasamos al estado siguiente.
        fase = ESTADO.EMISION;
        // Se establece por defecto la imagen estática en la emisión del vídeo en directo.
        vidPrincipal.poster = ImgStatic;
        // Se establecen en los 3 vídeos a elegir, sus propios vídeos, sacados del repositorio "videos" que he creado en mi usuario,
        // para poder acceder a ellos, ya que por Google drive no me dejaba.
        VidPadel.src="https://github.com/a-fernandezp-2016/videos/blob/66396c215d86776a306e99e753c0be365b41dd60/videodePadel.mp4";
        VidTenis.src="https://github.com/a-fernandezp-2016/videos/blob/66396c215d86776a306e99e753c0be365b41dd60/videodeTenis.mp4";
        VidFutbol.src="https://github.com/a-fernandezp-2016/videos/blob/66396c215d86776a306e99e753c0be365b41dd60/videodeFutbol.mp4";
        // Los vídeos en segundo plano, se reproducen desde el principio.
        VidPadel.currentTime = 0;
        VidPadel.play();
        VidTenis.currentTime = 0;
        VidTenis.play();
        VidFutbol.currentTime = 0;
        VidFutbol.play();
        // Y dichos vídeos deben estar MUTEADOS = EN SILENCIO.
        VidPadel.muted = true;
        VidTenis.muted = true;
        VidFutbol.muted = true;
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado inicial, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Pulsamos el botón de cámara OFF para apagar la cámara de TV en emisión y los otros 3 vídeos.
botonCamOFF.onclick = () => 
{
    if(fase == ESTADO.EMISION)
    {
        // Volvemos al estado inicial.
        fase = ESTADO.INIT;
        // Establecemos la imagen de las barras verticales multicolor en los 4 vídeos,
        // lo que significa que las cámaras están apagadas.
        vidPrincipal.poster = ImgBarrasVert;
        VidPadel.poster = ImgBarrasVert;
        VidTenis.poster = ImgBarrasVert;
        VidFutbol.poster = ImgBarrasVert;
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
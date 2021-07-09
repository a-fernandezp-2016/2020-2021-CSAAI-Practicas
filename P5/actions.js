// Que comiencen las acciones de javascript del Realizador de TV.
console.log("Ejecutando el Realizador de TV....");

// Obtención del elemento de vídeo principal de emisión en directo desde HTML para configurarlo con JavaScript.
let vidPrincipal = document.getElementById("videoDirecto");

// Obtención de los elementos botones del panel de control.
const botonCamON = document.getElementById("camON");
const botonCamOFF = document.getElementById("camOFF");
const botonCamera1 = document.getElementById("Cam1");
const botonCamera2 = document.getElementById("Cam2");
const botonCamera3 = document.getElementById("Cam3");
const botonImgStatic = document.getElementById("imgStatic");

// Obtención de los elementos de los tres vídeos a elegir, para que el usuario puede ver
// qué está eligiendo.
const Camera1 = document.getElementById("videoCam1");
const Camera2 = document.getElementById("videoCam2");
const Camera3 = document.getElementById("videoCam3");

// Imagen de barras verticales indicando que la cámara está apagada, para escena en directo.
const ImgBarrasVertPrinc = "barrasVertTV_640x360.jpg";
// Imagen de barras verticales indicando que la cámara está apagada, para los vídeos de la Cámara de TV en segundo plano.
const ImgBarrasVertSecun = "barrasVertTV_426x240.png";
// Imagen estática usada.
const ImgStatic = "Imagen_static_FFTV.png";

// Establecer las dimensiones del vídeo en directo.
vidPrincipal.width = 640;
vidPrincipal.height = 360;
// Establecer las dimensiones de los tres vídeos de Cámara de TV en segundo plano = más pequeños.
Camera1.width = 426;
Camera1.height = 240;
Camera2.width = 426;
Camera2.height = 240;
Camera3.width = 426;
Camera3.height = 240;

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
vidPrincipal.poster = ImgBarrasVertPrinc;
Camera1.poster = ImgBarrasVertSecun;
Camera2.poster = ImgBarrasVertSecun;
Camera3.poster = ImgBarrasVertSecun;

// Pulsamos el botón de cámara ON para empezar a emitir el vídeo que queramos.
botonCamON.onclick = () => 
{
    console.log("ESTADO INICIAL: 0.");
    if(fase == ESTADO.INIT)
    {
        // Pasamos al estado siguiente.
        fase = ESTADO.EMISION;
        // Se establece por defecto la imagen estática en la emisión del vídeo en directo.
        vidPrincipal.poster = ImgStatic;
        // Se establacen por defecto, los tres vídeos en remoto de la URJC, en su propia posición de
        // segundo plano.
        Camera1.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
        Camera2.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
        Camera3.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";
        // Los vídeos en segundo plano, se reproducen desde el principio.
        Camera1.currentTime = 0;
        Camera1.play();
        Camera2.currentTime = 0;
        Camera2.play();
        Camera3.currentTime = 0;
        Camera3.play();
        // Y dichos vídeos deben estar MUTEADOS = EN SILENCIO.
        Camera1.muted = true;
        Camera2.muted = true;
        Camera3.muted = true;
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
        console.log("ESTADO EN EMISIÓN: 1.");
        // Volvemos al estado inicial.
        fase = ESTADO.INIT;
        // Establecemos la imagen de las barras verticales multicolor en los 4 vídeos,
        // lo que significa que las cámaras están apagadas.
        vidPrincipal.poster = ImgBarrasVertPrinc;
        VidPadel.poster = ImgBarrasVertSecun;
        VidTenis.poster = ImgBarrasVertSecun;
        VidFutbol.poster = ImgBarrasVertSecun;
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
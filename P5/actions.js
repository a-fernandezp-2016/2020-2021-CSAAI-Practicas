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
// Imagen estática usada para escena en directo y para los vídeos de la Cámara de TV en segundo plano.
const ImgStaticPrinc = "Img_Static_640x360.png";
const ImgStaticSecun = "Img_Static_426x240.png";

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
    INIT: 0,
    EMISION: 1
}

// Variable fase inicializada en la fase 0 o inicial.
let fase = ESTADO.INIT;

// Por defecto, el vídeo principal y los otros 3 están apagados y su imagen son las barras verticales
// multicolor.
vidPrincipal.poster = ImgBarrasVertPrinc;
Camera1.poster = ImgBarrasVertSecun;
Camera2.poster = ImgBarrasVertSecun;
Camera3.poster = ImgBarrasVertSecun;

// Función para establacer en cada vídeo de segundo plano, su propio vídeo.
function videosSecondPlane()
{
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
// Función para establacer el vídeo en directo.
function videoOnLive()
{
    // Reproducción con play desde el principio y con sonido.
    vidPrincipal.currentTime = 0;
    vidPrincipal.play();
    vidPrincipal.muted = false;
}
Camera1.currentTime = 0;
    Camera1.play();
// Pulsamos el botón de cámara ON para empezar a emitir los videos en segundo plano y el vídeo en directo con imagen estática.
botonCamON.onclick = () => 
{
    if(fase == ESTADO.INIT)
    {
        console.log("¡QUÉ EMPIECE EL ESPECTÁCULO!");
        // Pasamos al estado siguiente.
        fase = ESTADO.EMISION;
        // Se establece por defecto la imagen estática en la emisión del vídeo en directo.
        vidPrincipal.src = ImgStaticPrinc;
        // Llamar a la función para establacer en cada vídeo de segundo plano, su propio vídeo.
        videosSecondPlane();
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
        console.log("¡Adiós! ¡HASTA PRONTO!");
        // Volvemos al estado inicial.
        fase = ESTADO.INIT;
        // Establecemos la imagen de las barras verticales multicolor en los 4 vídeos,
        // lo que significa que las cámaras están apagadas.
        vidPrincipal.src = ImgBarrasVertPrinc;
        Camera1.src = ImgBarrasVertSecun;
        Camera2.src = ImgBarrasVertSecun;
        Camera3.src = ImgBarrasVertSecun;
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Pulsamos el botón de Imagen estática, para poner los vídeos en 2º plano y el de directo con dicha imagen.
botonImgStatic.onclick = () =>
{
    if(fase == ESTADO.EMISION)
    {
        console.log("Imagen estática....");
        // Establecemos la imagen estática en los 4 vídeos.
        vidPrincipal.src = ImgStaticPrinc;
        Camera1.src = ImgStaticSecun;
        Camera2.src = ImgStaticSecun;
        Camera3.src = ImgStaticSecun;
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Pulsamos el botón de Cámara de TV 1, para emitir en directo el contenido de la cámara 1.
botonCamera1.onclick = () =>
{
    if(fase == ESTADO.EMISION)
    {
        console.log("Cámara 1.");
        // Se establece en el vídeo en directo => el contenido de la cámara 1.
        vidPrincipal.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
        // Llamar a la función para establacer el vídeo en directo.
        videoOnLive();
        // Llamar a la función para establacer en cada vídeo de segundo plano, su propio vídeo.
        videosSecondPlane();
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Pulsamos el botón de Cámara de TV 2, para emitir en directo el contenido de la cámara 2.
botonCamera2.onclick = () =>
{
    if(fase == ESTADO.EMISION)
    {
        console.log("Cámara 2.");
        // Se establece en el vídeo en directo => el contenido de la cámara 2.
        vidPrincipal.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
        // Llamar a la función para establacer el vídeo en directo.
        videoOnLive();
        // Llamar a la función para establacer en cada vídeo de segundo plano, su propio vídeo.
        videosSecondPlane();
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
// Pulsamos el botón de Cámara de TV 3, para emitir en directo el contenido de la cámara 3.
botonCamera3.onclick = () =>
{
    if(fase == ESTADO.EMISION)
    {
        console.log("Cámara 3.");
        // Se establece en el vídeo en directo => el contenido de la cámara 3.
        vidPrincipal.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";
        // Llamar a la función para establacer el vídeo en directo.
        videoOnLive();
        // Llamar a la función para establacer en cada vídeo de segundo plano, su propio vídeo.
        videosSecondPlane();
    }
    else
    {
        // Mensaje indicando que pulsar el bóton en otro momento al estado en emisión, es un proceso inválido.
        console.log("PROCESO NO VÁLIDO, LO SIENTO.");
    }
}
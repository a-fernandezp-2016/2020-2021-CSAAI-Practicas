// Que comiencen las acciones de javascript del Realizador de TV.
console.log("Ejecutando el Realizador de TV....");

// Obtención del elemento de vídeo principal de emisión en directo desde HTML para configurarlo con JavaScript.
const vidPrincipal = document.getElementById("videoDirecto");

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

// Imagen estática usada.
const ImgStatic = "Imagen_static_FFTV.png";
//-- Establecer la fuente del vídeo del Pádel.
VidPadel.src="https://www.youtube.com/embed/7HPBipFv4_I";
//-- Establecer la fuente del vídeo del Tenis.
VidTenis.src="https://www.youtube.com/embed/3bnmkMx2x_8";
//-- Establecer la fuente del vídeo del Fútbol.
VidFutbol.src="https://www.youtube.com/embed/hpIyRpVQjUY";

// Establecer las dimensiones del vídeo en directo y de los tres vídeos a elegir.
// Obviamente, los tres a elegir son más pequeños y sin sonido porque el importante es el del directo.
vidPrincipal.width = 640;
vidPrincipal.height = 360;
VidPadel.width = 426;
VidPadel.height = 240;
VidTenis.width = 426;
VidTenis.height = 240;
VidFutbol.width = 426;
VidFutbol.height = 240;
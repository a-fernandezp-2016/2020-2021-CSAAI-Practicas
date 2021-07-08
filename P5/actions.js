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

// Establecer las dimensiones del vídeo en directo.
vidPrincipal.width = 640;
vidPrincipal.height = 360;
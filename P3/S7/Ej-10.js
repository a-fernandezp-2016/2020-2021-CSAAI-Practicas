console.log("Ejecutando JS...");

const video = document.getElementById("video");
const play = document.getElementById("play");
const big = document.getElementById("big");
const small = document.getElementById("small");
const reinicio = document.getElementById("reiniciar");

play.onclick = () => {
 if (video.paused)
   video.play()
 else {
   video.pause()
 }
}

big.onclick = () => {
 video.width = 600;
 video.height = 400;
}

small.onclick = () => {
 video.width = 300;
 video.height = 200;
}

reinicio.onclick = () => {
 video.currentTime = 2;
}
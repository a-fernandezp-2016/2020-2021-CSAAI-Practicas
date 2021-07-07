//-- Obtener elementos del DOM
//coontexto del canvas
const canvas = document.getElementById('canvas');
const img1 = document.getElementById('image1');
const img2 = document.getElementById('image2')
const ctx = canvas.getContext('2d');

//Constantes de los deslizadores
const desRojo = document.getElementById('rojo');
const desVerde = document.getElementById('verde');
const desAzul = document.getElementById('azul');

//Constantes de los botones
const bColores = document.getElementById('colores');

//-- Valor de los deslizadores
const value_rojo = document.getElementById('valueR');
const value_verde = document.getElementById('valueG');
const value_azul = document.getElementById('valueB');

//oculto los deslizadores inicialmente
document.getElementById('sliders').style.display = 'none';
document.getElementById('invertidores').style.display = 'none';

//imagen de antes 
//empezamos con la imagen 1 aunq hay que seleecionarla para empezar
var test = new Image(500,283);
test.src = 'Avatar1.jpg';

test.onload = function(){
  canvas.width = test.width;
  canvas.height = test.height;
  ctx.drawImage(test, 0,0);
};
img = img1;
//Selección de imágenes
//cuando pinchas en una imagen
image1.onclick = () => {
    console.log("Imagen 1");
    img1.style.border="rgb(22, 122, 2) 4px solid";
    img2.style.border="black 2px solid";
    img1.src="pp.jpg";
    document.getElementById('sliders').style.display = 'none';
}
image2.onclick = () => {
    console.log("Imagen 2");
    img2.style.border="rgb(22, 122, 2) 4px solid";
    img1.style.border="black 2px solid";
    img2.src="ww.jpg";
    document.getElementById('sliders').style.display = 'none';
}

//Función de retrollamada de imagen cargada
//una vez pinchado en la imagen la cargo en el canvas 
img1.onload = function(){
    img = img1 ;
    canvas.width = img1.width;
    canvas.height = img1.height;
    ctx.drawImage(img1, 0, 0);
    console.log("Imagen1 ready");
    deslizadores();
    
  };

img2.onload = function(){
    img= img2 ;
    canvas.width = img2.width;
    canvas.height = img2.height;
    ctx.drawImage(img2, 0, 0);
    console.log("Imagen2 ready");
    deslizadores();
    
};

//filtro de los colores
function filtroColores(data){
  var umbralR = desRojo.value;
  var umbralG = desVerde.value;
  var umbralB = desAzul.value;
  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
    }
}

//funcion para cuando manejo los deslizadores
function deslizadores(){
  
  ctx.drawImage(img, 0,0); //retrollamada de los deslizadores
  
  desRojo.oninput = () => {
    value_rojo.innerHTML = desRojo.value;//muestro el nuevo valor del deslizador
    ctx.drawImage(img, 0,0); //Situo la imagen 1 en el canvas
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//Obtener la imagen del canvas en pixeles
    let data = imgData.data; //Obtener el array con todos los píxeles
    filtroColores(data); // Obtener el umbral del rojo según del deslizador
    //Insertar imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  desVerde.oninput = () => {
    value_verde.innerHTML = desVerde.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    //-- Obtener el umbral del del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }

  desAzul.oninput = () => {
    value_azul.innerHTML = desAzul.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    //-- Obtener el umbral del azul del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }
}
 //para que se desplieguen los deslizadores
 bColores.onclick = () => {
  ctx.drawImage(img, 0,0);
  console.log("activo deslizadores");
  document.getElementById('sliders').style.display = 'block';
  document.getElementById('invertidores').style.display = 'none';
}
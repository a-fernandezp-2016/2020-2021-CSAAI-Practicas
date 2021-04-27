//-- Boton normal.
const botonGeneral = document.getElementById("boton1");
const botonDescrip = document.getElementById("boton1_descrip");

//-- Checkbox.
const c1 = document.getElementById("checkbox1");
const c2 = document.getElementById("checkbox2");
const c1_test = document.getElementById("c1_test");
const c2_test = document.getElementById("c2_test");

//-- Botones radio
const r1 = document.getElementById("radio1");
const r2 = document.getElementById("radio2");
const r3 = document.getElementById("radio3");
const r4 = document.getElementById("radio4");
const r_disp = document.getElementById("radio_display");

//-- Entradas de texto 1,2 y 3 con sus párrafos de visualización
const text1 = document.getElementById("text1");
const text1_disp = document.getElementById("text1_disp");
const text2 = document.getElementById("text2");
const text2_disp = document.getElementById("text2_disp");
const text3 = document.getElementById("text3");
const text3_disp = document.getElementById("text3_disp");

//-- Entrada de texto tipo password y su display asociado
const passw = document.getElementById("passw");
const passw_disp = document.getElementById("passw_disp");

// Números de incremento en caja.
const num1 = document.getElementById("num1");
const num1_disp = document.getElementById("num1_disp");

// Números del deslizador.
const range = document.getElementById("range");
const range_disp = document.getElementById("range_disp");
const range_disp2 = document.getElementById("range_disp2");

// Clickando en el fondo con tecla Espacio.
const click_espacio = document.getElementById("pulsa_espacio");

// Pulsando tecla cualquiera y aparece debajo de su texto.
const display = document.getElementById("display");

//--Obtener los botones
const click = document.getElementById("click")
const what = document.getElementById("what");

//-- Crear los elementos de sonido
const click_sound = new Audio('click.mp3');
const what_sound = new Audio('what.mp3');

// Funciones de ejecución.

//-- Boton normal.
botonGeneral.onclick = () => {
    //-- Cambiar de color el texto
    if (botonDescrip.style.color == "") {
        botonDescrip.style.color = "yellow";
    } else {
        botonDescrip.style.color = "";
    }
}

//---- Botones checkbox
c1.onchange = () => {
    if (c1.checked) {
        c1_test.style.color = "red";
    } else {
        c1_test.style.color = "";
    }
}

c2.onchange = () => {
    if (c2.checked) {
        c2_test.style.color = "red";
    } else {
        c2_test.style.color = "";
    }
}

//-- Botones radio

r1.onchange = () => {
    r_disp.innerHTML = "b1";   
}

r2.onchange = () => {
    r_disp.innerHTML = "b2";   
}

r3.onchange = () => {
    r_disp.innerHTML = "b3";   
}

r4.onchange = () => {
    r_disp.innerHTML = "b4";   
}

//-- Retrollamadas de la entrada 1
text1.oninput = () => {
    text1_disp.innerHTML = "Escribiendo..."
}

text1.onchange = () => {
    text1_disp.innerHTML=text1.value;
}

text2.oninput = () => {
    text2_disp.innerHTML = "Escribiendo..."
}

//-- Retrollamada de la entrada 2
text2.onchange = () => {
    text2_disp.innerHTML = text2.value; 
}

//-- Retrollamada de la entrada 3
text3.onchange = () => {
    text3_disp.innerHTML = text3.value; 
}

//-- Retrollamada de la entrada 4
passw.onchange = () => {
    passw_disp.innerHTML = passw.value;
}

num1.onchange = () => {
    if (num1.value != "") {
      num1_disp.innerHTML = num1.value;
    }
}

range.oninput = () => {
    range_disp.innerHTML = range.value;
}

range.onchange = () => {
  range_disp2.innerHTML = range.value;
}

//-- Funcion de retrollamada de tecla pulsada
window.onkeydown = (e) => {
  
    //-- Comprobar si la tecla es un espacio
    if (e.key == ' ') {
  
      //-- Cambiar la activación de la clase color
      click_espacio.classList.toggle("color");
    }
}

//-- Tecla pulsada: Mostrar su información
window.onkeydown = (e)=> {
    display.innerHTML = `Tecla: ${e.key}. Código: ${e.keyCode}`
}

//-- Tecla liberada: Borrar el párrafo
 window.onkeyup = (e) => {
   display.innerHTML = ""
}

click.onclick = () => {
    click_sound.currentTime = 0;
    click_sound.play();
}
  
what.onclick = () => {
    what_sound.currentTime = 0;
    what_sound.play();
}
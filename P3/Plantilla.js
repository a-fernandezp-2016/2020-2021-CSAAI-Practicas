//-- Declaración de variables y objetos

//-- Obtención del canvas y de los elementos HTML a usar

//-- Función principal de actualización
function update() 
{
    //-- Implementación del algoritmo de animación:

    //-- 1) Actualizar posicion de los elementos.
    //-- Fisica del movimiento rectilíneo uniforme horizontal.
    x = x + VELX;
    //-- Fisica del movimiento rectilíneo uniforme vertical.
    y = y + VELY;
    //-- Física del movimiento rectilineo uniforme bidimensional.
    x = x + VELX;
    y = y + VELY;
    //-- Física del movimiento uniformemente acelerado bidimensional.
    //-- Actualizar las posiciones según la velocidad actual
    x = x + velx;
    y = y + vely;
    //-- Actualizar las velocidades según las aceleraciones
    velx = velx + ACCELX;
    vely = vely + ACCELY;
    //-- Rebote en pared vertical: cambiar el signo de la velocidad x.
    velx = -velx;

    //-- 2) Borrar el canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- 3) Pintar los elementos en el canvas

    //-- 4) Repetir
    requestAnimationFrame(update);
}

//-- Otras funciones....

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez.
update();
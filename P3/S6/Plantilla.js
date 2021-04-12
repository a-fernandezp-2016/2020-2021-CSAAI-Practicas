//-- Declaración de variables y objetos

//-- Obtención del canvas y de los elementos HTML a usar

//-- Función principal de actualización
function update() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posicion de los elementos

  //-- 2) Borrar el canvas

  //-- 3) Pintar los elementos en el canvas

  //-- 4) Repetir
  requestAnimationFrame(update);
}

//-- Otras funciones....

//-- ¡Que comience la fiesta! Hay que llamar a update la primera vez
update();
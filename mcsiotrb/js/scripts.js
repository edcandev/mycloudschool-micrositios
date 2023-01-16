//arreglo que contiene las respuestas correctas
let correctas = [3,1,2,2,3];

// arreglo donde se guardan las respuestas del usuario
let opcion_elegido=[];

let cantidad_correctas=0;

//funcion que toma el num de pregunta y el unput elegido de esa pregunta
function respuesta(num_pregunta, seleccionada){
    //guardo la respuesta elegida
    opcion_elegido[num_pregunta] = seleccionada.value;

    //el siguiente codigo es para poner
    //el fondo de los inputs
    //armo el id para seleccionar el section correspondiente
}
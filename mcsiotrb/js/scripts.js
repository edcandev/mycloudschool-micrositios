//arreglo que contiene las respuestas correctas
let correctas = [4,3,1];

// arreglo donde se guardan las respuestas del usuario
let opcion_elegido=[];

let cantidad_correctas=0;

//funcion que toma el num de pregunta y el unput elegido de esa pregunta
function respuesta(num_pregunta, seleccionada){
    //guardo la respuesta elegida
    opcion_elegido[num_pregunta] = seleccionada.value;

    //el siguiente codigo es para poner
    //el fondo de los inputs para cuanod eliga otra opcion
    //armo el id para seleccionar el section correspondiente
    id="p" + num_pregunta;

    labels = document.getElementById(id).childNodes;
    labels[3].style.backgroundColor = "white";
    labels[5].style.backgroundColor = "white";
    labels[7].style.backgroundColor = "white";

    //doy el color a label seleccionado
    seleccionada.parentNode.style.backgroundColor = "cec0fc";
}

//funcion que compara los arreglos para saber cuantas estuvieron correctas
function corregir(){
    cantidad_correctas = 0;
    for(i=0; i < correctas.length;i++){
        if(correctas[i]==opcion_elegido[i]){
            cantidad_correctas++;
        }
    }
    document.getElementById("resultado").innerHTML = cantidad_correctas;
}
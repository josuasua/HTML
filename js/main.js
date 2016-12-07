/**
 * Created by Josu on 29/11/2016.
 */

$.noConflict();

jQuery(document).ready(function( $ ){
    var nombre = "Josu";
    console.log("Hola " + nombre);
    var valor = $("#buscar").val(); /*dentro del parentesis de val, colocariamos una busqueda por defecto, un valor inicial*/
    console.log(valor);
    $("#buscar").val("Erasmolas Cage");
    var valor2 = $("#buscar").attr("value"); /*recoge el atributo value*/
    console.log(valor2);
    var valor3 = $("#buscar").val(); /*Val recoge valor o lo asigna*/
    console.log(valor3);


});

//Toda funcion se ejecutará más adelante, si no existe aun el documento, no se han creado las id y esas cosas,
// lo que quede dentro de las funciones no va a funcionar, aunque se llame desde el jQuery.
//las id no se considerarán como id hasta que el document sea ready. se lee y se compila todas las funciones, el ready y el jquery se hara con ready
/*Todo lo que toca el DOM, dentro de jquery, todo lo que no dependa del DOM, fuera.*/ // esta en azul por entender que es un TODO como en java

/*
*
* == equivalente if ("5"== 5) true
* === identico if ("5"===5) false
*
* != no quivalente
* !! no identico
* var genero = "1"==1 ? "hombre" : "mujer";
* */


function tracear() {

}



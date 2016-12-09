/**
 * Created by Josu on 30/11/2016.
 */
var dnis = new Array();
var nombres = new Array();
var apellidos = new Array();
var dnis = ["45751880G","16087431N"];
// var nombres = ["Imanol", "Marta","Erasmo","Borja","Alvaro"];
// var apellidos = ["Jimenez Lopez","Perez Reverte","","",""];
var nUF1841 = new Array();
var nUF1842 = new Array();
var nUF1843 = new Array();
var nUF1844 = new Array();
var nUF1845 = new Array();
var nUF1846 = new Array();
nombres['45751880G'] = "Imanol";
nombres['16087431N'] = "Marta";
apellidos['45751880G']= "Jimenez Lopez";
apellidos['16087431N']= "Rivera Del amo";
nUF1841['45751880G'] = 7;
nUF1842['45751880G'] = 6;
nUF1843['45751880G'] = 6;
nUF1844['45751880G'] = 6;
nUF1845['45751880G'] = 6;
nUF1846['45751880G'] = 8;
nUF1841['16087431N'] = 7;
nUF1842['16087431N'] = 5;
nUF1843['16087431N'] = 6;
nUF1844['16087431N'] = 7;
nUF1845['16087431N'] = 9;
nUF1846['16087431N'] = 8;
jQuery(document).ready(function($) {

    function cargarAlumnos() {
        for(var i = 0; i< dnis.length; i++){
            var dni = dnis[i];
            var nombre = nombres[dni];
            var apellido = apellidos[dni];
            insertTabla(dni,nombre, apellido,[nUF1841[dni],nUF1842[dni],nUF1843[dni],nUF1844[dni],nUF1845[dni],nUF1846[dni]])
            // var html_text  = "<tr>"+
            //     "<td><input type='checkbox' value='" + dni + "'></td>" +
            //     "<td>"+nombre+"</td>" +
            //     "<td>"+apellido+"</td>" +
            //     "<td>"+nUF1841[dni]+"</td>" +
            //     "<td>"+nUF1842[dni]+"</td>" +
            //     "<td>"+nUF1843[dni]+"</td>" +
            //     "<td>"+nUF1844[dni]+"</td>" +
            //     "<td>"+nUF1845[dni]+"</td>" +
            //     "<td>"+nUF1846[dni]+"</td>" +
            //     "<td>"+CalcularMedia([nUF1841[dni],nUF1842[dni], nUF1843[dni], nUF1844[dni], nUF1845[dni], nUF1846[dni]]).toFixed(2)+"</td>" +
            //     "<td><button>Editar</button></td>" + // toFixed se pone al final, convierte calcularMedia en un String
            //
            //     "</tr>"
            // $('#alumnos tbody').append(html_text);
        }

        calcularNAlumnos();
    }
    cargarAlumnos();
    function calcularNAlumnos() {
        //$('#alumnos div span').append(nombres.length); //asi sacamos al final en el append el numero total del array
        $('#alumnos div span').text("Total Alumnos: "+dnis.length);
    }
    function borrarAlumnoVista() {
        $("#alumnos tbody tr input:checked").parents("tr").remove();
    }
    // function tracear(){
    //     // boolean, numericas, texto, Array (Object)
    //     var valor = $('#busqueda').val();//
    //     //== equivalente if("5"==5) true
    //     //=== identico if("5"===5) false
    //     // && and || or
    //     //!=
    //     //!!
    //     //Urko
    //     // var genero = 1=="1" ? "hombre" : "mujer";
    //     console.log(valor);
    //     /**
    //      *
    //      */
    //     $('#busqueda').val("Erasmo");
    //     valor = $('#busqueda').attr("value");//
    //     //Urko
    //     console.log(valor);
    //     //Erasmo
    //     valor =   $('#busqueda').val();
    //     console.log(valor);
    // }
    $("#alumnos tbody button").click(function (e) { //Esto no funciona, el click funciona
        //alert("Has pulsado el boton editar con Click");
    });
    $("#alumnos tbody").on("click","button",function (e) { //Esto no funciona, el click funciona
        //alert("Has pulsado el boton editar con on");
    });
    $("#alumnos table thead input").click(function (e) {
        // $("#alumnos tbody input[type='checkbox']").checked(true); hacen lo mismo
        if ($("#alumnos table thead input").prop("checked")){
            $("#alumnos table tbody input").prop("checked", true);
            // alert("Marco todo");
        }else{
            // alert("Desmarco todo");
            $("#alumnos table tbody input").prop("checked", false);
        }


    });

    function cogerDNI(){

        //alert($("#alumnos tbody input:checked").val()); //un unico valor, mostraria el primero marcado
        var codigo = $("#alumnos tbody input:checked").each(function(e){
            //alert($(this).val()); //Aqui muestra todos los marcados
            borrarDDBBAlumno($(this).val()); //Borrar de la BBDD
        });

        return codigo;

    }

    $("a[href='s1'],a[href='#s2']").click(function (e) {
        return false;
    });

    function recogerDni(){
        var dni = $('#dni').val();
        var letra =calcularLetra(parseInt(dni,10));
        console.log(letra);
        return false;
    }
    $("a.btn").click(function(e){
        var dni = $('#dni').val();
        var letra =calcularLetra(parseInt(dni,10));
        $("span.resultado").text(letra);
        e.preventDefault();
        console.log(letra);
        return false;
    });
    $("#alumnos button.btn-info").on("click", function (e) {
        $("#myModal div div ul li input").val("");
        $("#myModal").css("display", "block");

    });
    $("#alumnos button.btn-danger").on("click", function (e) {
        var  codigo=cogerDNI();//recoger DNI de la vista
        borrarAlumnoVista();//borrar de la vista
        calcularNAlumnos();
    });
    $("#myModal .close, #myModal button.btn-cancelar").on("click", function (e) {
        $("#myModal").css("display", "none");

    });
    $("#myModal button.btn-guardar").on("click", function (e) {

        //$("#myModal").addClass("");
        //$("#myModal").removeClass("");
        //comprobar DNI
        //var dni = document.getElementById("dni").value;
        var dni = $("#dni").val();
        var nombre = $("#nombre").val();
        var apellido = $("#apellidos").val();
        var notaUF1841 = parseFloat($("#UF1841").val(),10);
        var notaUF1842 = parseFloat($("#UF1842").val(),10);
        var notaUF1843 = parseFloat($("#UF1843").val(),10);
        var notaUF1844 = parseFloat($("#UF1844").val(),10);
        var notaUF1845 = parseFloat($("#UF1845").val(),10);
        var notaUF1846 = parseFloat($("#UF1846").val(),10);
        var valido = true;
        if(!comprobarDNI(dni)){
            valido = false;
            //mensaje error
        }
        //comprobar nombre > 3 letras
        if(!comprobarTamano(nombre,3)){
            valido = false;
            //mensaje error
        }
        //comprobar apellidos > 7 letras
        if(!comprobarTamano(apellido,7)){
            valido = false;
            //mensaje error
        }
        //notas entre 0 y 10
        if(!comprobarNotas([notaUF1841,notaUF1842,notaUF1843,notaUF1844,notaUF1845,notaUF1846])){
            valido = false;
            //mensaje error
        }

        if (valido){
            //guardar BBDD
            addAlumno(dni, nombre, apellido,[notaUF1841,notaUF1842,notaUF1843,notaUF1844,notaUF1845,notaUF1846]);
            //añadir alumno a tabla vista
            insertTabla(dni, nombre, apellido,[notaUF1841,notaUF1842,notaUF1843,notaUF1844,notaUF1845,notaUF1846]);
            //recalcular alumnos
            calcularNAlumnos();
            //cerrar la ventana modal
            $("#myModal").css("display", "none");
        }else{

        }

    });
    //tracear();
    //

});
function calcularLetra(numero){
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var letraCalculada = letras[numero % 23];
    return letraCalculada;
}
function addAlumno(dni,nombre, apellido, notas) {
    dnis.push(dni);
    nombres[dni]=nombre;
    apellidos.push(dni,apellido);
    nUF1841.push(dni,notas[0]);
    nUF1842.push(dni,notas[1]);
    nUF1843.push(dni,notas[2]);
    nUF1844.push(dni,notas[3]);
    nUF1845.push(dni,notas[4]);
    nUF1846.push(dni,notas[5]);

}
function CalcularMedia(numeros) {
    //var media = (nUF1841 + nUF1842 + nUF1843 + nUF1844 + nUF1845 + nUF1846)/6;
    var media = 0;
    var len = numeros.length;
    for (i=0; i <len; i++){
        media +=numeros[i];
    }
    media = media/len;
    return media;
}

function insertTabla(dni, nombre, apellido, notas) {
    var html_text  = "<tr>"+
        "<td><input type='checkbox' value='" + dni + "'></td>" +
        "<td>"+nombre+"</td>" +
        "<td>"+apellido+"</td>" +
        "<td>"+notas[0]+"</td>" +
        "<td>"+notas[1]+"</td>" +
        "<td>"+notas[2]+"</td>" +
        "<td>"+notas[3]+"</td>" +
        "<td>"+notas[4]+"</td>" +
        "<td>"+notas[5]+"</td>" +
        "<td>"+CalcularMedia([notas[0],notas[1], notas[2], notas[3], notas[4], notas[5]]).toFixed(2)+"</td>" +
        "<td><button>Editar</button></td>" + // toFixed se pone al final, convierte calcularMedia en un String

        "</tr>"
    $('#alumnos tbody').append(html_text);
}

function borrarDDBBAlumno(codigo){
    var i=0;
    var len = dnis.length;
    var found = false;
    var pos = -1;
    while(i<len && found == false){
        if(dnis[i]==codigo){
            found =true;
            pos = i;
        }
        i++;
    }
    if (pos!=-1){
        dnis.splice(pos,1);
        nombres[codigo] = null;
        apellidos[codigo] = null;
        //......
    }

}
function comprobarDNI(dni) {
    //comprobaremos que tiene una estructura correcta, bien formado antes de comprobar nada.
    var len = 9;
    var bool = false;
    if (len == dni.length){
        var numero = dni.substring(0,dni.length-1);
        var patt1 = /[a-z]/i;
        var letra = dni.match(patt1);
        if (calcularLetra(parseInt(numero,10))==letra){
            bool = true;
        }
    }
    return bool;
}
function comprobarTamano(nombre,tamano){
    var bool = false;
    if(nombre.length>tamano){
        bool = true;
    }

    return bool;
}
function comprobarNotas(notas) {
    var bool = true;
    var len = notas.length;

    for (i=0; i <len; i++){
        if (10<notas[i] && notas[i]<0){
            bool = false;
        }
    }

    return bool;
}

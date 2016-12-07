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




    function cargarAlumnos() {
        for(var i = 0; i< dnis.length; i++){
            var dni = dnis[i];
            var nombre = nombres[dni];
            var apellido = apellidos[dni];
            var html_text  = "<tr>"+
                "<td><input type='checkbox' value='" + dni + "'></td>" +
                "<td>"+nombre+"</td>" +
                "<td>"+apellido+"</td>" +
                "<td>"+nUF1841[dni]+"</td>" +
                "<td>"+nUF1842[dni]+"</td>" +
                "<td>"+nUF1843[dni]+"</td>" +
                "<td>"+nUF1844[dni]+"</td>" +
                "<td>"+nUF1845[dni]+"</td>" +
                "<td>"+nUF1846[dni]+"</td>" +
                "<td>"+CalcularMedia([nUF1841[dni],nUF1842[dni], nUF1843[dni], nUF1844[dni], nUF1845[dni], nUF1846[dni]]).toFixed(2)+"</td>" +
                "<td><button>Editar</button></td>" + // toFixed se pone al final, convierte calcularMedia en un String

                "</tr>"
            $('#alumnos tbody').append(html_text);
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
        alert("Has pulsado el boton editar con Click");
    });
    $("#alumnos tbody").on("click","button",function (e) { //Esto no funciona, el click funciona
        alert("Has pulsado el boton editar con on");
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
            alert($(this).val()); //Aqui muestra todos los marcados
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
    $("#alumnos div button.btn-info").on("click", function (e) {
        $("#myModal div div ul li input").val("");
        $("#myModal").css("display", "block");

    });
    $("#alumnos div button.btn-danger").on("click", function (e) {
        var  codigo=cogerDNI();//recoger DNI de la vista
        alert(codigo.length);
        borrarAlumnoVista();//borrar de la vista
        calcularNAlumnos();
    });
    $("#myModal div div span.close").on("click", function (e) {
        $("#myModal").css("display", "none");

    });
    $("#myModal div div ul li button:submit").on("click", function (e) {
        $("#myModal").css("display", "none");
        alert("Esta mierda funciona");
        //comprobar DNI
        var dni = document.getElementById("dni").value;
        comprobarDNI(dni);
        //comprobar nombre > 3 letras
        //comprobar apellidos > 7 letras
        // notas entre 0 y 10
        // requeridos son nombre, apellidos y dni

    });
    //tracear();
    //

});
function calcularLetra(numero){
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var letraCalculada = letras[numero % 23];
    return letraCalculada;
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
    
}


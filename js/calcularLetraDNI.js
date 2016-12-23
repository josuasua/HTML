/**
 * Created by Josu on 30/11/2016.
 */
const URL ="http://localhost:2403/alumnos";
var numeroalumnos = 0;
var IDs = new Array();
var notasMedias = new Array();

//var mediaTotal = 0; // Se usará en el futuro.
// var dnis = new Array();
// var nombres = new Array();
// var apellidos = new Array();
// var dnis = ["45751880G","16087431N"];
// var nombres = ["Imanol", "Marta","Erasmo","Borja","Alvaro"];
// var apellidos = ["Jimenez Lopez","Perez Reverte","","",""];
// var nUF1841 = new Array();
// var nUF1842 = new Array();
// var nUF1843 = new Array();
// var nUF1844 = new Array();
// var nUF1845 = new Array();
// var nUF1846 = new Array();
// nombres['45751880G'] = "Imanol";
// nombres['16087431N'] = "Marta";
// apellidos['45751880G']= "Jimenez Lopez";
// apellidos['16087431N']= "Rivera Del amo";
// nUF1841['45751880G'] = 7;
// nUF1842['45751880G'] = 6;
// nUF1843['45751880G'] = 6;
// nUF1844['45751880G'] = 6;
// nUF1845['45751880G'] = 6;
// nUF1846['45751880G'] = 8;
// nUF1841['16087431N'] = 7;
// nUF1842['16087431N'] = 5;
// nUF1843['16087431N'] = 6;
// nUF1844['16087431N'] = 7;
// nUF1845['16087431N'] = 9;
// nUF1846['16087431N'] = 8;
jQuery(document).ready(function($) {

    function getPreciseLocation() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var results = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                resolve(results);
            });
        });
    }

    function getCoordenates(direccion) {
        var geocoder = new google.maps.Geocoder();

        return new Promise(function (resolve, reject) {
            geocoder.geocode({'address': direccion}, function (results, status) { // called asynchronously
                if (status == google.maps.GeocoderStatus.OK) {
                    var posicion = results[0].geometry.location;
                    resolve(posicion);
                } else {
                    reject(status);
                }
            });
        });
    }
    function getMapData() {//recoger los datos de empiece fin, modo de direcciones y del mapa
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) {
                //    var start = {latitude:'',longitude:''};
                var end = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                var geocoder = new google.maps.Geocoder();
                var address = 'Calle Gran Via 85, Bilbao, Bizkaia, España';
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resultsMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                        console.log(results[0].geometry.location);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
                var results = {start: start, end: end};
                resolve(results);
            });
        });
    }

    function cargarMapa(result) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var element = document.getElementById('mapa');
        var end = new google.maps.LatLng(result.latitude, result.longitude);

        var start = new google.maps.LatLng(43.2630126, -2.9349852000000283);
        var mapOptions = {center: end, zoom: 14, scrollwheel: false};
        var map = new google.maps.Map(element, mapOptions);
        var geocoder = new google.maps.Geocoder();
        var address = 'Gran Via 85, Bilbao, Bizkaia, España';
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                start = results[0].geometry.location;
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.TRANSIT
                };
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById('panel'));
                // infowindow.open(map, marker);
                //noinspection JSUnresolvedFunction
                directionsService.route(request, function (response, status) {
                    //noinspection JSUnresolvedVariable
                    if (status == google.maps.DirectionsStatus.OK) {
                        //noinspection JSUnresolvedFunction
                        directionsDisplay.setDirections(response);
                    } else {
                        console.log("error");
                    }
                });

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    // getPreciseLocation()
    //     .then(cargarMapa)
    //     .catch(function errorHandler(error) {
    //         console.log(error);
    //     });


    // function getPreciseLocation() {
    //     return new Promise(function (resolve, reject) {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
    //         });
    //     });
    // }
    //
    // function cargarMapa(coordenadas) {
    //     var directionsDisplay = new google.maps.DirectionsRenderer();
    //     var directionsService = new google.maps.DirectionsService();
    //     console.log(coordenadas);
    //     var element = document.getElementById('mapa');
    //     var myCenter = new google.maps.LatLng(43.2564042, -2.913592300000005);
    //     var mapOptions = {
    //         //center: new google.maps.LatLng(, 43.2564042),
    //         center: myCenter,
    //         zoom: 14,
    //         scrollwheel: false //no puede hacer scroll
    //     };
    //     var infowindow = new google.maps.InfoWindow({
    //         content: "Aqui estamos."
    //     });
    //     var map = new google.maps.Map(element, mapOptions);
    //     var marker = new google.maps.Marker({position: myCenter});
    //     marker.setMap(map);
    //     infowindow.open(map, marker);
    //     directionsDisplay.setMap(map);
    //     directionsDisplay.setPanel(document.getElementById('right-panel'));
    //
    //     var control = document.getElementById('floating-panel');
    //     control.style.display = 'block';
    //     map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    //
    //     var onChangeHandler = function () {
    //         calculateAndDisplayRoute(directionsService, directionsDisplay);
    //     };
    //
    // }
    //
    // getPreciseLocation()
    //     .then(initMap)
    //     .then(cargarMapa)
    //     .then(calculateAndDisplayRoute)
    //     .catch(function errorHandler(error) {
    //         console.log(error);
    //     });
    //
    // function calcRoute() {
    //     var end = document.getElementById("start").value;
    //     var start = "masustegi kalea, 9, 48006 Bilbo, Bizkaia";
    //     var request = {
    //         origin: start,
    //         destination: end,
    //         travelMode: google.maps.TravelMode.transit
    //     };
    //     directionsService.route(request, function (result, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             directionsDisplay.setDirections(result);
    //         }
    //     });
    // }



    function cargarAlumnos(data) {

        for (var i = 0; i < data.length; i++) {

            var id = data[i].id;
            var dni = data[i].dni;
            var nombre = data[i].nombre;
            var apellido = data[i].apellidos;
            var notas = {};
            if (data[i].notas != undefined) {
                notas['UF1841'] = data[i].notas.UF1841;
                notas['UF1842'] = data[i].notas["UF1842"];
                notas['UF1843'] = data[i].notas.UF1843;
                notas['UF1844'] = data[i].notas.UF1844;
                notas['UF1845'] = data[i].notas.UF1845;
                notas['UF1846'] = data[i].notas.UF1846;
            } else {
                notas['UF1841'] = "0";
                notas['UF1842'] = "0";
                notas['UF1843'] = "0";
                notas['UF1844'] = "0";
                notas['UF1845'] = "0";
                notas['UF1846'] = "0";
            }

            insertTabla(id, nombre, apellido, notas);
        }
        numeroalumnos=data.length;
        calcularNAlumnos(numeroalumnos);
    }

    function calcularNAlumnos(len) {
        //$('#alumnos div span').append(nombres.length); //asi sacamos al final en el append el numero total del array
        $('#alumnos div span').text("Total Alumnos: " + len);
    }

    function borrarAlumnoVista() {
        console.log("Deberia borrar de la tabla el alumno");
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
        //console.log("Has pulsado el boton editar con Click");
    });

    $("#alumnos tbody").on("click","button",function (e) { //Esto no funciona, el click funciona
        //console.log("Has pulsado el boton editar con on");
    });

    $("#alumnos table thead input").click(function (e) {
        // $("#alumnos tbody input[type='checkbox']").checked(true); hacen lo mismo
        if ($("#alumnos table thead input").prop("checked")){
            $("#alumnos table tbody input").prop("checked", true);
            // console.log("Marco todo");
        }else{
            // console.log("Desmarco todo");
            $("#alumnos table tbody input").prop("checked", false);
        }


    });

    function cogerID(){

        //console.log($("#alumnos tbody input:checked").val()); //un unico valor, mostraria el primero marcado
        var codigo = $("#alumnos tbody input:checked").each(function(e){
            //console.log($(this).val()); //Aqui muestra todos los marcados
            borrarDDBBAlumno($(this).val()); //Borrar de la BBDD
            numeroalumnos --;
        });

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
        $("#id").val("");
        $("#myModal").css("display", "block");



    });

    $("#alumnos button.btn-danger").on("click", function (e) {
        cogerID();//recoger DNI de la vista
        borrarAlumnoVista();//borrar de la vista
        calcularNAlumnos(numeroalumnos);
    });

    $("#myModal .close, #myModal button.btn-cancelar").on("click", function (e) {
        $("#myModal").css("display", "none");

    });
    $('#alumnos').find('tbody').on("click", "button", function (e) {
        e.preventDefault();
        console.log("boton editar pulsado");
        var codigo = $(this).val();

        ajax({url: URL, type: "GET", data: {id: codigo}}).then(function (data) {
            $("#id").val(data.id);
            $("#dni").val(data.dni);
            $("#nombre").val(data.nombre);
            $("#apellidos").val(data.apellidos);
            $("#fecha").val(data.fecha);
            $("#UF1841").val(data.notas.UF1841);
            $("#UF1842").val(data.notas.UF1842);
            $("#UF1843").val(data.notas.UF1843);
            $("#UF1844").val(data.notas.UF1844);
            $("#UF1845").val(data.notas.UF1845);
            $("#UF1846").val(data.notas.UF1846);


        }, recogerErrorAjax)
            .catch(function errorHandler(error) {});

        //Hacer un getByID o recoger datos de la tabla
        //llamar ventana modal y mostrar el getByID
        $("#myModal").css("display", "block");

    });

    $("#estadisticas button.notas").on("click", function (e) {
        ajax({url: URL, type: "GET"})
            .then(calcularNotasyEdades, recogerErrorAjax)
            .catch(function errorHandler(error) {

            });

    });

    $("#myModal button.btn-guardar").on("click", function (e) {

        //$("#myModal").addClass("");
        //$("#myModal").removeClass("");
        //comprobar DNI
        //var dni = document.getElementById("dni").value;
        var id = $("#id").val();
        var dni = $("#dni").val();
        var nombre = $("#nombre").val();
        var apellido = $("#apellidos").val();
        var fecha = $("#Fecha").val();
        var notaUF1841 = parseFloat($("#UF1841").val(),10);
        var notaUF1842 = parseFloat($("#UF1842").val(),10);
        var notaUF1843 = parseFloat($("#UF1843").val(),10);
        var notaUF1844 = parseFloat($("#UF1844").val(),10);
        var notaUF1845 = parseFloat($("#UF1845").val(),10);
        var notaUF1846 = parseFloat($("#UF1846").val(),10);
        var valido = true;

        if(!comprobarDNI(dni)){
            valido = false;
            $("#dni").siblings("p.error").text("DNI incorrecto");
        }

        //comprobar nombre > 3 letras
        if(!comprobarTamano(nombre,3)){
            valido = false;
            $("#nombre").siblings("p.error").text("Nombre incorrecto");
        }

        //comprobar apellidos > 7 letras
        if(!comprobarTamano(apellido,7)){
            valido = false;
            $("#apellidos").siblings("p.error").text("Apellido incorrecto");
        }

        //notas entre 0 y 10
        if(!comprobarNotas([notaUF1841,notaUF1842,notaUF1843,notaUF1844,notaUF1845,notaUF1846])){
            valido = false;

            //mensaje error
        }

        //edad entre 18 y 65
        if(!comprobarFecha(fecha)){
            valido = false;

        }

        if (valido){
            var notas = {
                'UF1841': notaUF1841,
                'UF1842': notaUF1842,
                'UF1843': notaUF1843,
                'UF1844': notaUF1844,
                'UF1845': notaUF1845,
                'UF1846': notaUF1846
            };
            if (id!=""){
                datos = {nombre: nombre, apellidos: apellido, dni: dni, notas: notas};
                console.log(datos);
                ajax({url: URL + "/" + id, type: "PUT", data: datos})
                     .then(cargarMensaje("El alumno ha sido modificado"), recogerErrorAjax)
                     .catch(function errorHandler(error) {

                     });
                actualizarTabla(id, nombre, apellido,notas);

            }else{
                //guardar BBDD (Create)
                datos = {nombre: nombre, apellidos: apellido, dni: dni, notas: notas};
                console.log(datos);
                var id = '';
                ajax({url: URL, type: "POST", data: datos})
                    .then(function (data) {
                        id = data.id;
                        console.log(id);
                        insertTabla(id, nombre, apellido, notas);
                        cargarMensaje("El alumno ha sido Guardado");
                    }, recogerErrorAjax)
                    .catch(function errorHandler(error) {

                    });
                console.log(datos);
                numeroalumnos ++;
                calcularNAlumnos(numeroalumnos);

            }

            calcularMediaTotal();
            //var id = addAlumno(dni, nombre, apellido,[notaUF1841,notaUF1842,notaUF1843,notaUF1844,notaUF1845,notaUF1846]);
            //añadir alumno a tabla vista
            //insertTabla(id, dni, nombre, apellido,notas);
            //recalcular alumnos
            //calcularNAlumnos();
            //cerrar la ventana modal
            $("#myModal").css("display", "none");
        }else{

        }

    });

    // tracear();
    //
    ajax({url: URL, type: "GET"})
        .then(cargarAlumnos, recogerErrorAjax)
        .catch(function errorHandler(error) {

        });
    function calcularNotasyEdades(data){
        // Load Charts and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Draw the pie chart for Sarah's pizza when Charts is loaded.
        google.charts.setOnLoadCallback(drawNotasChart(data));



        // Callback that draws the pie chart for Sarah's pizza.
        function drawNotasChart(datos) {

            var suspendidos = 0;
            var cinco = 0;
            var seis = 0;
            var siete = 0;
            var ocho = 0;
            var nueve = 0;
            var diez = 0;

            function suma(aux){
                switch (aux){
                    case 10:
                        diez++;
                        break;
                    case 9:
                        nueve++;
                        break;
                    case 8:
                        ocho++;
                        break;
                    case 7:
                        siete++;
                        break;
                    case 6:
                        seis++;
                        break;
                    case 5:
                        cinco++;
                        break;
                    default:
                        suspendidos++;

                }
            }

            for(var i= 0; i < datos.length; i++){
                console.log("hi");
                var aux = 0;
                aux = datos[i].notas.UF1841;
                suma(Math.floor(aux));
                aux = datos[i].notas.UF1842;
                suma(Math.floor(aux));
                aux = datos[i].notas.UF1843;
                suma(Math.floor(aux));
                aux = datos[i].notas.UF1844;
                suma(Math.floor(aux));
                aux = datos[i].notas.UF1845;
                suma(Math.floor(aux));
                aux = datos[i].notas.UF1846;
                suma(Math.floor(aux));

            }

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Notas');
            data.addColumn('number', 'notas');
            data.addRows([
                ['suspensos', suspendidos],
                ['cinco', cinco],
                ['seis', seis],
                ['siete', siete],
                ['ocho', ocho],
                ['nueve', nueve],
                ['diez', diez]
            ]);

            // Set options for Sarah's pie chart.
            var options = {title:'Gráfica de notas',
                width:400,
                height:300};

            // Instantiate and draw the chart for Sarah's pizza.
            var chart = new google.visualization.PieChart(document.getElementById('charts_notas'));
            chart.draw(data, options);
        }

        // Draw the pie chart for the Anthony's pizza when Charts is loaded.
        google.charts.setOnLoadCallback(drawEdadesChart(data));

        // Callback that draws the pie chart for Anthony's pizza.
        function drawEdadesChart(datos) {

            var menordieciocho = 0;
            var dieciochoaveinticinco = 0;
            var veintiseisatreinta = 0;
            var treintayunoatreintaycinco = 0;
            var mayortreintayseis = 0;

            function sumando(eb){

                if(eb<18){
                    menordieciocho++;
                }
                if((ed > 18 && ed < 25)){
                    dieciochoaveinticinco++;
                }
                if((ed > 25 && ed < 30)){
                    veintiseisatreinta++;
                }
                if((ed > 30 && ed < 36)){
                    treintayunoatreintaycinco++;
                }
                if(eb>35){
                    mayortreintayseis++;
                }
            }

            for(var i= 0; i < datos.length; i++){
                console.log("hi");
                var aux = 0;
                var eb = 0;
                aux = datos[i].fecha;
                eb = calcularEdad(aux);
                sumando(eb);

            }

            // Create the data table for Anthony's pizza.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Edades');
            data.addColumn('number', 'edades');
            data.addRows([
                ['menores de dieciocho', menordieciocho],
                ['dieciocho a veinticinco', dieciochoaveinticinco],
                ['veintiseis a treinta', veintiseisatreinta],
                ['treinta y uno a treinta y cinco', treintayunoatreintaycinco],
                ['mayores', mayortreintayseis]
            ]);

            // Set options for Anthony's pie chart.
            var options = {title:'Gráfica de edades',
                width:400,
                height:300};

            // Instantiate and draw the chart for Anthony's pizza.
            var chart = new google.visualization.PieChart(document.getElementById('charts_edades'));
            chart.draw(data, options);
        }

    }
});




function ajax(opciones) {
    return new Promise(function (resolve, reject) {
        $.ajax(opciones).done(resolve).fail(reject);
    });
}

function calcularLetra(numero){
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var letraCalculada = letras[numero % 23];
    return letraCalculada;
}

function recogerErrorAjax(jqXHR, textStatus, errorThrown) {
    alert("Error:" + jqXHR.toString() + textStatus + errorThrown);
}
function actualizarTabla(id, nombre, apellido,notas) {
    var $tr = $("#alumnos tbody tr input[value="+id+"]").parents("tr"); // var con dolar se usa cuando son de html
    $tr.find("td:eq(1)").text(nombre);
    $tr.find("td:eq(2)").text(apellido);
    $tr.find("td:eq(3)").text(notas.UF1841);
    $tr.find("td:eq(4)").text(notas.UF1842);
    $tr.find("td:eq(5)").text(notas.UF1843);
    $tr.find("td:eq(6)").text(notas.UF1844);
    $tr.find("td:eq(7)").text(notas.UF1845);
    $tr.find("td:eq(8)").text(notas.UF1846);

}

function addAlumno( dni, nombre, apellido, notas) {

    /*
    console.log(URL);
    console.log(JSON.stringify({
        dni: dni,
        nombre:nombre,
        apellidos:apellido,
        notas:{"UF1841":notas[0],"UF1842":notas[1],"UF1843":notas[2],"UF1844":notas[3],"UF1845":notas[4],"UF1846":notas[5]}}));
        */
    var promesaInsertar = $.ajax(URL,
        {type:"POST",
            //contentType: "application/json",
            data: {
                dni: dni,
                nombre:nombre,
                apellidos:apellido,
                notas:{"UF1841":notas[0],"UF1842":notas[1],"UF1843":notas[2],"UF1844":notas[3],"UF1845":notas[4],"UF1846":notas[5]}
            }
        });

    promesaInsertar.success(function (e) {
        var id = data.id;
    }).error(function(xhr) {
        alert(xhr.responseText);
    });
    return id;
}

function CalcularMedia(numeros) {

    //var media = (nUF1841 + nUF1842 + nUF1843 + nUF1844 + nUF1845 + nUF1846)/6;
    var media = 0;
    var len = numeros.length;
    for (i=0; i <len; i++){
        if ((numeros[i])) {
            media += parseInt(numeros[i]);
        }
    }
    media = media/len;
    return media;
}

function calcularEdad(Fecha){
    fecha = new Date(Fecha)
    hoy = new Date()
    ed = parseInt((hoy -fecha)/365/24/60/60/1000);
    console.log(ed);
    return ed;
}

function insertTabla(id, nombre, apellido, notas) {



    var media = parseFloat(CalcularMedia([notas.UF1841,notas.UF1842, notas.UF1843, notas.UF1844, notas.UF1845, notas.UF1846]),10).toFixed(2);

    var html_text  = "<tr>"+
        "<td><input type='checkbox' value='" + id + "'></td>" +
        "<td>"+nombre+"</td>" +
        "<td>"+apellido+"</td>" +
        "<td>"+notas.UF1841+"</td>" +
        "<td>"+notas['UF1842']+"</td>" +
        "<td>"+notas.UF1843+"</td>" +
        "<td>"+notas.UF1844+"</td>" +
        "<td>"+notas.UF1845+"</td>" +
        "<td>"+notas.UF1846+"</td>" +
        "<td>"+media+"</td>" +
        "<td><button value='"+id+"'>Editar</button></td>" + // toFixed se pone al final, convierte calcularMedia en un String

        IDs.push(id);

        notasMedias.push(media);

        "</tr>";

    $('#alumnos tbody').append(html_text);

}

function borrarDDBBAlumno(codigo){
    console.log(codigo);
    //var promesaBorrar = $.ajax(URL+"/"+codigo, {type:"DELETE"});
    ajax({url: URL, type: "DELETE", data: {id: codigo}})
        .then(cargarMensaje("El alumno ha sido borrado"), recogerErrorAjax)
        .catch(function errorHandler(error) {

        });

}

function cargarMensaje(Mensaje){
    alert(Mensaje);
}

function comprobarDNI(dni) {
    //comprobaremos que tiene una estructura correcta, bien formado antes de comprobar nada. Asi estaría bien hecho.
    var regex =/^\d{8}[a-zA-Z]$/;
    var bool = false;
    if(regex.test(dni)){
        //Se cumple, asi que trabajamos con ello, mas corto y rapido
        bool = true;
    }

    //a mi manera
    // var len = 9;
    // var bool = false;
    // if (len == dni.length){
    //     var numero = dni.substring(0,dni.length-1);
    //     var patt1 = /[a-z]/i;
    //     var letra = dni.match(patt1);
    //     if (calcularLetra(parseInt(numero,10))==letra){
    //         bool = true;
    //     }
    // }
    return bool;
}

function comprobarTamano(nombre,tamano){
    var bool = false;
    if(nombre.length>tamano){
        bool = true;
    }

    return bool;
}

function comprobarFecha(Fecha) {
    // var bool = false;
    // console.log(fecha);
    // var parts = fecha.split("-");
    // var anio = parts[2];
    // var mes = parts[1];
    // var dia = parts[0];
    //
    // console.log("Dia: " + dia);
    // console.log("Mes: " + mes);
    // console.log("año: " + anio);
    //
    // var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth()+1; //January is 0!
    // var yyyy = today.getFullYear();
    // console.log("Today" + today);
    // console.log("Today - 18:" + yyyy);
    //
    // if(dd<10){
    //     dd='0'+dd
    // }
    // if(mm<10){
    //     mm='0'+mm
    // }
    //
    // today = yyyy+'-'+mm+'-'+dd;
    // return true;

    var ed = calcularEdad(Fecha);
    if (ed < 18 && ed > 65) {
        return false;
    }
    return true;
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



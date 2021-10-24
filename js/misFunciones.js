///Cabaña

function TraerCabana() {
    $.ajax({

        url: "http://localhost:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaCabana) {
            console.log(respuestaCabana);
            pintarRespuestaCabana(respuestaCabana.items);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function pintarRespuestaCabana(items) {

    let myTableCabana = "<table>";
    for (i = 0; i < items.length; i++) {
        myTableCabana += "<tr>";
        myTableCabana += "<td>" + items[i].id + "</td>";
        myTableCabana += "<td>" + items[i].name + "</td>";
        myTableCabana += "<td>" + items[i].brand + "</td>";
        myTableCabana += "<td>" + items[i].rooms + "</td>";
        myTableCabana += "<td>" + items[i].description + "</td>";
        myTableCabana += "<td>" + items[i].category + "</td>";
        myTableCabana += "<td>" + items[i].TraerMensaje + "</td>";
        myTableCabana += "<td> <button onclick='eliminarCabana(" + items[i].id + ")'>Eliminar</button>";
        myTableCabana += "</tr>";
    }
    myTableCabana += "</table>";
    $("#resultadoCabana").append(myTableCabana);
}

function guardarCabana() {
    let myDataCabana = {
        id: $("").val(),
        brand: $("#brand").val(),
        rooms: $("#rooms").val(),
        category: $("#category").val(),
        name: $("#name").val(),
        description: $("#description").val(),
    };
    let dataToSend = JSON.stringify(myDataCabana);
    if (!validarCampo($("#brand, #rooms, #category, #name, #description"))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;

    }
    if (!validarCampo($("#brand"))) {
        alert("Debe ingresar la marca");
        return;
    }
    if (!validarCampo($("#rooms"))) {
        alert("Debe ingresar el numero de cuartos");
        return;
    }
    if (!validarCampo($("#category"))) {
        alert("Debe ingresar la categoria");
        return;
    }
    if (!validarCampo($("#name"))) {
        alert("Debe ingresar el nombre de la cabaña");
        return;
    }
    if (!validarCampo($("#description"))) {
        alert("Debe ingresar la description de la cabana");
        return;
    }

    $.ajax({
        url: "http://localhost:8080/api/Cabin/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: myDataCabana,
        datatype: "JSON",
        success: function (respuestaCabana) {
            $("#resultadoCabana").empty();
            $("#brand").val("");
            $("#rooms").val("");
            $("#category").val("");
            $("#name").val("");

            soloLectura();
            alert("Se ha guardado la cabana.")
            limpiarFormularioCabana();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function limpiarFormularioCabana() {
    $("#id1").val("");
    $("#brand").val("");
    $("#rooms").val("");
    $("#category").val("");
    $("#name").val("");
}

function mostrarUnaCabanaEspecifica(idItem){
$.ajax({
    datatype: "JSON",
    url: "http://localhost:8080/api/Cabin/all" + idItem,
    type: "GET",
    success: function (respuestaCabana) {
        console.log(response);       
        var item = response.items[0];

        $("#resultadoCabana").empty();
        $("#id").val("item.id");
        $("#name").val("item.name");
        $("#brand").val("item.brand");
        $("#rooms").val("item.rooms");
        $("#description").val("item.description");
        $("#category").val("item.category");
      
        alert("Se ha guardado la cabana.")
        limpiarFormularioCabana();
    },
    error: function (xhr, status) {
        alert('ha sucedido un problema, ' + xhr.status);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload()
        alert("solicitud realizada");
    },
    complete: function (xhr, status) {
        alert('Petición realizada, ' + xhr.status);
    },
});
}



///Clientes

function TraerCliente() {
    $.ajax({
        // Se va concetar al servidor de Oracle
        url: "http://localhost:8080/api/Client/all",
        //Para llamar el método GET        
        type: "GET",
        //Se recibe un JSON
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaC) {
            //Imprime la respuesta en la consola 
            console.log(respuestaC);
            pintarRespuesta(respuestaC.items);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function pintarRespuesta(items) {

    let myTable = "<table>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button onclick='eliminarCliente(" + items[i].id + ")'>Eliminar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);

}

function guardarCliente() {
    let myData = {
        id: $("#id2").val(),
        name: $("#name2").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    if (!validarCampo($(""))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;
    }
    if (!validarCampo($("#name2"))) {
        alert("Debe ingresar el nombre del cliente");
        return;
    }
    if (!validarCampo($("#email"))) {
        alert("Debe ingresar el email del cliente");
        return;
    }
    if (!validarCampo($("#age"))) {
        alert("Debe ingresar la edad del  cliente");
        return;
    }
    $.ajax({
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "POST",
        data: myData,
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id2").val("");
            $("#name2").val("");
            $("#email").val("");
            $("#age").val("");
            TraerCliente();
            soloLectura();
            alert("Se ha guardado el dato.")
            limpiarFormulario();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function editarCliente() {
    let myData = {
        id: $("#id2").val(),
        name: $("#name2").val(),
        email: $("#email").val(),
        age: $("#age").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    if (!validarCampo($(""))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;
    }
    if (!validarCampo($("#name2"))) {
        alert("Debe ingresar el nombre del cliente");
        return;
    }
    if (!validarCampo($("#email"))) {
        alert("Debe ingresar el email del cliente");
        return;
    }
    if (!validarCampo($("#age"))) {
        alert("Debe ingresar la edad del  cliente");
        return;
    }
    $.ajax({
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id2").val("");
            $("#name2").val("");
            $("#email").val("");
            $("#age").val("");
            TraerCliente();
            limpiarFormulario();
            soloLectura();
            alert("Se ha Actualizado.")
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function eliminarCliente(idElementoCliente) {
    let myData = {
        id: idElementoCliente
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            TraerCliente();
            soloLectura();
            limpiarFormulario();
            alert("Se ha Eliminado.")
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function validarCampo(campo) {
    if (campo.val() != "")
        return true
    else
        return false;

}

function limpiarFormulario() {
    $("#id2").val("");
    $("#name2").val("");
    $("#email").val("");
    $("#age").val("");
}

function soloLectura() {
    $("#id2", "#id1", "#id3").prop("readonly", false);
}

/// Mensajes

function TraerMensaje() {
    $.ajax({
        // Se va concetar al servidor de Oracle
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        //Para llamar el método GET        
        type: "GET",
        //Se recibe un JSON
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaMensaje) {
            //Imprime la respuesta en la consola 
            console.log(respuestaMensaje);
            pintarRespuestaMensaje(respuestaMensaje.items);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function pintarRespuestaMensaje(items) {

    let myTableMensaje = "<table>";
    for (i = 0; i < items.length; i++) {
        myTableMensaje += "<tr>";
        myTableMensaje += "<td>" + items[i].id + "</td>";
        myTableMensaje += "<td>" + items[i].messagetext + "</td>";
        myTableMensaje += "<td> <button onclick='eliminarMensaje(" + items[i].id + ")'>Eliminar</button>";
        myTableMensaje += "</tr>";
    }
    myTableMensaje += "</table>";
    $("#resultadoMensaje").append(myTableMensaje);

}

function guardarMensaje() {
    let myDataMensaje = {
        id: $("#id3").val(),
        messagetext: $("#messagetext").val(),
    };
    let dataToSend = JSON.stringify(myDataMensaje);
    if (!validarCampo($(""))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;
    }
    if (!validarCampo($("#messagetext"))) {
        alert("Debe ingresar el mensaje");
        return;
    }
    $.ajax({
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "POST",
        data: myDataMensaje,
        datatype: "JSON",
        success: function (respuestaMensaje) {
            $("#resultadoMensaje").empty();
            $("#id3").val("");
            $("#messagetext").val("");
            TraerMensaje();
            soloLectura();
            alert("Se ha guardado el dato.")
            limpiarFormularioMensaje();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
            limpiarFormularioMensaje();
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
            limpiarFormularioMensaje();
        },
    });
}

function editarMensaje() {
    let myDataMensaje = {
        id: $("#id3").val(),
        messagetext: $("#messagetext").val(),
    };
    console.log(myDataMensaje);
    let dataToSend = JSON.stringify(myDataMensaje);
    if (!validarCampo($(""))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;
    }
    if (!validarCampo($("#messagetext"))) {
        alert("Debe ingresar el mensaje");
        return;
    }
    $.ajax({
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaMensaje) {
            $("#resultadoMensaje").empty();
            $("#id3").val("");
            $("#messagetext").val("");
            TraerMensaje();
            limpiarFormularioMensaje();
            soloLectura();
            alert("Se ha Actualizado.")
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
            limpiarFormularioMensaje();
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
            limpiarFormularioMensaje();
        },
    });
}

function eliminarMensaje(idElementoMensaje) {
    let myDataMensaje = {
        id: idElementoMensaje
    };
    let dataToSend = JSON.stringify(myDataMensaje);
    $.ajax({
        url: "https://g67b30a66965e9b-cabana.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaMensaje) {
            $("#resultadoMensaje").empty();
            TraerMensaje();
            soloLectura();
            limpiarFormularioMensaje();
            alert("Se ha Eliminado.")
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
            limpiarFormularioMensaje();
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
            limpiarFormularioMensaje();
        },
    });
}

function limpiarFormularioMensaje() {
    $("#id3").val("");
    $("#messagetext").val("");

}








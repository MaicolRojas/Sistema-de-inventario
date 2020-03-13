/*=======================================
=            EDITAR CLIENTES            =
=======================================*/

$(".tablaClientes").on("click", ".btnEditarCliente", function(){

	var idCliente = $(this).attr("idCliente");

	var datos = new FormData();

	datos.append("idCliente",idCliente);

	$.ajax({
		url : "ajax/clientes.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success:function(respuesta){
			
			console.log("respuesta", respuesta);
			$("#idCliente").val(respuesta['id']);
			$("#editarCliente").val(respuesta['nombre']);
			$("#editarDocumentoId").val(respuesta['documento']);
			$("#editarEmail").val(respuesta['email']);
			$("#editarTelefono").val(respuesta['telefono']);
			$("#editarDireccion").val(respuesta['direccion']);
			$("#editarfechaNacimiento").val(respuesta['fecha_nacimiento']);

			
		}
	})
})


/*=====  End of EDITAR CLIENTES  ======*/



// $.ajax({
// 	url: "ajax/datatable-clientes.ajax.php",
// 	success:function(respuesta) {
		
// 		console.log("respuesta", respuesta)
// 	}
// })

$(".tablaClientes").DataTable({
	"ajax": "ajax/datatable-clientes.ajax.php"
})
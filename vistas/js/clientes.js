
// $.ajax({
// 	url: "ajax/datatable-clientes.ajax.php",
// 	success:function(respuesta) {
		
// 		console.log("respuesta", respuesta)
// 	}
// })

$(".tablaClientes").DataTable({
	"ajax": "ajax/datatable-clientes.ajax.php"
})
/*===============================================
=            NO SE REPITA CATEGORIAS            =
===============================================*/

$("#nuevaCategoria").change(function(){

	$(".alert").remove();


	var usuario = $(this).val();

	var datos = new FormData();
	datos.append("validarCategoria",usuario);

	$.ajax({

		url:"ajax/categorias.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			console.log("respuesta",respuesta)
			if (respuesta) {
				$("#nuevaCategoria").parent().after("<br><div class ='alert alert-danger'>Este nombre de Categoria ya existe en la base de datos</div>");
				$("#nuevaCategoria").val("");
			}

		}
	})
});

/*=====  End of NO SE REPITA CATEGORIAS  ======*/

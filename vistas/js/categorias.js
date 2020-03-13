/*=========================================
=            EDITAR CATEGORIAS            =
=========================================*/

$(document).on("click", ".btnEditarCategoria", function(){

	var idCategoria = $(this).attr("idCategoria");
	
	var datos = new FormData();

	datos.append("idCategoria", idCategoria);

	$.ajax({

		url:"ajax/categorias.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){
			
			console.log("respuesta", respuesta);
		
			$("#editarCategoria").val(respuesta["categoria"]);
			$("#idCategoria").val(respuesta["id"]);
			
			

		}

	});

})


/*=====  End of EDITAR CATEGORIAS  ======*/


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

			
			if (respuesta) {
				$("#nuevaCategoria").parent().after("<br><div class ='alert alert-danger'>Este nombre de Categoria ya existe en la base de datos</div>");
				$("#nuevaCategoria").val("");
			}

		}
	})
});

/*=====  End of NO SE REPITA CATEGORIAS  ======*/



/*==========================================
=            ELIMINAR CATEGORIA            =
==========================================*/

$(document).on("click", ".btnEliminarCategoria", function(){

  var idCategoria = $(this).attr("idCategoria");


  swal({
    title: '¿Está seguro de borrar la Categoría?',
    text: "¡Si no lo está puede cancelar la accíón!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar Categoría!'
  }).then(function(result){

  	
    if(result.value){

      window.location = "index.php?ruta=categorias&idCategoria="+idCategoria;

    }

  })

})

/*=====  End of ELIMINAR CATEGORIA  ======*/


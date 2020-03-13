/*=============================================================
=            CARGAR LA TABLA DINAMICA DE PRODUCTOS            =
=============================================================*/

// $.ajax({

// 	url: 'ajax/datatable-productos.ajax.php',
// 	success: function (respuesta) {

// 		console.log("respuesta", respuesta);

// 	}
// });


/*=====  End of CARGAR LA TABLA DINAMICA DE PRODUCTOS  ======*/

$('.tablaProductos').DataTable( {
        "ajax": "ajax/datatable-productos.ajax.php",
        "deferRender": true,
        "retrieve": true,
        "processing": true,
        "language": {

		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "Siguiente",
		"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}

	}
    } );

$("#nuevaCategoria").change(function(){

	var idCategoria = $(this).val();

	var datos = new FormData();

	datos.append("idCategoria", idCategoria);

	$.ajax({

		url: "ajax/productos.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			if (!respuesta) {

				var nuevoCodigo = idCategoria+"01";
				$("#nuevoCodigo").val(nuevoCodigo);

			}else{
				var nuevoCodigo = Number(respuesta['codigo']) + 1;
			
				$("#nuevoCodigo").val(nuevoCodigo);
			}

		}
	})


});

/*=================================================
=            AGEGRANDO PRECIO DE VENTA            =
=================================================*/

$("#nuevoPrecioCompra, #editarPrecioCompra").change(function(){

	if ($(".porcentaje").prop("checked")) {

		var valorPorcentaje = $(".nuevoPorcentaje").val();

		var porcentaje = Number(( $("#nuevoPrecioCompra").val() * valorPorcentaje / 100 )) + Number( $("#nuevoPrecioCompra").val());

		var editarPorcentaje = Number(( $("#editarPrecioCompra ").val() * valorPorcentaje / 100 )) + Number( $("#nuevoPrecioCompra").val());


		$("#nuevoPrecioVenta").val(porcentaje);
		$("#nuevoPrecioVenta").prop("readonly", true);

		$("#editarPrecioVenta").val(editarPorcentaje);
		$("#editarPrecioVenta").prop("readonly", true);


	}
	
})

/*=====  End of AGEGRANDO PRECIO DE VENTA  ======*/

/*============================================
=            CAMBIO DE PORCENTAJE            =
============================================*/

$(".nuevoPorcentaje").change(function(){

	if ($(".porcentaje").prop("checked")) {

		var valorPorcentaje = $(this).val();

		var porcentaje = Number(( $("#nuevoPrecioCompra").val() * valorPorcentaje / 100 )) + Number( $("#nuevoPrecioCompra").val());
  
		var editarPorcentaje = Number(( $("#editarPrecioCompra ").val() * valorPorcentaje / 100 )) + Number( $("#editarPrecioCompra").val());

		$("#nuevoPrecioVenta").val(porcentaje);
		$("#nuevoPrecioVenta").prop("readonly", true);

		$("#editarPrecioVenta").val(editarPorcentaje);
		$("#editarPrecioVenta").prop("readonly", true);

	}

})

/*=====  End of CAMBIO DE PORCENTAJE  ======*/

$(".porcentaje").on("ifUnchecked",function(){

	$("#nuevoPrecioVenta").prop("readonly", false);

	$("#editarPrecioVenta").prop("readonly", false);     
}) 

$(".porcentaje").on("ifChecked",function(){

	$("#nuevoPrecioVenta").prop("readonly", true);   

	$("#editarPrecioVenta").prop("readonly", true); 
}) 


/*=================================================
=            SUBIENDO FOTO DEL PRODUCTO            =
=================================================*/

$('.nuevaImagen').change(function(){

	var imagen = this.files[0];

	console.log("imagen", imagen);

	/*=========================================================
	=            VALIDANDO EL FORMATO DE LA IMAGEN            =
	=========================================================*/
	
	if (imagen["type"]!= "image/jpeg" && imagen["type"]!= "image/png" ) {
		
		$(".nuevaFoto").val("");

		swal({

			title: "Error al subir la imagen",
			text: "¡La imagen debe estar en formato JPG o PNG!",
			type: "error",
			confirmButtonText: "¡Cerrar!"
		});

	}else if(imagen["size"] > 2000000){

		$(".nuevaFoto").val("");

		swal({

			title: "Error al subir la imagen",
			text: "¡La imagen no debe pesar mas de 2MB!",
			type: "error",
			confirmButtonText: "¡Cerrar!"
		});

	}else{

		var datosImagen = new FileReader;
		datosImagen.readAsDataURL(imagen);

		$(datosImagen).on("load", function(event){

			var rutaImagen = event.target.result;

			$(".previsualisar").attr("src",rutaImagen);
		})
	}
	
	/*=====  End of VALIDANDO EL FORMATO DE LA IMAGEN  ======*/
	
})

 
/*=====  End of SUBIENDO FOTO DEL USUARIO  ======*/

/*========================================
=            EDITAR PRODUCTOS            =
========================================*/

$(".tablaProductos tbody").on("click","button.btnEditarProducto", function(){

	var idProducto = $(this).attr("idProducto");

	var datos = new FormData();

	datos.append("idProducto", idProducto);

	$.ajax({
		url: "ajax/productos.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			var datosCategoria = new FormData();

			datosCategoria.append("idCategoria", respuesta['id_categoria']);

			$.ajax({
				url: "ajax/categorias.ajax.php",
				method: "POST",
				data: datosCategoria,
				cache: false,
				contentType: false,
				processData: false,
				dataType: "json",
				success: function(respuesta){

					$("#editarCategoria").val(respuesta["id"]);
					$("#editarCategoria").html(respuesta["categoria"]);
				}
			})

			$("#editarCodigo").val(respuesta["codigo"]);
			$("#editarDescripcion").val(respuesta["descripcion"]);
			$("#editarStock").val(respuesta["stock"]);
			$("#editarPrecioCompra").val(respuesta["precio_compra"]);
			$("#editarPrecioVenta").val(respuesta["precio_venta"]);

			if(respuesta["imagen"] != ""){

           	$("#imagenActual").val(respuesta["imagen"]);

           	$(".previsualizar").attr("src",  respuesta["imagen"]);
           	
           	$("#act").attr("src",  respuesta["imagen"]);

           }

		}

	})

}); 

/*=====  End of EDITAR PRODUCTOS  ======*/

/*=============================================================
=            CARGAR LA TABLA DINAMICA DE PRODUCTOS            =
=============================================================*/

// $.ajax({

// 	url: 'ajax/datatable-ventas.ajax.php',
// 	success: function (respuesta) {

// 		console.log("respuesta", respuesta);

// 	}
// });

$('.tablaVentas').DataTable( {
        "ajax": "ajax/datatable-ventas.ajax.php",
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

 /*=====================================================================
 =            AGREGANDO PRODUCTOS A LA VENTA DESDE LA TABLA            =
 =====================================================================*/
 
 $(".tablaVentas tbody").on("click", "button.agregarProducto",function(){

 	var idProducto = $(this).attr("idProducto");


 	$(this).removeClass("btn-primary agregarProducto");

 	$(this).addClass("btn-default");

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
		success:function(respuesta){

			var descripcion = respuesta['descripcion'];
			var stock = respuesta['stock'];
			var precio = respuesta['precio_venta'];

			/*============================================================================
			=            EVITAR AGREGAR PRODUCTO CUANDO EL STOCK ESTA EN CERO            =
			============================================================================*/
			
			if (stock == 0) {

				swal({
					title: "No hay stock disponible",
					type: "error",
					confirButtonText: "¡Cerrar!"
				});

				$("button[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

				return;


			}
			
			
			/*=====  End of EVITAR AGREGAR PRODUCTO CUANDO EL STOCK ESTA EN CERO  ======*/
			

			$('.nuevoProducto').append(

				'<div class="row" style="padding:5px 15px">'+	
				
				'<!-- descrion del producto -->'+
                    
                    '<div class="col-xs-6" style="padding-right: 0px">'+
                      
                      '<div class="input-group">'+
                        
                        '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span> '+

                        '<input type="text" class="form-control agregarProducto" name="agregarProducto" value="'+descripcion+'" required readonly>'+

                      '</div>'+

                    '</div>'+

                    '<!-- cantidad del producto -->'+

                    '<div class="col-xs-3">'+
                      
                      '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock="'+stock+'" required>'+

                    '</div>'+

                    '<!-- precio del producto -->'+

                    '<div class="col-xs-3 ingresoPrecio" style="padding-left: 0px">'+
                      
                      '<div class="input-group">'+

                        '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
                        
                        '<input type="number" min="1" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" class="nuevoPrecioProducto" value="'+precio+'" readonly required>'+

                        

                      '</div>'+

                    '</div>'+

                    '</div>'
				
				)

			//SUMAR TOTAL DE PRECIOS
			sumarTotalPrecios();

			//AGREGAR IMPUESTO
			agregarImpuesto();


		}
 	})
 })
 
 
 /*=====  End of AGREGANDO PRODUCTOS A LA VENTA DESDE LA TABLA  ======*/
 

/*=========================================================================
=            CUANDO CARGE LA TABLA CADA VES QUE NAVEGE EN ELLA            =
=========================================================================*/

$(".tablaVentas").on("draw.dt", function(){

	if(localStorage.getItem("quitarProducto") != null){

		var listaIdProductos = JSON.parse(localStorage.getItem("quitarProducto"));

		for(var i = 0; i < listaIdProductos.length; i++){

			$("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").removeClass('btn-default');
			$("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").addClass('btn-primary agregarProducto');

		}


	}


})


/*=====  End of CUANDO CARGE LA TABLA CADA VES QUE NAVEGE EN ELLA  ======*/



 /*======================================================================
 =            QUITAR PRODUCTOS DE LA VENTA Y RECUPERAR BOTON            =
 ======================================================================*/

 var idQuitarProducto = [];
 
  $(".formularioVenta").on("click", "button.quitarProducto",function(){

  	
  	$(this).parent().parent().parent().parent().remove();

  	var idProducto = $(this).attr("idProducto");

  	/*===============================================================================
  	=            ALMACENAR EN EL LOCALSTORAGE EL ID DE PRODUCTO A QUITAR            =
  	===============================================================================*/
  	
  	if (localStorage.getItem("quitarProducto")== null) {

  		idQuitarProducto = [];

  	}else{

  		idQuitarProducto.concat(localStorage.getItem("quitarProducto"));

  	}

  	idQuitarProducto.push({"idProducto":idProducto});

  	localStorage.setItem("quitarProducto", JSON.stringify(idQuitarProducto));
  	
  	
  	/*=====  End of ALMACENAR EN EL LOCALSTORAGE EL ID DE PRODUCTO A QUITAR  ======*/
  	

  	$("button.recuperarBoton[idProducto='"+idProducto+"']").removeClass('btn-default');
  	$("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

  	if ($(".nuevoProducto").children().length == 0) {

  		$("#nuevoTotalVenta").val(0);
  		$("#nuevoImpuestoVenta").val(0);
  		$("#nuevoTotalVenta").attr("total", 0);

  	}else{
	  	//SUMAR TOTAL DE PRECIOS
		sumarTotalPrecios();

		//AGREGAR IMPUESTO
		agregarImpuesto();
	}
  })
 
 
 /*=====  End of QUITAR PRODUCTOS DE LA VENTA Y RECUPERAR BOTON  ======*/
 

 /*============================================================================
 =            AGREGANDO PRODUCTOS DESDE EL BOTON PARA DISPOSITIVOS            =
 ============================================================================*/
 
var numproducto = 0;

 $(".btnAgregarProducto").click(function(){

 	numproducto ++;


 	var datos = new FormData();
 	datos.append("traerProductos","ok");

 	$.ajax({

 		url: "ajax/productos.ajax.php",
 		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success:function(respuesta){

			$('.nuevoProducto').append(

				'<div class="row" style="padding:5px 15px">'+	
				
				'<!-- descrion del producto -->'+
                    
                    '<div class="col-xs-6" style="padding-right: 0px">'+
                      
                      '<div class="input-group">'+
                        
                        '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span> '+

                        '<select class="form-control nuevaDescripcionProducto" id="producto'+numproducto+'" idProducto name="nuevaDescripcionProducto" required>'+

                        '<option>seleccione el producto </option>'+

                        '</select>'+

                      '</div>'+

                    '</div>'+ 

                    '<!-- cantidad del producto -->'+

                    '<div class="col-xs-3 ingresoCantidad">'+
                      
                      '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock required>'+

                    '</div>'+

                    '<!-- precio del producto -->'+

                    '<div class="col-xs-3 ingresoPrecio" style="padding-left: 0px">'+
                      
                      '<div class="input-group">'+

                        '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
                        
                        '<input type="number" min="1" class="form-control nuevoPrecioProducto" precioReal="" class="nuevoPrecioProducto" value readonly required>'+

                        

                      '</div>'+

                    '</div>'+

                    '</div>');


			//AGREGAR LOS PRODUCTOS AL SELECT

			respuesta.forEach(funcionForEach);

			function funcionForEach(item, index){

				if (item.stock != 0) {

					$("#producto"+numproducto).append(

					'<option idProducto="'+item.id+'" value="'+item.descripcion+'">'+item.descripcion+'</option>'

					)	

				}

				//SUMAR TOTAL DE PRECIOS
				sumarTotalPrecios();

				//AGREGAR IMPUESTO
				agregarImpuesto();

			}

		}

 	})

 })
 
 /*=====  End of AGREGANDO PRODUCTOS DESDE EL BOTON PARA DISPOSITIVOS  ======*/
 
 /*============================================
 =            SELECCIONAR PRODUCTO            =
 ============================================*/
 
 $(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

 	var nombreProducto  = $(this).val();

 	var nuevoPrecioProducto =  $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

 	var nuevaCantidadProducto =  $(this).parent().parent().parent().children(".ingresoCantidad").children(".nuevaCantidadProducto");

 	console.log("nuevoprecioproducto", nuevoPrecioProducto);

 	var datos = new FormData();
 	datos.append("nombreProducto", nombreProducto);

 	$.ajax({

 		url: "ajax/productos.ajax.php",
 		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success:function(respuesta){

			$(nuevaCantidadProducto).attr("stock", respuesta["stock"]);

			$(nuevoPrecioProducto).val(respuesta["precio_venta"]);

			$(nuevoPrecioProducto).attr("precioReal", respuesta["precio_venta"]);




		}

	})


 })
 
 /*=====  End of SELECCIONAR PRODUCTO  ======*/
 
 /*=============================================
 =            MODIFICAR LA CANTIDAD            =
 =============================================*/
 
 $(".formularioVenta").on("change", "input.nuevaCantidadProducto", function(){

 	var precio = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

 	var precioFinal = $(this).val() * precio.attr("precioReal");

 	precio.val(precioFinal);

 	if (Number($(this).val()) > Number($(this).attr("stock"))) {

 		$(this).val(1);

 		var precioFinal = $(this).val() * precio.attr("precioReal");

 		precio.val(precioFinal);

 		sumarTotalPrecios();

 		//AGREGAR IMPUESTO
		agregarImpuesto();

 		swal({

 			title: "La cantidad supera el Stock",
 			text: "¡sólo hay"+$(this).attr("stock")+" unidades!",
 			type: "error",
 			confirButtonText: "¡Cerrar!"
 		})
 	}

 	//SUMAR TOTAL DE PRECIOS
	sumarTotalPrecios();

	//AGREGAR IMPUESTO
	agregarImpuesto();

})
 
 
 /*=====  End of MODIFICAR LA CANTIDAD  ======*/
 

 /*===============================================
 =            SUMAR TODOS LOS PRECIOS            =
 ===============================================*/
 
 function sumarTotalPrecios(){

 	var precioItem = $(".nuevoPrecioProducto");

 	var arraySumarPrecio = [];

 	for(var i = 0; i < precioItem.length; i++){

 		arraySumarPrecio.push(Number($(precioItem[i]).val()));

 	}

 	function sumarArraysPrecios(total, numero){

 		return total + numero;
 	}

 	var sumaTotalPrecio = arraySumarPrecio.reduce(sumarArraysPrecios);

 	$("#nuevoTotalVenta").val(sumaTotalPrecio);
 	$("#nuevoTotalVenta").attr("total", sumaTotalPrecio);
 }
 
 
 /*=====  End of SUMAR TODOS LOS PRECIOS  ======*/
 
 /*================================================
 =            FUNCION AGREGAR INPUESTO            =
 ================================================*/
 
 function agregarImpuesto(){

 	var impuesto = $("#nuevoImpuestoVenta").val();
 	var precioTotal = $("#nuevoTotalVenta").attr("total");

 	var precioImpuesto = Number(precioTotal * impuesto/100);

 	var totalConImpuesto = Number(precioImpuesto) + Number(precioTotal);

 	$("#nuevoTotalVenta").val(totalConImpuesto);

 	$("#nuevoPrecioImpuesto").val(precioImpuesto);

 	$("#nuevoPrecioNeto").val(precioTotal);
 }
 
 /*=====  End of FUNCION AGREGAR INPUESTO  ======*/
 

 /*=================================================
 =            CUANDO CAMBIE EL IMPUESTO            =
 =================================================*/
 
 $("#nuevoImpuestoVenta").change(function(){

 	agregarImpuesto();
 	
 })
 
 /*=====  End of CUANDO CAMBIE EL IMPUESTO  ======*/
 
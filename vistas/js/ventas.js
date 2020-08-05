/*=============================================================
=            VARIABLE LOCAL STORAGE
============================================================*/

if (localStorage.getItem("capturarRango")!= null) {

	$("#daterange-btn span").html(localStorage.getItem("capturarRango"));

}else{

	$("#daterange-btn span").html('<i class="fa fa-calendar"> Rango de fechas</i>');
}

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

                        '<input type="text" class="form-control nuevaDescripcionProducto" idProducto="'+idProducto+'" name="agregarProducto" value="'+descripcion+'" required readonly>'+

                      '</div>'+

                    '</div>'+

                    '<!-- cantidad del producto -->'+

                    '<div class="col-xs-3">'+
                      
                      '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock="'+stock+'" nuevoStock="'+Number(stock-1)+'" required>'+

                    '</div>'+

                    '<!-- precio del producto -->'+

                    '<div class="col-xs-3 ingresoPrecio" style="padding-left: 0px">'+
                      
                      '<div class="input-group">'+

                        '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
                        
                        '<input type="text" min="1" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" class="nuevoPrecioProducto" value="'+precio+'" readonly required>'+

                        

                      '</div>'+

                    '</div>'+

                    '</div>'
				
				)

			//SUMAR TOTAL DE PRECIOS
			sumarTotalPrecios();

			//AGREGAR IMPUESTO
			agregarImpuesto();

			//LISTAR PRODUCTOS
			listarProductos();

			//PONER FORMATO A LOS PRECIOS DE LOS PRODUCTOS

			$(".nuevoPrecioProducto").number(true, 0);


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
  		$("#totalVenta").val(0);
  		$("#nuevoImpuestoVenta").val(0);
  		$("#nuevoTotalVenta").attr("total", 0);

  	}else{
	  	//SUMAR TOTAL DE PRECIOS
		sumarTotalPrecios();

		//AGREGAR IMPUESTO
		agregarImpuesto();

		//LISTAR PRODUCTOS
		listarProductos();
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

                        '<select class="form-control nuevaDescripcionProducto agregarProducto"  id="producto'+numproducto+'" idProducto name="nuevaDescripcionProducto" required>'+

                        '<option>seleccione el producto </option>'+

                        '</select>'+

                      '</div>'+

                    '</div>'+ 

                    '<!-- cantidad del producto -->'+

                    '<div class="col-xs-3 ingresoCantidad">'+
                      
                      '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock nuevoStock required>'+

                    '</div>'+

                    '<!-- precio del producto -->'+

                    '<div class="col-xs-3 ingresoPrecio" style="padding-left: 0px">'+
                      
                      '<div class="input-group">'+

                        '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
                        
                        '<input type="text"  class="form-control nuevoPrecioProducto" precioReal="" class="nuevoPrecioProducto" value readonly required>'+

                        

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

				
				//PONER FORMATO A LOS PRECIOS DE LOS PRODUCTOS

				$(".nuevoPrecioProducto").number(true, 0);

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

			$(nuevaCantidadProducto).attr("nuevoStock", Number(respuesta["stock"])-1);

			$(nuevoPrecioProducto).val(respuesta["precio_venta"]);

			$(nuevoPrecioProducto).attr("precioReal", respuesta["precio_venta"]);

			//LISTAR PRODUCTOS
				listarProductos();


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

 	var nuevoStock = Number($(this).attr("stock")) - $(this).val();

 	$(this).attr("nuevoStock", nuevoStock); 

 	if (Number($(this).val()) > Number($(this).attr("stock"))) {

 		$(this).val(1);

 		var precioFinal = $(this).val() * precio.attr("precioReal");

 		precio.val(precioFinal);

 		sumarTotalPrecios();

 		//AGREGAR IMPUESTO
		agregarImpuesto();

		//LISTAR PRODUCTOS
		listarProductos();

 		swal({

 			title: "La cantidad supera el Stock",
 			text: "¡sólo hay "+$(this).attr("stock")+" unidades!",
 			type: "error",
 			confirButtonText: "¡Cerrar!"
 		})
 	}

 	//SUMAR TOTAL DE PRECIOS
	sumarTotalPrecios();

	//AGREGAR IMPUESTO
	agregarImpuesto();

	//LISTAR PRODUCTOS
	listarProductos();

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
 	$("#totalVenta").val(sumaTotalPrecio);
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

 	$("#totalVenta").val(totalConImpuesto);

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


 
 //PONER FORMATO A LOS PRECIOS DE LOS PRODUCTOS

$("#nuevoTotalVenta").number(true, 0);


/*=====================================================
=            SELECCIONAR EL METODO DE PAGO            =
=====================================================*/

$("#nuevoMetodoPago").change(function(){

	var metodo = $(this).val();

	if (metodo == "Efectivo") {

		$(this).parent().parent().removeClass("col-xs-6");

		$(this).parent().parent().addClass("col-xs-4");

		$(this).parent().parent().parent().children(".cajaMetodoPago").html(

			'<div class="col-xs-4">'+
				'<div class="input-group">'+
					'<span class="input-group-addon"><i class = "ion ion-social-usd"></i></span>'+
					'<input type="text" class="form-control nuevoValorEfectivo"  placeholder="00000000" required>'+
				'</div>'+
			'</div>'+

			'<div class="col-xs-4 capturarCambioEfectivo" style="padding-left:0px">'+
				'<div class="input-group">'+
					'<span class="input-group-addon"><i class = "ion ion-social-usd"></i></span>'+
					'<input type="text" class="form-control nuevoCambioEfectivo" name ="nuevoCambioEfectivo"  placeholder="00000000" required readonly>'+
				'</div>'+
			'</div>'

		)

		//AGREGAR FORMATO AL PRECIO

		$(".nuevoValorEfectivo").number(true, 0);
		$(".nuevoCambioEfectivo").number(true, 0);

		//LISTA METODO EN LA ENTRADA
		listarMetodos();

	}else{


		$(this).parent().parent().removeClass("col-xs-4");

		$(this).parent().parent().addClass("col-xs-6");


		$(this).parent().parent().parent().children(".cajaMetodoPago").html(
			
			'<div class="col-xs-6" style="padding-left: 0px">'+
                      
                     '<div class="input-group">'+
                        
                        '<input type="text" class="form-control" id="nuevoCodigoTransaccion" name="nuevoCodigoTransaccion" placeholder="codigo Transaccion" required>'+

                        '<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+

                      '</div>'+

                    '</div>')

	}
})


/*=====  End of SELECCIONAR EL METODO DE PAGO  ======*/


/*==========================================
=            CAMBIO DE EFECTIVO            =
==========================================*/

 $(".formularioVenta").on("change", "input.nuevoValorEfectivo", function(){

 	var efectivo = $(this).val();

 	var cambio = Number(efectivo) - Number($("#nuevoTotalVenta").val());

 	var nuevoCambiofectivo = $(this).parent().parent().parent().children(".capturarCambioEfectivo").children().children(".nuevoCambioEfectivo");

 	nuevoCambiofectivo.val(cambio);



 })


/*=====  End of CAMBIO DE EFECTIVO  ======*/

/*==========================================
=            CAMBIO DE TRANSACCION            =
==========================================*/

 $(".formularioVenta").on("change", "input#nuevoCodigoTransaccion", function(){

 //LISTA METODO EN LA ENTRADA
	listarMetodos();


 })


/*=====  End of CAMBIO DE EFECTIVO  ======*/

/*==================================================
=            LISTAR TODOS LOS PRODUCTOS            =
==================================================*/

function listarProductos(){

	var listaProductos = [];

	var descripcion = $(".nuevaDescripcionProducto");

	var cantidad = $(".nuevaCantidadProducto");

	var precio = $(".nuevoPrecioProducto");

	for (var i = 0; i < descripcion.length; i++) {

		listaProductos.push({"id" : $(descripcion[i]).attr("idProducto") ,
							"descripcion": $(descripcion[i]).val(),
							"cantidad": $(cantidad[i]).val(),
							"stock": $(cantidad[i]).attr("nuevoStock"),
							"precio": $(precio[i]).attr("precioReal"),
							"total": $(precio[i]).val()  });

	}

	console.log("listaProductos",JSON.stringify(listaProductos ));

	$("#listaProductos").val(JSON.stringify(listaProductos));
}

/*=====  End of LISTAR TODOS LOS PRODUCTOS  ======*/


/*==========================================
=            LISTAR METODO PAGO            =
==========================================*/

function listarMetodos(){

	var listaMetodos = "";

	if($("#nuevoMetodoPago").val() == "Efectivo"){

		$("#listaMetodoPago").val("Efectivo");

	}else{

		$("#listaMetodoPago").val($("#nuevoMetodoPago").val()+"-"+$("#nuevoCodigoTransaccion").val());

	}

}


/*=====  End of LISTAR METODO PAGO  ======*/


/*====================================
=            EDITAR VENTA            =
====================================*/

$(".tablas").on("click",".btnEditarVenta",function(){

	var idVenta = $(this).attr("idVenta");

	window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;


})

/*=====  End of EDITAR VENTA  ======*/


/*======================================
=            ELIMINAR VENTA            =
======================================*/

$(".tablas").on("click", ".btnEliminarVenta", function(){

  var idVenta = $(this).attr("idVenta");

  swal({
        title: '¿Está seguro de borrar la venta?',
        text: "¡Si no lo está puede cancelar la accíón!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar venta!'
      }).then(function(result){
        if (result.value) {
          
            window.location = "index.php?ruta=ventas&idVenta="+idVenta;
        }

  })

})


/*=====  End of ELIMINAR VENTA  ======*/


/*========================================
=            IMPRIMIR FACTURA            =
========================================*/

$(".tablas").on("click",".btnImprimirFactura", function(){

	var codigoVenta = $(this).attr("codigoVenta");

	window.open("extensiones/tcpdf/pdf/facturas.php?codigo="+codigoVenta,"_blank");

	// window.open("extensiones/tcpdf/pdf/1.php");
});


/*=====  End of IMPRIMIR FACTURA  ======*/

/*=============================================
RANGO DE FECHAS
=============================================*/

$('#daterange-btn').daterangepicker(
  {
    ranges   : {
      'Hoy'       : [moment(), moment()],
      'Ayer'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Últimos 7 días' : [moment().subtract(6, 'days'), moment()],
      'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
      'Este mes'  : [moment().startOf('month'), moment().endOf('month')],
      'Último mes'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment(),
    endDate  : moment()
  },
  function (start, end) {
    $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

    var fechaInicial = start.format('YYYY-MM-DD');

    var fechaFinal = end.format('YYYY-MM-DD');

    var capturarRango = $("#daterange-btn span").html();
   
   	localStorage.setItem("capturarRango", capturarRango);

   	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

  }

)

/*=============================================
CANCELAR RANGO DE FECHAS
=============================================*/

$(".daterangepicker.opensleft .range_inputs .cancelBtn").on("click", function(){

	localStorage.removeItem("capturarRango");
	localStorage.clear();
	window.location = "ventas";
})

/*=============================================
CAPTURAR HOY
=============================================*/

$(".daterangepicker.opensleft .ranges li").on("click", function(){

	var textoHoy = $(this).attr("data-range-key");

	if(textoHoy == "Hoy"){

		var d = new Date();
		
		var dia = d.getDate();
		var mes = d.getMonth()+1;
		var año = d.getFullYear();

		if (mes < 10 && dia < 10) {

			var fechaInicial = año+"-0"+mes+"-0"+dia;
			var fechaFinal = año+"-0"+mes+"-0"+dia;

		}else if(mes < 10){

			var fechaInicial = año+"-0"+mes+"-"+dia;
			var fechaFinal = año+"-0"+mes+"-"+dia;

		}else if(dia < 10){

			var fechaInicial = año+"-"+mes+"-0"+dia;
			var fechaFinal = año+"-"+mes+"-0"+dia;

		}else{

			var fechaInicial = año+"-"+mes+"-"+dia;
	    	var fechaFinal = año+"-"+mes+"-"+dia;

		}	



    	localStorage.setItem("capturarRango", "Hoy");

    	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

	}

})
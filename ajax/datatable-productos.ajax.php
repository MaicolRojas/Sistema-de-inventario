<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";

require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";

class TablaProductos{

	/*=====================================================
	=            MOSTRAR LA TABLA DE PRODUCTOS            =
	=====================================================*/
	
	public function mostrarTablasProductos(){

		 
        $item = null;

        $valor = null;

        $productos = ControladorProductos::ctrMostrarProductos($item, $valor);

          $datosJson = '
          		{
			  "data": [';

			  for ($i=0; $i < count($productos) ; $i++){

			  	/*========================================
			  	=            TRAEMOS IMAGENES            =
			  	========================================*/
			  	
			  		$imagen = "<img src='".$productos[$i]["imagen"]."' style='width:40px'>";
			  	
			  	
			  	/*=====  End of TRAEMOS IMAGENES  ======*/

			  	/*==========================================
			  	=            TRAEMOS CATEGORIAS            =
			  	==========================================*/
			  	
			  	$item = "id";

			  	$valor = $productos[$i]["id_categoria"];

			  	$categorias = ControladorCategorias::ctrMostrarCategorias($item, $valor );
			  	
			  	
			  	/*=====  End of TRAEMOS CATEGORIAS  ======*/

			  	/*=============================
			  	=            STOCK            =
			  	=============================*/

			  	if ($productos[$i]['stock'] <= 10) {
			  		
			  		$stock = "<button class='btn btn-danger'>".$productos[$i]['stock']."</button> ";

			  	}else if ($productos[$i]['stock'] > 11 && $productos[$i]['stock'] < 20) {
			  		
			  		$stock = "<button class='btn btn-warning'>".$productos[$i]['stock']."</button> ";

			  	}else{

			  		$stock = "<button class='btn btn-success'>".$productos[$i]['stock']."</button> ";

			  	}
			  	
			  	
			  	
			  	/*=====  End of STOCK  ======*/
			  	

			  	/*============================================
			  	=            TRAEMOS LAS ACCIONES            =
			  	============================================*/

			  	$botones =  "<div class='btn-group'><button class='btn btn-warning btnEditarProducto' idProducto='".$productos[$i]["id"]."' data-toggle='modal' data-target='#modalEditarProducto'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarProducto' idProducto='".$productos[$i]["id"]."' codigo='".$productos[$i]["codigo"]."' imagen='".$productos[$i]["imagen"]."'><i class='fa fa-times'></i></button></div>"; 


			  	
			  	/*=====  End of TRAEMOS LAS ACCIONES  ======*/
			  	

			  	$datosJson .= '
				  	 [
				      "'.($i+1).'",
				      "'.$imagen.'",
				      "'.$productos[$i]['codigo'].'",
				      "'.$productos[$i]['descripcion'].'",
				      "'.$categorias['categoria'].'",
				      "'.$stock.'",
				      "$ '.number_format($productos[$i]['precio_compra']).'",
				      "$ '.number_format($productos[$i]['precio_venta']).'",
				      "'.$productos[$i]['fecha'].'",
				      "'.$botones.'"
				    ],';


			  }

			  $datosJson = substr($datosJson, 0 , -1);

			  $datosJson .= '
			  		]
			  	}
			  ';
			  echo $datosJson ; 
          return; 

          //foreach ($productos as $key => $value) {}
		
		
	
	
	/*=====  End of MOSTRAR LA TABLA DE PRODUCTOS  ======*/
	
	
	
	}
}


/*==================================================
=            ACTIVAR TABLA DE PRODUCTOS            =
==================================================*/

$activarProductos = new TablaProductos();
$activarProductos -> mostrarTablasProductos();

/*=====  End of ACTIVAR TABLA DE PRODUCTOS  ======*/

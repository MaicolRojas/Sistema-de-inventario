<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";



class TablaProductosVentas{

	/*=====================================================
	=            MOSTRAR LA TABLA DE PRODUCTOS            =
	=====================================================*/
	
	public function mostrarTablasProductosVentas(){

		 
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

			  	$botones =  "<div class='btn-group'><button class='btn btn-primary agregarProducto recuperarBoton' idProducto='".$productos[$i]['id']."'>Agregar</button></div>"; 


			  	
			  	/*=====  End of TRAEMOS LAS ACCIONES  ======*/
			  	

			  	$datosJson .= '
				  	 [
				      "'.($i+1).'",
				      "'.$imagen.'",
				      "'.$productos[$i]['codigo'].'",
				      "'.$productos[$i]['descripcion'].'",
				      "'.$stock.'",
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

$activarProductos = new TablaProductosVentas();
$activarProductos -> mostrarTablasProductosVentas();

/*=====  End of ACTIVAR TABLA DE PRODUCTOS  ======*/

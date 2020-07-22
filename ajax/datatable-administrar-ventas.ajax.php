<?php

require_once "../controladores/ventas.controlador.php";
require_once "../modelos/ventas.modelo.php";

require_once "../controladores/clientes.controlador.php";
require_once "../modelos/clientes.modelo.php";

require_once "../controladores/usuarios.controlador.php";
require_once "../modelos/usuarios.modelo.php";

class TablaAdministrarVentas{

	public function mostrarTablasVentas(){

		$item = null;

	$valor = null;

	$ventas = ControladorVentas::ctrMostrarVentas($item, $valor);

	$datosJson = '
          		{
			  "data": [';

			  for ($i=0; $i < count($ventas) ; $i++){

			  	$itemCliente = "id";

			  	$valorCliente = $ventas[$i]["id_cliente"];

			  	$respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente); 


			  	$itemUsuario = "id";

			  	$valorUsuario = $ventas[$i]["id_vendedor"];

			  	$respuestaUsuario = ControladorUsuarios::ctrMostrarUsuarios($itemUsuario, $valorUsuario); 

			  	//$botones =  "<div class='btn-group'><button class='btn btn-warning btnEditarCliente' data-toggle='modal' data-target='#modalEditarCliente' idCliente='".$clientes[$i]["id"]."''><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarCliente' idCliente='".$clientes[$i]["id"]."''><i class='fa fa-times'></i></button></div>"; 

			  	$botones = "<div class='btn-group'><button class='btn btn-info'><i class='fa fa-print'></i></button><button class='btn btn-warning btnEditarVenta' idVenta='".$ventas[$i]['id']."'><i class='fa fa-pencil'></i></button><button class='btn btn-danger'><i class='fa fa-times'></i></button></div>  ";

			  	$datosJson .= '
				  	 [
				      "'.($i+1).'",
				      "'.$ventas[$i]["codigo"].'",
				      "'.$respuestaCliente["nombre"].'",
				      "'.$respuestaUsuario["usuario"].'",
				      "'.$ventas[$i]["metodo_pago"].'",
				      "$'.number_format($ventas[$i]["neto"]).'",
				      "$'.number_format($ventas[$i]["total"]).'",
				      "'.$ventas[$i]["fecha"].'",
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

          echo '$(".btnEditarVenta").click(function(){

	var idVenta = $(this).attr("idVenta");

	window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;


})';
	}

	


}

/*==================================================
=            ACTIVAR TABLA DE CLIENTES            =
==================================================*/

$activarClientes = new TablaAdministrarVentas();
$activarClientes -> mostrarTablasVentas();

/*=====  End of ACTIVAR TABLA DE CLIENTES  ======*/


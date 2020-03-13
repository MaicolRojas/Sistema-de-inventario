<?php

require_once "../controladores/clientes.controlador.php";
require_once "../modelos/clientes.modelo.php";

class TablaClientes{

	public function mostrarTablasClientes(){

		$item = null;

	$valor = null;

	$clientes = ControladorClientes::ctrMostrarClientes($item, $valor);

	$datosJson = '
          		{
			  "data": [';

			  for ($i=0; $i < count($clientes) ; $i++){


			  	$botones =  "<div class='btn-group'><button class='btn btn-warning'><i class='fa fa-pencil btnEditarCliente' data-toggle='modal' data-target='modalEditarCliente' idCliente='".$clientes[$i]['id']."'></i></button><button class='btn btn-danger'><i class='fa fa-times'></i></button></div>"; 

			  	$datosJson .= '
				  	 [
				      "'.($i+1).'",
				      "'.$clientes[$i]['nombre'].'",
				      "'.$clientes[$i]['documento'].'",
				      "'.$clientes[$i]['email'].'",
				      "$ '.$clientes[$i]['telefono'].'",
				      "$ '.$clientes[$i]['direccion'].'",
				      "'.$clientes[$i]['fecha_nacimiento'].'",
				      "'.$clientes[$i]['compras'].'",
				      "'.$clientes[$i]['ultima_compra'].'",
				      "'.$clientes[$i]['fecha'].'",
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
	}

	


}

/*==================================================
=            ACTIVAR TABLA DE CLIENTES            =
==================================================*/

$activarClientes = new TablaClientes();
$activarClientes -> mostrarTablasClientes();

/*=====  End of ACTIVAR TABLA DE CLIENTES  ======*/

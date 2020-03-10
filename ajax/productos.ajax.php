<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";

class AjaxProducto{

	/*===============================================================
	=            GENERAR CÓDIGO A PARTIR DE LA CATEGORIA            =
	===============================================================*/
	public $idCategoria;

	public function ajaxCodigoProducto(){
		
		$item = "id_categoria";
		$valor = $this->idCategoria;

		$respuesta = ControladorProductos::ctrMostrarProductos($item, $valor);
		
		echo json_encode($respuesta);

	}
	
	
	/*=====  End of GENERAR CÓDIGO A PARTIR DE LA CATEGORIA  ======*/
	
}

/*===============================================================
=            GENERAR CODIGO A PARTIR DE ID CATEGORIA            =
===============================================================*/

if (isset($_POST['idCategoria'])) {

	$codigoProducto = new AjaxProducto();
	$codigoProducto -> idCategoria = $_POST['idCategoria'];
	$codigoProducto -> ajaxCodigoProducto();
}


/*=====  End of GENERAR CODIGO A PARTIR DE ID CATEGORIA  ======*/

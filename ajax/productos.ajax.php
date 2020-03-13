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

	/*=======================================
	=            EDITAR PRODUCTO            =
	=======================================*/
	
	public $idProducto;

	public function ajaxEditarProducto(){
		
		$item = "id";

		$valor = $this->idProducto;

		$respuesta = ControladorProductos::ctrMostrarProductos($item, $valor);
		
		echo json_encode($respuesta);


	}
	
	/*=====  End of EDITAR PRODUCTO  ======*/
	
	
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


	/*=======================================
	=            EDITAR PRODUCTO            =
	=======================================*/

	if (isset($_POST['idProducto'])) {

		$codigoProducto = new AjaxProducto();
		$codigoProducto -> idProducto = $_POST['idProducto'];
		$codigoProducto -> ajaxEditarProducto();
	}
	
	/*=====  End of EDITAR PRODUCTO  ======*/
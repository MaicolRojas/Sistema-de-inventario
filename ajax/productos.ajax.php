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

		$orden = "id";

		$respuesta = ControladorProductos::ctrMostrarProductos($item, $valor,$orden);
		
		echo json_encode($respuesta);

	}
	
	
	/*=====  End of GENERAR CÓDIGO A PARTIR DE LA CATEGORIA  ======*/

	/*=======================================
	=            EDITAR PRODUCTO            =
	=======================================*/
	
	public $idProducto;
	public $traerProductos;
	public $nombreProducto;

	public function ajaxEditarProducto(){

		if ($this->traerProductos == "ok") {
			

			$item = null;

			$valor = null;

			$orden = "id";

			$respuesta = ControladorProductos::ctrMostrarProductos($item, $valor,$orden);
			
			echo json_encode($respuesta);

		}else if($this->nombreProducto != ""){

			$item = "descripcion";

			$valor = $this->nombreProducto;

			$orden = "id";

			$respuesta = ControladorProductos::ctrMostrarProductos($item, $valor,$orden);
			
			echo json_encode($respuesta);


			}else{

			$item = "id";

			$valor = $this->idProducto;

			$orden = "id";

			$respuesta = ControladorProductos::ctrMostrarProductos($item, $valor,$orden);
			
			echo json_encode($respuesta);

		}


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

		$editarProducto = new AjaxProducto();
		$editarProducto -> idProducto = $_POST['idProducto'];
		$editarProducto -> ajaxEditarProducto();
	}
	
	/*=====  End of EDITAR PRODUCTO  ======*/


	/*=======================================
	=            TRAER PRODUCTO            =
	=======================================*/

	if (isset($_POST['traerProductos'])) {

		$traerProductos = new AjaxProducto();
		$traerProductos -> traerProductos = $_POST['traerProductos'];
		$traerProductos -> ajaxEditarProducto();
	}
	
	/*=====  End of TRAER PRODUCTO  ======*/


	/*=======================================
	=            TRAER PRODUCTO            =
	=======================================*/

	if (isset($_POST['nombreProducto'])) {

		$traerProductos = new AjaxProducto();
		$traerProductos -> nombreProducto = $_POST['nombreProducto'];
		$traerProductos -> ajaxEditarProducto();
	}
	
	/*=====  End of TRAER PRODUCTO  ======*/
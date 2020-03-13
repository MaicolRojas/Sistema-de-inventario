<?php 

require_once '../controladores/clientes.controlador.php';
require_once "../modelos/clientes.modelo.php";

class AjaxClientes{

	/*======================================
	=            EDITAR CLIENTE            =
	======================================*/
	
	public $idCliente;

	public function ajaxEditarCliente(){

		$item = "id";

		$valor = $this->idCliente;

		$respuesta = ControladorClientes::ctrMostrarClientes($item, $valor);

		echo json_encode($respuesta);
		


	}
	
	
	/*=====  End of EDITAR CLIENTE  ======*/
	
}

/*======================================
=            EDITAR CLIENTE            =
======================================*/
if (isset($_POST['idCliente'])) {
	
	$editarCliente = new AjaxClientes();
	$editarCliente -> idCliente = $_POST['idCliente'];
	$editarCliente -> ajaxEditarCliente();

}



/*=====  End of EDITAR CLIENTE  ======*/

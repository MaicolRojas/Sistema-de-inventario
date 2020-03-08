<?php 

require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";


class AjaxCategorias{

/*====================================================
=            VALIDAR NO REPETIR CATEGORIA            =
====================================================*/

public $validarCategoria;

	public function ajaxValidarCategorias(){

		$item = "categoria";

		$valor = $this->validarCategoria;
		
		$respuesta = ControladorCategorias::ctrMostrarCategorias($item, $valor);

		echo json_encode($respuesta); 

	}

/*=====  End of VALIDAR NO REPETIR CATEGORIA  ======*/




}


/*==================================================
=            VALIDAR NO REPETIR USUARIO            =
==================================================*/

	if (isset($_POST["validarCategoria"])) {
	
		$valCategoria = new AjaxCategorias();
		$valCategoria -> validarCategoria = $_POST["validasrCategoria"];
		$valCategoria -> ajaxValidarCategorias();

	}
/*=====  End of VALIDAR NO REPETIR CATEGORIA  ======*/
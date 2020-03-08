<?php 

require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";


class AjaxCategorias{

	/*=========================================
	=            EDITAR CATEGORIAS            =
	=========================================*/
	
	
	public $idCategoria;


	public function ajaxEditarCategoria(){

		$item = "id";

		$valor = $this->idCategoria;
		
		$respuesta = ControladorCategorias::ctrMostrarCategorias($item, $valor);

 		echo json_encode($respuesta); 
	}
	

	/*=====  End of EDITAR CATEGORIAS  ======*/
	

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

/*================================================
=            VALIDAR EDITAR CATEGORIA            =
================================================*/

if (isset($_POST["idCategoria"])) {
	
	$editar = new AjaxCategorias();
	$editar -> idCategoria = $_POST["idCategoria"];
	$editar -> ajaxEditarCategoria();

}


/*=====  End of VALIDAR EDITAR CATEGORIA  ======*/


/*==================================================
=         VALIDAR NO REPETIR CATEGORIA            =
==================================================*/

	if (isset($_POST["validarCategoria"])) {
	
		$valCategoria = new AjaxCategorias();
		$valCategoria -> validarCategoria = $_POST["validarCategoria"];
		$valCategoria -> ajaxValidarCategorias();

	}
/*=====  End of VALIDAR NO REPETIR CATEGORIA  ======*/
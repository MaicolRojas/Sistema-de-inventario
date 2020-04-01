<?php

class ControladorVentas{

	/*=====================================
	=            MOSTAR VENTAS            =
	=====================================*/
	
	static public function ctrMostrarVentas($item, $valor){
		
		$tabla = "ventas";

		$respuesta = ModeloVentas::mdlMostrarVentas($tabla, $item, $valor);

		return $respuesta;

	}
	
	
	/*=====  End of MOSTAR VENTAS  ======*/
	
}
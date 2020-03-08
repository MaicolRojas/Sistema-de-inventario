<?php

class ControladorCategorias{

	/*========================================
	=            CREAR CATEGORIAS            =
	========================================*/
	
	static public function ctrCrearCategoria(){
		
		if (isset($_POST['nuevaCategoria'])){

			if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["nuevaCategoria"])){

				$tabla = "categorias";

				$datos = $_POST['nuevaCategoria'];

				$respuesta = ModeloCategorias::mdlIngresarCategoria($tabla, $datos);

				if ($respuesta == "ok") {

					echo '<script>

					swal({

						type: "success",
						title: "¡La categoría ha sido guardada correctamente!",
						showConfirmButton: true,
						confirmButtonText: "Cerrar"

					}).then(function(result){

						if(result.value){
						
							window.location = "";

						}

					});
				

				</script>';

				}else{
					echo "<script>
					alert('ERROR');
					</script>";
				}
				
			}else{

				echo '<script>

					swal({

						type: "error",
						title: "¡La categoría no puede ir vacía o llevar caracteres especiales!",
						showConfirmButton: true,
						confirmButtonText: "Cerrar"

					}).then(function(result){

						if(result.value){
						
							window.location = "categorias";

						}

					});
				

				</script>';
			}

		}

	}
	
	
	/*=====  End of CREAR CATEGORIAS  ======*/


	/*==========================================
	=            MOSTRAR CATEGORIAS            =
	==========================================*/
	
	static public function ctrMostrarCategorias($item,$valor){

		$tabla = "categorias";

		$respuesta = ModeloCategorias::mdlMostrarCategorias($tabla, $item, $valor);

		return $respuesta;
	}
	
	/*=====  End of MOSTRAR CATEGORIAS  ======*/
	
	
	
}

try {
  



} catch (Exception $e) {

    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    
}
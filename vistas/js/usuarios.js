/*=================================================
=            SUBIENDO FOTO DEL USUARIO            =
=================================================*/

$('.nuevaFoto').change(function(){

	var imagen = this.files[0];

	console.log("imagen", imagen);

	/*=========================================================
	=            VALIDANDO EL FORMATO DE LA IMAGEN            =
	=========================================================*/
	
	if (imagen["type"]!= "image/jpeg" && imagen["type"]!= "image/png" ) {
		
		$(".nuevaFoto").val("");

		swal({

			title: "Error al subir la imagen",
			text: "¡La imagen debe estar en formato JPG o PNG!",
			type: "error",
			confirmButtonText: "¡Cerrar!"
		});

	}else if(imagen["size"] > 2000000){

		$(".nuevaFoto").val("");

		swal({

			title: "Error al subir la imagen",
			text: "¡La imagen no debe pesar mas de 2MB!",
			type: "error",
			confirmButtonText: "¡Cerrar!"
		});

	}else{

		var datosImagen = new FileReader;
		datosImagen.readAsDataURL(imagen);

		$(datosImagen).on("load", function(event){

			var rutaImagen = event.target.result;

			$(".previsualisar").attr("src",rutaImagen);
		})
	}
	
	/*=====  End of VALIDANDO EL FORMATO DE LA IMAGEN  ======*/
	
})

 
/*=====  End of SUBIENDO FOTO DEL USUARIO  ======*/


/*======================================
=            EDITAR USUARIO            =
======================================*/

$(document).on("click", ".btnEditarUsuario", function(){

	var idUsuario = $(this).attr("idUsuario");
	
	var datos = new FormData();
	datos.append("idUsuario", idUsuario);

	$.ajax({

		url:"ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){
			
		
			$("#editarNombre").val(respuesta["nombre"]);
			$("#editarUsuario").val(respuesta["usuario"]);
			$("#editarPerfil").html(respuesta["perfil"]);
			$("#editarPerfil").val(respuesta["perfil"]);
			$("#fotoActual").val(respuesta["foto"]);

			$("#passwordActual").val(respuesta["password"]);

			if(respuesta["foto"] != ""){

				$(".previsualizar").attr("src", respuesta["foto"]);

			}

		}

	});

})

/*=====  End of EDITAR USUARIO  ======*/


/*========================================
=            ACTIVAR USUARIOS            =
========================================*/

$(".btnActivar").click(function() {

	var idUsuario = $(this).attr("idUsuario");
	var estadoUsuario = $(this).attr("estadoUsuario");
	
	var datos = new FormData();
	datos.append("activarId", idUsuario);
	datos.append("activarUsuario", estadoUsuario);

	$.ajax({

		url: "ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		success: function(respuesta){

			

		}
	});

	if (estadoUsuario == 0) {
		$(this).removeClass("btn-success");
		$(this).addClass("btn-danger");
		$(this).html("Desactivado");
		$(this).attr("estadoUsuario", 1);
	}else{

		$(this).addClass("btn-success");
		$(this).removeClass("btn-danger");
		$(this).html("Activado");
		$(this).attr("estadoUsuario", 0);

	}

})


/*=====  End of ACTIVAR USUARIOS  ======*/


/*=============================================================
=            REVISAR USUARIO SI YA ESTA REGISTRADO            =
=============================================================*/

$("#nuevoUsuario").change(function(){

	$(".alert").remove();


	var usuario = $(this).val();

	var datos = new FormData();
	datos.append("validarUsuario",usuario);

	$.ajax({

		url:"ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			if (respuesta) {
				$("#nuevoUsuario").parent().after("<br><div class ='alert alert-danger'>Este nombre de usuario ya existe en la base de datos</div>");
				$("#nuevoUsuario").val("");
			}

		}
	})
});

/*=====  End of REVISAR USUARIO SI YA ESTA REGISTRADO  ======*/

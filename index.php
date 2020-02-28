<?php

require_once 'controladores/plantilla.controlador.php';
require_once 'controladores/usuarios.controlador.php';
require_once 'controladores/categorias.controlador.php';
require_once 'controladores/productos.controlador.php';
require_once 'controladores/clientes.controlador.php';
require_once 'controladores/ventas.controlador.php';


// require_once 'modelos/plantilla.modelos.php';
require_once 'modelos/usuarios.modelo.php';
// require_once 'modelos/categorias.modelos.php';
// require_once 'modelos/productos.modelos.php';
// require_once 'modelos/clientes.modelos.php';
// require_once 'modelos/ventas.modelos.php';

$plantilla = new ControladorPlantilla();

$plantilla-> strControlador();

<?php 

require_once "../../../controladores/ventas.controlador.php";
require_once "../../../modelos/ventas.modelo.php";

require_once "../../../controladores/clientes.controlador.php";
require_once "../../../modelos/clientes.modelo.php";

require_once "../../../controladores/usuarios.controlador.php";
require_once "../../../modelos/usuarios.modelo.php";

require_once "../../../controladores/productos.controlador.php";
require_once "../../../modelos/productos.modelo.php";

class imprimirFactura{

    public $codigo;

    public function traerImpresionFactura(){
        
        // TRAER INFORMACION DE LA VENTA

        $itemVenta = "codigo";
        $valorVenta = $this->codigo;

        $respuestaVenta = ControladorVentas::ctrMostrarVentas($itemVenta, $valorVenta);

        $fecha = substr($respuestaVenta['fecha'],0,-8);
        $productos = json_decode($respuestaVenta['productos'], true);
        $neto = number_format($respuestaVenta['neto'],2);
        $impuesto = number_format($respuestaVenta['impuesto'],2);
        $total = number_format($respuestaVenta['total'],2);

        //INFORMACION DEL CLIENTE 

        $itemCliente = "id";

        $valorCliente = $respuestaVenta["id_cliente"];

        $respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente);

        //INFORMACIÓN DEL VENDEDOR

        $itemVendedor = "id";

        $valorVendedor = $respuestaVenta['id_vendedor'];

        $respuestaVendedor = ControladorUsuarios::ctrMostrarUsuarios($itemVendedor, $valorVendedor);

//REQUISITOS DE TCDF


// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
ob_clean();

$pdf->startPageGroup();

$pdf->AddPage();

$pdf->SetTitle("Factura ".$respuestaCliente["nombre"]);
$pdf->SetAuthor('Sistema de Inventario');

//----------------------------------------------------------------------------

$bloque1 = <<<EOF

    <table style>

        <tr>
            <td style="width:150px"><img src="images/logo-negro-bloque.png" alt=""></td>

            <td style="background-color:white; width:140px">

                <div style="font-size:8.5px; text-align:right; line-height:15px;">

                

                    <br>
                    NIT: 71.121.123-121-21
                    <br>
                    Dirección: C 17 SUR 42 - 47

                </div>

            </td>

            <td style="background-color:white; width:140px">

                <div style="font-size:8.5px; text-align:right; line-height:15px;">

                

                    <br>
                    Teléfono: 311 123 12 12
                    <br>
                    SistemaInventario@gmial.com

                </div>

            </td>

            <td style="background-color:white; width:110px; text-align:center; color:red"><br><br>FACTURA N. <br>$valorVenta</td>

        </tr>

    </table>

EOF;

$pdf->writeHTML($bloque1, false, false, false, false, '');

//----------------------------------------------------------------------------

$bloque2 = <<<EOF

    <table>
        <tr>
            <td style="width:540px"><img src="images/back.jpg" alt=""></td>
        </tr>
    </table>

    <table style="font-size:10px; padding:6px 10px;">

        <tr>

            <td style="border: 1px solid #666; background-color: white; width: 135px">

            Cliente:

            </td>

            <td style="border: 1px solid #666; background-color: white; width: 135px; text-align:center">

            $respuestaCliente[nombre]

            </td>

            <td style="border: 1px solid #666; background-color: white; width:270px; text-align:center">

                Fecha: $fecha

            </td>



        </tr>

        <tr>

            <th style="border: 1px solid #666; background-color: white; width: 135px">Cedula:
            </th>

            <td style="border: 1px solid #666; background-color: white; width: 135px; text-align:center">$respuestaCliente[documento]</td>

            

            <th style="border: 1px solid #666; background-color: white; width: 100px">Email:
            </th>

            <td style="border: 1px solid #666; background-color: white; width: 170px; text-align:center">$respuestaCliente[email]</td>

            </tr>

            <tr>

                <th style="border: 1px solid #666; background-color: white; width: 135px">Telefono:
                </th>

                <td style="border: 1px solid #666; background-color: white; width: 135px; text-align:center">$respuestaCliente[telefono]</td>

                

                <th style="border: 1px solid #666; background-color: white; width: 100px">Dirección:
                </th>

                <td style="border: 1px solid #666; background-color: white; width: 170px; text-align:center">$respuestaCliente[direccion]</td>

            </tr>

        <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>


        <tr>

            <td style="border: 1px solid #666; background-color:white; width:270px">Vendedor:</td>

            <td style="border: 1px solid #666; background-color:white; width:270px; text-align:center">Vendedor: $respuestaVendedor[nombre]</td>
            
        </tr>

        <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>

    </table>

EOF;

$pdf->writeHTML($bloque2, false, false, false, false, '');

//----------------------------------------------------------------------------

$bloque3 = <<<EOF

    <table style="font-size: 10px; padding:5px 10px;">

        <tr>

            <td style=" border: 1px soild #666; background-color:white; width:260px; text-align:center">Productos</td>
            <td style=" border: 1px soild #666; background-color:white; width:80px; text-align:center">Cantidad</td>
            <td style=" border: 1px soild #666; background-color:white; width:100px; text-align:center">Valor unit.</td>
            <td style=" border: 1px soild #666; background-color:white; width:100px; text-align:center">Valor Total</td>

        </tr>

    </table>

EOF;

$pdf->writeHTML($bloque3, false, false, false, false, '');

//----------------------------------------------------------------------------

foreach ($productos as $key => $value) {

$itemProducto = "descripcion";

$valorProducto = $value["descripcion"];

$orden = null;

$respuestaProducto = ControladorProductos::ctrMostrarProductos( $itemProducto, $valorProducto, $orden);

$valorUnitario = number_format($respuestaProducto['precio_venta'],2);
$valorTotal = number_format($value['total'],2);

$bloque4 =  <<<EOF

    <table style="font-size:10px; padding: 5px 10px;">

        <tr>

            <td style="border: 1px solid #666; color:#333; background-color:white; width:260px; text-align:center">$value[descripcion]
            </td>

            <td style="border: 1px solid #666; color:#333; background-color:white; width:80px; text-align:center">$value[cantidad]
            </td>

            <td style="border: 1px solid #666; color:#333; background-color:white; width:100px; text-align:center">$ $valorUnitario
            </td>

            <td style="border: 1px solid #666; color:#333; background-color:white; width:100px; text-align:center">$ $valorTotal
            </td>

        </tr>

    </table>

EOF;

$pdf->writeHTML($bloque4, false, false, false, false, '');

}

//----------------------------------------------------------------------------

$bloque5 = <<<EOF

    <table style="font-size:10px; padding: 5px 10px;">

        <tr>

            <td style="color:#333; background-color:white; width:340px; text-align:center">
            </td>

            <td style="border-bottom: 1px soild #666; background-color:white; width:100px; text-align:center">
            </td>

            <td style="border-bottom: 1px soild #666; background-color:white; width:100px; text-align:center">
            </td>

        </tr>

        <tr>



            <td style="border-right: 1px soild #666; background-color:white; width:340px; text-align:center">
            </td>

            <td style="border-bottom: 1px soild #666; background-color:white; width:100px; text-align:center">NETO:
            </td>

            <td style="border: 1px soild #666; background-color:white; width:100px; text-align:center">$neto
            </td>

        </tr>

        <tr>

            <td style="border-right: 1px soild #666; background-color:white; width:340px; text-align:center">
            </td>

            <td style="border-bottom: 1px soild #666; background-color:white; width:100px; text-align:center">Impuesto:
            </td>

            <td style="border: 1px soild #666; background-color:white; width:100px; text-align:center">$impuesto
            </td>

        </tr>

        <tr>

            <td style="border-right: 1px soild #666; background-color:white; width:340px; text-align:center">
            </td>

            <td style="border-bottom: 1px soild #666; background-color:white; width:100px; text-align:center">Total:
            </td>

            <td style="border: 1px soild #666; background-color:white; width:100px; text-align:center">$total
            </td>

        </tr>

    </table>    

EOF;

$pdf->writeHTML($bloque5, false, false, false, false, '');
//----------------------------------------------------------------------------
$metodo = substr($respuestaVenta["metodo_pago"], 0,2);

if ($respuestaVenta["metodo_pago"] == 'Efectivo') {
    

$bloque6 = <<<EOF

    <table style="font-size:10px; padding: 5px 10px;">

    <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>



        <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>

        <tr>

            <td style="border: 1px soild #666; background-color:white; width:270px; text-align:center">Metodo de pago
            </td>

            <td style="border: 1px soild #666; background-color:white; width:270px; text-align:center">$respuestaVenta[metodo_pago]
            </td>

            


        </tr>

    </table>

EOF;

$pdf->writeHTML($bloque6, false, false, false, false, '');

}elseif ($metodo == "TC" ) {
    $bloque7 = <<<EOF

    <table style="font-size:10px; padding: 5px 10px;">

        <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>

        <tr>

            <td style="border: 1px soild #666; background-color:white; width:135px; text-align:center">Metodo de pago
            </td>

            <td style="border: 1px soild #666; background-color:white; width:405px; text-align:center">Tarjeta de Credito
            </td>

            


        </tr>

        <tr>

            <td style="border: 1px soild #666; background-color:white; width:135px; text-align:center">Referencia
            </td>

            <td style="border: 1px soild #666; background-color:white; width:405px; text-align:center">$respuestaVenta[metodo_pago]
            </td>

            


        </tr>

    </table>

EOF;

$pdf->writeHTML($bloque7, false, false, false, false, '');

}elseif ($metodo == "TD") {
    
    $bloque8 = <<<EOF

    <table style="font-size:10px; padding: 5px 10px;">

        <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>

        <tr>

            <td style="border: 1px soild #666; background-color:white; width:135px; text-align:center">Metodo de pago
            </td>

            <td style="border: 1px soild #666; background-color:white; width:405px; text-align:center">Tarjeta Debito
            </td>

            


        </tr>

        <tr>

            <td style="border: 1px soild #666; background-color:white; width:135px; text-align:center">Referencia
            </td>

            <td style="border: 1px soild #666; background-color:white; width:405px; text-align:center">$respuestaVenta[metodo_pago]
            </td>
      
        <td style="border-right: 1px solid #666; background-color:white; width:540px"></td>

        </tr>


    </table> <br>

EOF;

$pdf->writeHTML($bloque8, false, false, false, false, '');

}
//----------------------------------------------------------------------------


         $bloque9 = <<<EOF
<table>
        <tr>
            <td style="width:540px"><img src="images/back.jpg" alt=""></td>
        </tr>
    </table>


     <table style="font-size:10px; padding: 10px 20px;">

      <tr>
        
        <td style="border-bottom: 1px solid #666; background-color:white; width:540px"></td>

        </tr>


        <tr>
        
        <td style="border: 1px solid #666; background-color:white; width:540px; font-size:12px; text-align:justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, ut, cupiditate! Voluptas tenetur rem at, assumenda id! Maiores in magni consequuntur eveniet recusandae officiis magnam, modi earum eos. Porro, illum.
        </td>

        </tr>

        </table>

EOF;

$pdf->writeHTML($bloque9, false, false, false, false, '');

/*=====  SALIDA DEL ARCHIVO  ======*/

$pdf->Output('factura.php');



    }

    

}





$factura = new imprimirFactura();
$factura -> codigo = $_GET['codigo'];
$factura -> traerImpresionFactura();








?>


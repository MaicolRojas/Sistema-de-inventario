 <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Crear Ventas
        
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li><a href="#">Crear Ventas</a></li>
       
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

     <div class="row">

      <!--===================================
      =            EL FORMULARIO            =
      ====================================-->
    
      <div class="col-lg-6 col-xs-11"><!--lg-5-->

        <div class="box box-success">
          
          <div class="box-header with-border">

            <form role="form" method="POST" class="formularioVenta">

            <div class="box-body">
                
                <div class="box">

                  <!--==========================================
                  =            ENTREDA DEL VENDEDOR            =
                  ===========================================-->
                  
                  <div class="form-group">

                    <div class="input-group">

                      <span class="input-group-addon"><i class="fa fa-user"></i></span>

                      <input type="text" class="form-control" id="nuevoVendedor" name="nuevoVendedor" value="<?php echo $_SESSION['nombre'] ?>" readonly>

                      <input type="hidden" name="idVendedor" = value="<?php echo $_SESSION['id'] ?>">
                    
                    </div>
                    
                  </div>

                  <!--==========================================
                  =            ENTREDA DEL VENDEDOR            =
                  ===========================================-->
                  
                  <div class="form-group">

                    <div class="input-group">

                      <span class="input-group-addon"><i class="fa fa-key"></i></span>

                      <?php 

                      $item = null;

                      $valor = null;

                      $ventas = ControladorVentas::ctrMostrarVentas($item, $valor);

                      if (!$ventas) {

                        echo ' <input type="text" class="form-control" id="nuevaVenta" name="nuevaVenta" value="10001" readonly="">';
                       
                      }else{

                        foreach ($ventas as $key => $value) {
                          # code...
                        }

                        $codigo = $value['codigo']+1;  

                         echo ' <input type="text" class="form-control" id="nuevaVenta" name="nuevaVenta" value="'.$codigo.'" readonly="">';
                      }

                      ?>

                     
                    
                    </div>
                    
                  </div>

                  <!--==========================================
                  =            ENTREDA DEL CLIENTE            =
                  ===========================================-->
                  
                  <div class="form-group">

                    <div class="input-group">

                      <span class="input-group-addon"><i class="fa fa-users"></i></span>

                      <select  class="form-control" id="seleccionarCliente" name="seleccionarCliente">

                        <option value="">Seleccionar Cliente</option>

                        <?php 

                        $item = null;

                        $valor = null;

                        $Categorias = ControladorClientes::ctrMostrarClientes($item, $valor);

                        foreach ($Categorias as $key => $value) {

                          echo "<option value='".$value['id']."'>".$value['nombre']."</option>";
                          
                        }

                        ?>

                      </select>

                      <span class="input-group-addon"><button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalAgregarCliente" data-dismiss="modal">Agregar Cliente</button></span>
                    
                    </div>
                    
                  </div>

                  <!--==========================================
                  =       ENTREDA PARA AGREGAR PRODUCTO        =
                  ===========================================-->

                  <div class="form-group row nuevoProducto">

                    

                  </div>

                  <!--=================================================
                  =            BOTON PARA AGREGAR PRODUCTO            =
                  ==================================================-->

                  <button type="button" class="btn btn-default hidden-lg btnAgregarProducto">Agregar Productos</button>

                  <hr>

                  <div class="row">

                  <!--=====================================
                  ENTRADA IMPUESTOS Y TOTAL
                  ======================================-->
                  
                  <div class="col-xs-8 pull-right">
                    
                    <table class="table">

                      <thead>

                        <tr>
                          <th>Impuesto</th>
                          <th>Total</th>      
                        </tr>

                      </thead>

                      <tbody>
                      
                        <tr>
                          
                          <td style="width: 50%">
                            
                            <div class="input-group">
                           
                              <input type="number" class="form-control input-lg" min="0" id="nuevoImpuestoVenta" name="nuevoImpuestoVenta" placeholder="0" required>

                               <input type="hidden" name="nuevoPrecioImpuesto" id="nuevoPrecioImpuesto" required>

                               <input type="hidden" name="nuevoPrecioNeto" id="nuevoPrecioNeto" required>

                              <span class="input-group-addon"><i class="fa fa-percent"></i></span>
                        
                            </div>

                          </td>

                           <td style="width: 50%">
                            
                            <div class="input-group">
                           
                              <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                              <input type="text" class="form-control input-lg" id="nuevoTotalVenta" name="nuevoTotalVenta" total="" placeholder="00000" readonly required>

                              <input type="hidden" name="totalVenta" id="totalVenta">
                              
                        
                            </div>

                          </td>

                        </tr>

                      </tbody>

                    </table>

                  </div>

                </div>

                  <hr>

                <!--===============================================
                =            ENTRADA DE METODO DE PAGO            =
                ================================================-->

                  <div class="form-group row">
                    
                    <div class="col-xs-6" style="padding-left: 0px">

                      <div class="input-group">

                      <select class="form-control" id="nuevoMetodoPago" name="nuevoMetodoPago" required="">
                      
                        <option value="">Seleccionar Metodo de Pago</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjetaCredito">Tarjeta de Credito</option>
                        <option value="tarjetaDebito">Tarjeta Debito</option>

                      </select>
            
                      </div>
                      
                    </div>

                    <div class="col-xs-6" style="padding-left: 0px">
                      
                      <div class="input-group">
                        
                        <input type="text" class="form-control" id="nuevoCodigoTransaccion" name="nuevoCodigoTransaccion" placeholder="codigo Transaccion" required>

                        <span class="input-group-addon"><i class="fa fa-lock"></i></span>

                      </div>

                    </div>

                  </div>

                  <br> 
                  
                </div>

              </div>

            <div class="box-fotter">
              
              <button type="submit" class="btn btn-primary pull-right">Guardar Venta</button>

            </div>

          </form>
            
          </div>

        </div>
        
      </div>

    <!--===========================================
    =            LA TABLA DE PRODUCTOS            =
    ============================================-->
    
   <div class="col-lg-6 hidden-md hidden-sm hidden-xs"><!--lg-7-->
        
        <div class="box box-warning">

          <div class="box-header with-border"></div>

          <div class="box-body">
            
            <table class="table table-bordered table-striped dt-responsive tablaVentas">
              
               <thead>

                 <tr>
                  <th style="width: 10px">#</th>
                  <th>Imagen</th>
                  <th>Código</th>
                  <th>Descripcion</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>

              </thead>

            </table>

          </div>

        </div>

      </div>
      
     </div>

    </section>
    <!-- /.content -->
  </div>


<!--=====================================
MODAL AGREGAR CLIENTE
======================================-->

<div id="modalAgregarCliente" class="modal fade" role="dialog">
  
  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post">

        <!--=====================================
        CABEZA DEL MODAL
        ======================================-->

        <div class="modal-header" style="background:#3c8dbc; color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Agregar Cliente</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

            <!-- ENTRADA PARA EL NOMBRE -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-user"></i></span> 

                <input type="text" class="form-control input-lg" name="nuevoCliente" placeholder="Ingresar Nombre" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL DOCUMENTO -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-key"></i></span> 

                <input type="number" min="0" class="form-control input-lg" name="nuevoDocumentoId" placeholder="Ingresar Documento" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL EMAIL -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span> 

                <input type="email" class="form-control input-lg" name="nuevoEmail" placeholder="Ingresar Email" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL TELEFONO -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-phone"></i></span> 

                <input type="text" class="form-control input-lg" name="nuevoTelefono" placeholder="Ingresar Telefono" data-inputmask="'mask':'(999) 999-999-99-99'" data-mask required>

              </div>

            </div>

             <!-- ENTRADA PARA LA DIRECCION -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span> 

                <input type="text" class="form-control input-lg" name="nuevaDireccion" placeholder="Ingresar Direccion" required>

              </div>

            </div>

            <!-- ENTRADA PARA LA FECHA DE NACIMIENTO -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-calendar"></i></span> 

                <input type="text" class="form-control input-lg" name="nuevaFechaNacimiento" placeholder="Ingresar Fecha de Nacimiento" data-inputmask="'alias':'yyyy/mm/dd'" data-mask required>

              </div>

            </div>


          </div>

        </div>

           
        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-primary">Guardar Cliente</button>

        </div>

      </form>

      <?php 

      $crearCliente = new ControladorClientes();
      $crearCliente -> ctrCrearCliente();

      ?>

    </div>

  </div>

</div>
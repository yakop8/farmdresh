<?php

require_once '../pages/layout.php';
includeLayouts();

?>

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <br></br>
            <h1 class="m-2">List Product</h1>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->


    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table id="" class="table table-bordered table-hover">
                  <thead>
                 
                  <br></br>
                  <?php
                   require '../config/db_connect.php';

                    $query = "SELECT * FROM produk";
                    $query_run = mysqli_query($connection, $query);
                    $no = 1;
                  ?>
                  <tr>
                    <th style="text-align: center;">No</th>
                    <th style="text-align: center;">Name</th>
                    <th style="text-align: center;">Harga</th>
                    <th style="text-align: center;">Stok</th>
              
                    
                  </tr>
                  </thead>
                  <tbody>
                  <?php
                    if(mysqli_num_rows($query_run) > 0)
                    {
                      while($row = mysqli_fetch_assoc($query_run))
                      {
                  ?>
                  <tr>
                        <td><?php echo $no++; ?></td>
                        <td><?php echo $row['nama']; ?></td>
                        <td><?php echo $row['harga']; ?></td>
                        <td><?php echo $row['stok']; ?></td>
          
                        
                    <?php
                      }
                    }
                    else {
                      echo "No Data Found";
                    }
                  ?>
                  <tbody>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
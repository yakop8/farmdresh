<?php
require_once '../pages/layout.php';
includeLayouts(); 
// Jika tombol "Add Product" diklik
if (isset($_POST['add_product_btn'])) {
    // Tangkap data yang diinputkan dari form
    $nama = $_POST['nama'];
    $harga = $_POST['harga'];
    $stok = $_POST['stok'];
    
    // Lakukan validasi atau sanitasi data jika diperlukan
    
    // Sisipkan koneksi ke database
    require '../config/db_connect.php';

    // Mendapatkan waktu saat ini
    $tanggal_dibuat = date('Y-m-d H:i:s');

    // Query SQL untuk menambahkan data ke dalam tabel produk
    $query = "INSERT INTO produk (nama, harga, stok, tanggal_dibuat) VALUES ('$nama', '$harga', '$stok', '$tanggal_dibuat')";

    // Eksekusi query
    $query_run = mysqli_query($connection, $query);

    // Periksa apakah query berhasil dieksekusi
    if ($query_run) {
        // Jika berhasil, set session status dan redirect ke halaman sebelumnya
        $_SESSION['status'] = "Product added successfully";
        header("Location: home.php");
    } else {
        // Jika gagal, set session status error
        $_SESSION['status'] = "Failed to add product";
    }
}
?>

<!-- Form untuk menambahkan produk -->
<div class="content-wrapper">
    <section class="content-header">
        <h1>Add Product</h1>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-6">
                <div class="box box-primary">
                    <div class="box-body">
                        <form action="" method="POST">
                            <div class="form-group">
                                <label for="nama">Product Name:</label>
                                <input type="text" id="nama" name="nama" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="harga">Price:</label>
                                <input type="number" id="harga" name="harga" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="stok">Stock:</label>
                                <input type="number" id="stok" name="stok" class="form-control" required>
                            </div>
                            <button type="submit" name="add_product_btn" class="btn btn-primary">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

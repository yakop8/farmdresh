<?php
// Mulai session
session_start();

// Sisipkan file konfigurasi database
require_once '../config/db_connect.php';

// Periksa apakah tombol "Update Product" diklik
if (isset($_POST['update_btn'])) {
    // Tangkap data yang diinputkan dari formulir
    $edit_id = $_POST['edit_id'];
    $nama = $_POST['nama'];
    $harga = $_POST['harga'];
    $stok = $_POST['stok'];
    
    // Mendapatkan waktu saat ini
    $tanggal_diubah = date('Y-m-d H:i:s');

    // Query SQL untuk memperbarui data produk berdasarkan ID
    $query = "UPDATE produk SET nama='$nama', harga='$harga', stok='$stok', tanggal_diubah='$tanggal_diubah' WHERE id='$edit_id'";

    // Eksekusi query
    $query_run = mysqli_query($connection, $query);

    // Periksa apakah query berhasil dieksekusi
    if ($query_run) {
        // Jika berhasil, set session status dan redirect ke halaman daftar produk
        $_SESSION['status'] = "Product updated successfully";
        header("Location: home.php");
    } else {
        // Jika gagal, set session status error
        $_SESSION['status'] = "Failed to update product";
    }
}

// Periksa apakah tombol "Delete Product" diklik
if (isset($_POST['delete_btn'])) {
    // Tangkap ID produk yang akan dihapus
    $delete_id = $_POST['delete_id'];

    // Query SQL untuk menghapus data produk berdasarkan ID
    $query = "DELETE FROM produk WHERE id = '$delete_id'";

    // Eksekusi query
    $query_run = mysqli_query($connection, $query);

    // Periksa apakah query berhasil dieksekusi
    if ($query_run) {
        // Jika berhasil, set session status dan redirect ke halaman daftar produk
        $_SESSION['status'] = "Product deleted successfully";
        header("Location: home.php");
    } else {
        // Jika gagal, set session status error
        $_SESSION['status'] = "Failed to delete product";
    }
}
?>

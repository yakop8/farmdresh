<?php
// Mulai session
session_start();
require_once '../pages/layout.php';
includeLayouts(); 


// Sisipkan file konfigurasi database
require_once '../config/db_connect.php';

// Periksa apakah tombol "Edit" diklik
if (isset($_POST['edit_btn'])) {
    // Tangkap ID produk yang akan diedit
    $edit_id = $_POST['edit_id'];

    // Query SQL untuk mengambil data produk berdasarkan ID
    $query = "SELECT * FROM produk WHERE id = '$edit_id'";
    $result = mysqli_query($connection, $query);

    if (mysqli_num_rows($result) == 1) {
        // Jika data ditemukan, tampilkan formulir untuk mengedit data produk
        $row = mysqli_fetch_assoc($result);
    } else {
        // Jika data tidak ditemukan, tampilkan pesan kesalahan
        echo "Product not found!";
    }
}
?>







<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>
    <!-- Memuat CSS dari layout -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <!-- Gaya tambahan untuk formulir -->
    <style>
        /* Gaya tambahan untuk formulir */
        .container {
            margin: 50px auto;
            padding: 20px;
            max-width: 500px;
            background-color: #f9f9f9;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            font-weight: bold;
        }
        input[type="text"],
        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        button[type="submit"] {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button[type="submit"]:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Edit Product</h2>
        <form action="edit_code.php" method="POST">
            <input type="hidden" name="edit_id" value="<?php echo $row['id']; ?>">
            <div class="form-group">
                <label for="nama">Product Name:</label>
                <input type="text" id="nama" name="nama" value="<?php echo $row['nama']; ?>" required>
            </div>
            <div class="form-group">
                <label for="harga">Price:</label>
                <input type="number" id="harga" name="harga" value="<?php echo $row['harga']; ?>" required>
            </div>
            <div class="form-group">
                <label for="stok">Stock:</label>
                <input type="number" id="stok" name="stok" value="<?php echo $row['stok']; ?>" required>
            </div>
            <button type="submit" name="update_btn">Update Product</button>
        </form>
    </div>
</body>
</html>

<?php
require ('pages/security.php');
require_once '../pages/layout.php';
includeLayouts();



// Cek jika ada parameter "page" yang dikirimkan
if (isset($_GET['page'])) {
    $page = $_GET['page'];
} else {
    // Jika tidak ada parameter "page" yang dikirimkan, arahkan ke halaman home.php
    header("Location: pages/login.php");
    exit;
}

// Validasi halaman yang diizinkan untuk diakses
$allowedPages = ['home', 'about', 'contact'];

// Periksa apakah halaman yang diminta ada dalam daftar halaman yang diizinkan
if (in_array($page, $allowedPages)) {
    // Jika halaman valid, arahkan ke halaman yang diminta
    header("Location: page/{$page}.php");
    exit;
} else {
    // Jika halaman tidak valid, arahkan ke halaman home.php
    header("Location: pages/login.php");
    exit;
}
?>

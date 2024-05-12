<?php
require('security.php');

if(isset($_POST['login_btn']))
{
    $email_login = $_POST['email'];
    $password_login = $_POST['password'];
    $role = $_POST['role']; // Ambil nilai peran dari form

    $query = "SELECT * FROM pengguna WHERE email='$email_login' AND password='$password_login' AND role='$role'"; // Tambahkan kondisi role
    $query_run = mysqli_query($connection, $query);

    if(mysqli_num_rows($query_run) > 0)
    {
        $_SESSION['name'] = $email_login;
        if($role == 'petani') {
            header('Location: home.php');
        } elseif($role == 'pelanggan') {
            header('Location: home_user.php');
        }
    }
    else
    {
        $_SESSION['status'] = "Email / Password / Role is Invalid"; // Pesan kesalahan
        header('Location: login.php');
    }
}
?>

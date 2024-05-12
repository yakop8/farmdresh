<?php
session_start();

if(isset($_POST['btn_logout']))
{
    session_destroy();
    unset($_SESSION['name']);
    header('Location: login.php');
}

?>
<?php

session_start();

$host="localhost:3306";
$user="unklab";
$password="Unklab12345?";
$database="farm_fresh";

$connection=mysqli_connect($host,$user,$password,$database);

if($dbconfig){

}else{
    header("Location: pages/login.php");
}

if(!$_SESSION['name'])
{
    header('Location: pages/login.php');
}

?>
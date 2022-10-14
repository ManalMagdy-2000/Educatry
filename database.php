<?php
$sname = "localhost";
$username = "root";
$password = "";
$databaseName = "signup.db";

$conn = mysqli_connect($sname,$username,$password,$databaseName);

if (!$conn){
    die ("Error: ".mysqli_connect_error());
}?>

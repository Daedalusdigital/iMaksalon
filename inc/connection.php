<?php

$host = "localhost";
$username = "root";
$password = "";
$db_name = "";

$conn = new mysqli($host,$username,$password,$db_name);

if(!$conn){
    echo "Error occured";
}

?>
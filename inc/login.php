<?php

include("connection.php");

if(isset($_POST['username']) && isset($_POST['password'])){
    echo "Username : ".$_POST['username']."<br/>Password : ".$_POST['password'];
}else{
    echo "No values found";
}
echo "running";
?>
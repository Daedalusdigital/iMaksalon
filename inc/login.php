<?php 
include("connection.php");
@$user_login;
@$password_login;
@$error_msg;
if(isset($_POST["uname"]) && isset($_POST["psw"])){

    
    $user_login = preg_replace('#[^A-Za-z0-9]#i', '' , $_POST["uname"]);
    $password_login = preg_replace('#[^A-Za-z0-9]#i', '' , $_POST["psw"]);
    $password_login_md5 = md5($password_login);
    
    $pass = "";
    
    $sql = $conn->query("SELECT * 
                            FROM users 
                            WHERE `username` = '$user_login' LIMIT 1");
    
    if($sql->num_rows > 0){
        while($row = $sql->fetch_assoc()){
            $pass = $row["password"]; 
            $_SESSION['first_name'] = $row['firstname'];
            $_SESSION['last_name'] = $row['lastname'];

        }
            
        if($pass == $password_login_md5){
            $_SESSION["user_login"] = $user_login;
            echo"<script>alert('user logged in');</script>";
 
        }    
        else{
              $error_msg =  "incorrect password";

        }
    }
    else{
        $error_msg =  "User doesn't exists";
    }
  
    
}
echo "<b style='color:red;'>".@$error_msg."</b>";
echo '  
    <form action="" method="POST">
    <input type="text" name="user_login" size="25" placeholder="Username" required="" value="'.@$user_login.'" /><br/><br/>
    <input type="password" name="password_login" size="25" placeholder="*********" required="" /><br/><br/>
    <input type="submit" name="login" value="Login!" />
    </form>
';

?>
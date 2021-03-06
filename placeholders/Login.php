<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<meta name="description" content="iMakApp" />
<meta name="keywords" content="Hair Salon" />
<meta name="author" content="Daedalus Digital" />
<title>iMakApp</title>
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
		function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- //for-mobile-apps -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
<!-- pop-up -->
<link href="css/popuo-box.css" rel="stylesheet" type="text/css" media="all" />
<!-- //pop-up -->
<link href="css/mislider.css" rel="stylesheet" type="text/css" />
<link href="css/mislider-custom.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/zoomslider.css" />
<link href="css/font-awesome.css" rel="stylesheet"> 
<script type="text/javascript" src="js/modernizr-2.6.2.min.js"></script>
<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" property="" />

<!--/web-fonts-->
<link href="//fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i,900" rel="stylesheet">
<link href="//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i" rel="stylesheet">
<!--//web-fonts-->
<!--font awesome-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="images/icon.png" rel="shortcut icon" type="image/png">
<link href="images/apple-touch-icon.png" rel="apple-touch-icon">
<link href="images/apple-touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72">
<link href="images/apple-touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114">
<link href="images/apple-touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144">
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css">
<link href="css/animate.css" rel="stylesheet" type="text/css">
<link href="css/css-plugin-collections.css" rel="stylesheet"/>
<link id="menuzord-menu-skins" href="css/menuzord-skins/menuzord-rounded-boxed.css" rel="stylesheet"/>
<link href="css/style-main.css" rel="stylesheet" type="text/css">
<link href="css/colors/theme-skin-lemon.css" rel="stylesheet" type="text/css">
<link href="css/preloader.css" rel="stylesheet" type="text/css">
<link href="css/custom-bootstrap-margin-padding.css" rel="stylesheet" type="text/css">
<link href="css/responsive.css" rel="stylesheet" type="text/css">
<link href="css/loader.css" rel="stylesheet" type="text/css">
<link href="css/modal.css" rel="stylesheet" type="text/css">
<link href="css/modalss.css" rel="stylesheet" type="text/css">

</head>
<body class="">

  <div id="preloader">
    <div id="loader"></div>
  </div>

<?php
include("inc/connection.php");

if(isset($_POST['submit']) == 'Login'){
  $user_login = $_POST["uname"];
  $password_login = $_POST["psw"];
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
          header('location:Home.php');

      }    
      else{
        $results =  "incorrect password";

      }
  }
  else{
    $results =  "User doesn't exists";
  } 
}


echo '
<header id="header" class="header">
<div class="header-nav navbar-fixed-top navbar-dark navbar-transparent navbar-sticky-animated animated-active">
  <div class="header-nav-wrapper">
    <div class="container">
      <nav id="menuzord-right" class="navbar-right">
        <ul class="menuzord-menu">
          <li ><a href="index.html"  class="btn btn-success">Home</a></li>
          <li style="margin-left:5px;"><a href="#" class="btn btn-success">Login</a></li>
          <li style="margin-left:5px;"><a href="Register.php" class="btn btn-success" >Sign Up</a></li>
        </ul>
      </nav>
    </div>
  </div>
</div>
<div style="margin-top:70px"></div>
</header>
<form action="" method="POST">
<div class="text-center" style="background-color:white;">
  <img src="images/Logo_login.png" alt="logo" style="width:250px" class="avatar">
</div>
<div class="col-md-offset-4 col-md-4">
  ';
echo @$results;
  echo '
  <input type="text" placeholder="Enter Username" name="uname" value="'.@$user_login.'" required>
  <input type="password" placeholder="Enter Password" name="psw" required>
  <input type="checkbox" checked="checked"> Remember me
  <span class="new" style="float: right;">forgot <a href="forgotPassword.php"  style="color:blue;font-weight:bolder;" >password?</a></span>
  <input type="submit"  name="submit" value="Login" />
</div>

<div class="col-md-offset-4 col-md-4">
  

<hr style="border-bottom: 2px solid grey;" />
</div>

    <div class=" col-md-offset-4 col-md-6">
  <div class="row">
  <div class="col-md-6">
      Dont have an Account? 
  </div> 
  <div class="col-md-6 navbar-right">
    <a href="Register.php" class="fomrLink" style="color:blue;font-weight:bolder;margin-left:-15px;" >Register</a>
  </div>
</div>
</div>
</form>
';
?>
<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript">
    setTimeout(function(){ $('#preloader').fadeOut('slow') }, 1000);
</script>
    </body>
</html>
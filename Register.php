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

if(isset($_POST['submit']) == 'Register'){
  $reg = @$_POST['reg'];
  
  //declareing variables to prevent errors
  $fn = "";//First name
  $ln = "";//Last name
  $un = "";//Username
  $em = "";//Email
  $em2 = "";//Email2
  $pswd = "";//Password
  $pswd2 = "";//password2
  $d = "";//Sign Up Date
  $u_check = ""; //cjeck if username exists
   $error_msg = "";
   
  //registration form
  $fn = strip_tags(@$_POST["fname"]);
  $ln = strip_tags(@$_POST["lname"]);
  $un = strip_tags(@$_POST["uname"]);
  $em = strip_tags(@$_POST["email"]);
  $phone = strip_tags(@$_POST["phone"]);
  $pswd = strip_tags(@$_POST["psw"]);
  $pswd2 = strip_tags(@$_POST["cpsw"]);
  

          $u_check = $conn->query("SELECT username FROM users WHERE username = '$un'");
          
          if($u_check->num_rows == 0){

                      if(strlen($pswd) > 30 ||strlen($pswd) < 5)
                      {
                         $error_msg =  "Your password must be between 5 and 30 characters long!";
                      }
                      else{
                          $pswd = md5($pswd);
                          $pswd2 = md5($pswd2);
                          $query = $conn->query("INSERT INTO users VALUES('','$fn','$ln','$un','$pswd','$em','0','Empty..','img/default_pic.jpg')");
                      }
                      
                  }
                  else{
                       $error_msg =  "Your password don't match!";
                  }
              
          }
          else{
               $error_msg =  "Username alredy exists";
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
          <li style="margin-left:5px;"><a href="Login.php" class="btn btn-success">Login</a></li>
          <li style="margin-left:5px;"><a href="#" class="btn btn-success" >Sign Up</a></li>
        </ul>
      </nav>
    </div>
  </div>
</div>
</header>
<form action="" method="POST">
<div class="col-md-4 text-center" style="margin-top:170px;">
<img src="images/Logo_login.png" alt="logo" style="width:400px" class="avatar">
</div>
<div class="form col-md-4 register">
<center><h2><b>iMAKAPP</b></h2></center>
  <input type="text" placeholder="First Name" name="fname" required>

  <input type="text" placeholder="Last Name" name="lname" required>

  <input type="text" placeholder="Username" name="uname" required>

  <input type="email" placeholder="Email" name="email" required>

  <input type="text" placeholder="Phone Number" name="phone" required>

  <input type="password" placeholder="Enter Password" name="psw" required>

  <input type="password" placeholder="Confirm Password" name="cpsw" required>
    
  <input type="submit" name="submit" value="Register" />
   <hr style="border-bottom: 2px solid grey;" />
</div>
<div class="col-md-4 text-center">
</div>
<div class="col-md-offset-4 col-md-6">
  <div class="row">
  <div class="col-md-6">
     Don\'t have an Account? 
  </div> 
  <div class="col-md-6 navbar-right">
    <a href="Login.php"  style="color:blue;font-weight:bolder;" >Login</a>
  </div>
</div>
</div>
</form>';
?>


<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript">
    setTimeout(function(){ $('#preloader').fadeOut('slow') }, 1000);
</script>
</body>
</html>
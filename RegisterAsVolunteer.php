<?php

session_start();

require_once("config.php");

$database = new MysqlDataProvider(CONFIG['db']);
if(isset($_SESSION['user'])) {
    redirectToHome();
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if(isset( $_POST["signUpBtn"])){
   
    //include all common data
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);
    $fullName = trim($_POST["fullName"]);
    $email = trim($_POST["email"]);
    $phone = trim($_POST["phone"]);
    $dateOfBirth = trim($_POST["dateOfBirth"]);
    $occupation = trim($_POST["occupation"]);
    
    if {
        $database->registerAsVolunteer($username, $password, $fullName, $email, $phone, $dateOfBirth, $occupation);
        $database = null;
        header("Location: Login.php");
        exit(); 

    } 

    }
    
    }
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register As Volunteer</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
</head>
<body>

      <!-- Top Bar -->
   <div class="navbar sticky-top top-nav-blue">
    <div class="container-fluid">
        <a class="navbar-brand link-light" href="Login.html"><img src="educatry.jpeg"alt="This is the CoVax logo" height="70" width="70">
    <p class="h1 align-middle d-inline-block"></p></a>
        <a href="Login.html"><button type="button" class="btn btn-outline-warning">Login</button></a>
    </div>
</div>  

<!--Register As Volunteer Form-->
<div class="container mt-5">
    <section class="container-fluid d-flex align-items-center">
        <div class="container">
            <div class="row d-flex align items-center bg-white">
                <div class="col-md-6 p-0">
                    <img src="educatrylogo.png" alt="educatry" class="img-fluid rounded-circle">
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12 mb-lg-4 mb-3 px-md-5">
                            <h1 class="text-md-start text-center">Create An Account</h1>
                            <form class="px-md-5 px-2 needs-validation" novalidate>

                                <!--Username-->  
                                <div class="form-floating-mb-3">
                                    <label for="userName">Username</label>
                                    <input type="text" class="form-control btn-lg" id="userName"
                                        placeholder="Username" required>
                                    <div class="invalid-feedback">Please enter a Username</div>
                                </div>

                                <!--Password-->  
                                <div class="form-floating-mb-3">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control btn-lg" id="password"
                                        placeholder="Password" required>
                                    <div class="invalid-feedback">Please enter your password [7 to 15 characters
                                        which contain only characters, numeric digits, underscore and first
                                        character must be a letter]</div>
                                </div>

                                <!--Fullname-->  
                                <div class="form-floating-mb-3">
                                    <label for="fullName">Full Name</label>
                                    <input type="text" class="form-control btn-lg" id="fullName"
                                        placeholder="fullName" required>
                                    <div class="invalid-feedback">Please enter your full Name</div>
                                </div>

                                <!--Email-->  
                                <div class="form-floating-mb-3">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control btn-lg" id="email"
                                        placeholder="Email" required>
                                    <div class="invalid-feedback">Please enter your email address</div>
                                </div>

                                <!--Phone-->  
                                <div class="form-floating-mb-3">
                                    <label for="phone">Phone Number</label>
                                    <input type="text" class="form-control btn-lg" id="phone"
                                        placeholder="Phone Number" required>
                                    <div class="invalid-feedback">Please enter your phone number</div>
                                </div>

                                <!--Occupation-->  
                                <div class="form-floating-mb-3">
                                    <label for="occupation">Occupation</label>
                                    <input type="text" class="form-control btn-lg" id="occupation"
                                        placeholder="Occupation" required>
                                    <div class="invalid-feedback">Please enter your occupation</div>
                                </div>

                                <!--Date of Birth-->  
                                <div class="form-floating-mb-3">
                                    <label for="dateOfBirth">Date Of Birth</label>
                                    <input type="date" class="form-control btn-lg id="dateOfBirth" 
                                        placeholder="Date of Birth" required>
                                    <div class="invalid-feedback">Please enter your date of birth</div>
                                </div>
                                
                                <!--Sign Up Button-->
                                <div class="signUp-btn d-flex justify-content-md-start mt-3 justify-content-center">
                                    <input type="submit" class="btn btn-warning mb-md-0 mb-5 btn-lg " id="signUpBtn" value="Sign Up">
                                </div>                                      
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<script src="RegisterAsVolunteer.js"></script>
</body>
</html>
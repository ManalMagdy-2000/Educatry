<?php
	
$showAlert = false;
$showError = false;
$exists=false;
	
if($_SERVER["REQUEST_METHOD"] == "POST") {
	
	// Include file which makes the
	// Database Connection.

$servername = "localhost"; 
$username = "root"; 
$password = "";

$database = "educatry";

 // Create a connection 
 $conn = mysqli_connect($servername, 
     $username, $password, $database);

if($conn) {
    echo "success"; 
} 
else {
    die("Error". mysqli_connect_error()); 
} 

	
	$username = $_POST["username"];
	$password = $_POST["password"];
	$email = $_POST['email'];
  $fullname = $_POST['fullname'];
  $phoneNo = $_POST['phoneNo']
  $staffID  = $_POST['staffID'];
  $position = $_POST["position"];

			
	
	$sql = "Select * from schooladmins where username='$username'";
	
	$result = mysqli_query($conn, $sql);
	
	$num = mysqli_num_rows($result);
	
	// This sql query is use to check if
	// the username is already present
	// or not in our Database
	if($num == 0) {

			$sql = "INSERT INTO `schooladmins` ( `username`,
				`password`, `fullname` , `email`, `phoneNo` ,`staffID`, `position`) 
                VALUES ('$username' , '$password','$fullname','$email','$phoneNo','$staffID','$position')";
	
			$result = mysqli_query($conn, $sql);
	
			if ($result) {
				$showAlert = true;
			}
	
if($num>0)
{
	$exists="Username not available";
}
	
}//end if
	
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register School Admin</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/viewApplicant.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/educatryAdmin.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

</head>
<body style="background-color: #fcb8fc">
  <div class="fullContainer " id="orgRepSection">
    <!--------------Start Navigation bar------------------->
    <header style="position: relative;">
        <div class="container" style="padding: 10px;" id="regSchool">
          <div class="logo" style="color:white; font-size: 30px; padding-top: 0; font-family: 'Monoton', cursive;">
            <a href="educatryAdminHome.html">Edu<span style="color:rgb(244, 236, 75); font-size:50px;">C</span>atry</a>
           </div>
           <nav class="topnav">
            <ul>
                <div class="dropdown">  
                    <button onmouseover="myProfile()" class="dropbtn" style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight:bolder; background-color: rgb(244, 236, 75);" >My Profile</button>  
                    <div id="myDropdown1" class="dropdown-content">  
                    <a href="RegisterSchool.html">Register School</a>  
                      <a href="schoolsList.html">Register School Admin</a>  
                    </div>  
                  </div>  
                  <li>
                    <a href="signUpPage.html" >Log out</a>
                </li>
            </ul>
        </nav>
        </div>
    </header>
<!--------------Navigation bar------------------->
<?php
	
	if($showAlert) {
	
		echo ' <div class="alert alert-success
			alert-dismissible fade show" role="alert">
	
			<strong>Success!</strong> Your account is
			now created and you can login.
			<button type="button" class="close"
				data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">×</span>
			</button>
		</div> ';
	}
	
	if($showError) {
	
		echo ' <div class="alert alert-danger
			alert-dismissible fade show" role="alert">
		<strong>Error!</strong> '. $showError.'
	
	<button type="button" class="close"
			data-dismiss="alert aria-label="Close">
			<span aria-hidden="true">×</span>
	</button>
	</div> ';
}
		
	if($exists) {
		echo ' <div class="alert alert-danger
			alert-dismissible fade show" role="alert">
	
		<strong>Error!</strong> '. $exists.'
		<button type="button" class="close"
			data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">×</span>
		</button>
	</div> ';
	}

?>
      <!--start form-->
<div class="applicantPage">
      <a href="#" name="record"></a>
      <div class="container">
        <div class="header">
            <h2 style="color: #445654; margin-left: 20.5%;" >School Administrator</h2>
        </div>
        <form id="form" class="form" action="Php/registerSchoolAdmin.php" method="POST" onsubmit="return loginValidation()"></form>>         
            <div class="form-control">
              <label for="username"> Username</label>
                   <input type="text"  name='username'  
                   placeholder="Manal10"  />
           </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" name="password" 
                placeholder="password" id="" /> </div> 
            <div class="form-control">
              <label for="fullname">Full Name</label>
                   <input type="text"  name='fname' 
                   id="recordPosition" placeholder="Manal Magdy" />
           </div> 
           <div class="form-control">
            <label for="email">Email</label>
                 <input type="email"  name='email' 
                 id="recordPosition" placeholder="manal_magdy@gmail.com" />
         </div>
         <div class="form-control">
            <label for="phonenumber">Phone Number</label>
                 <input type="text"  name='phoneNo' 
                 id="recordPosition" placeholder="+6013-2215-447" />
         </div> 
         <div class="form-control">
            <label for="city">Staff ID</label>
                 <input type="text"  name='staffID' 
                 id="recordPosition" placeholder="Staff#112" />
         </div> 
         <div class="form-control">
            <label for="city">Position</label>
                 <input type="text"  name='position' 
                 id="recordPosition" placeholder="Head" />
         </div>  
            <input type="submit" name="save"  value="Add" class="btn" style="background-color:rgb(244, 236, 75); border-color:rgb(244, 236, 75);" >
        </form>
    </div>
      <!--End form-->
</div>
<!-- start footer-->
<footer class="bg-dark text-center text-white">
<!-- Grid container -->
<div class="container ">
  <!-- Section: Form -->
  <section class="">
    <form action="">
      <!--Grid row-->
      <div class="row d-flex justify-content-center">
        <!--Grid column-->
        <div class="col-auto">
          <p class="pt-2">
            <strong>Sign up for our newsletter</strong>
          </p>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-5 col-12">
          <!-- Email input -->
          <div class="form-outline form-white mb-4">
            <input type="email" id="form5Example2" class="form-control" placeholder="Email address.." />
          </div>
        </div>
        <!--Grid column-->
        <!--Grid column-->
        <div class="col-auto">
          <!-- Submit button -->
          <button type="submit" class="btn btn-outline-light mb-4">
            Subscribe
          </button>
        </div>
        <!--Grid column-->
      </div>
      <!--Grid row-->
    </form>
  </section>
  <!-- Section: Form -->
</div>
<!-- Grid container -->

<!-- Copyright -->
<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
  &copy;2022Educatry
</div>
<!-- Copyright -->
</footer>
<!--End footer-->
<script src="Js/EducatryAdmin.js"></script>
<script src="Js/schoolAdmin.js"></script>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	
<script src="
https://code.jquery.com/jquery-3.5.1.slim.min.js"
	integrity="
sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
	crossorigin="anonymous">
</script>
	
<script src="
https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
	integrity=
"sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
	crossorigin="anonymous">
</script>
	
<script src="
https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
	integrity=
"sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
	crossorigin="anonymous">
</script>
</body>
</html>
<?php
include('connect.php');
if(isset($_POST['save']))
{
$schoolName = $_POST['schoolName'];
$address = $_POST['address'];
$city = $_POST['city'];
$duplicate=bind_result($conn,"select * from school where schoolName='$schoolName' and city='$city'");
if (mysql_num_rows($duplicate)>0)
{
header("Location: http://localhost/BIT216/Educatry/RegisterSchool.html?message=Cannot have same school name in the same city ");
}
else{
try {
$sql = "INSERT INTO school (schoolName , address , city)
VALUES ('$schoolName', '$address','$city')";
$conn->exec($sql);
header("Location:  http://localhost/BIT216/Educatry/RegisterSchool.html?message=School has been registerd");
}
   catch(PDOException $e)
    {
          echo $sql . "
          " . $e->getMessage();
    }
$conn = null;
}
}
?>
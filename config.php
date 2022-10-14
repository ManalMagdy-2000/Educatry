<?php

require_once("Data/User.Class.php");
require_once("Data/SchoolAdmin.Class.php");
require_once("Data/Volunteer.Class.php");
require_once("Data/Offer.Class.php");
require_once("Data/Request.Class.php");
require_once("Data/MysqlDataProvider.Class.php");
require_once("Data/TutorialRequest.Class.php");
require_once("Data/ResourceRequest.Class.php");
require_once("functions.php");

const CONFIG = [
    'db' => 'mysql:dbname=educatry;host=localhost;port=3306',
    'db_user' => 'root',
    'db_password' => '' 
];
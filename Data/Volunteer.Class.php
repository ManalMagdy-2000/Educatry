<?php

require_once("User.Class.php");

class Volunteer extends User {

    private $dateOfBirth;
    private $occupation;

    function getDateOfBirth(){
        return $this->dateOfBirth;
    }

    function getOccupation(){
        return $this->occupation;
    }

    function setDateOfBirth($dateOfBirth){
        $this->dateOfBirth = $dateOfBirth;
    }

    function setOccupation($occupation){
        $this->occupation = $occupation;
    }
}
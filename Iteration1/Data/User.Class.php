<?php

abstract class User {

    protected $username;
    protected $password;
    protected $fullName;
    protected $email;
    protected $phone;

    function getUsername(){
        return $this->username;
    }

    function getPassword(){
        return $this->password;
    }

    function getFullName(){
        return $this->fullName;
    }

    function getEmail(){
        return $this->email;
    }

    function getPhone(){
        return $this->phone;
    }

    function setUsername($username){
        $this->username = $username;
    }

    function setPassword($password){
        $this->password = $password;
    }

    function setFullName($fullName){
        $this->fullName = $fullName;
    }

    function setEmail($email){
        $this->email = $email;
    }

    function setPhone($phone){
        $this->phone = $phone;
    }
}

// Sign Up button events
var signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", function (event) {
  
  var statusArray = [];
  statusArray.push(checkUserName());
  statusArray.push(checkPassword());
  statusArray.push(checkFullName());
  statusArray.push(checkEmail());
  statusArray.push(checkPhone());
  statusArray.push(checkOccupation());
  statusArray.push(checkDateOfBirth());
 
  if (statusArray.includes(false)) {
    event.preventDefault();
    event.stopPropagation();
  }
}, false);

// Check the Username 
function checkUserName() {
    var username = document.getElementById("username");
    var usernameValue = username.value.trim();
  
    if(usernameValue != ''){
      addIsValid(username);
      return true;
    }else{
      addIsInvalid(username);
      return false;
    }
  }
  
  // Check the Password format is valid
  function checkPassword() {
    var password = document.getElementById("password");
    var passwordValue = password.value.trim();
    var regex =  /^[A-Za-z]\w{7,14}$/;
  
  
    if(regex.test(passwordValue)){
      addIsValid(password);
      return true;
    }else{
      addIsInvalid(password);
      return false;
    }
  }

  // Check the Full Name
  function checkFullName() {
    var fullName = document.getElementById("fullName");
    var fullNameValue = fullName.value.trim();
  
    if(fullNameValue != ''){
      addIsValid(fullName);
      return true;
    }else{
      addIsInvalid(fullName);
      return false;
    }
  }

  // Check the Email format is valid
  function checkEmail() {
    var email = document.getElementById("email");
    var emailValue = email.value.trim();
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if(regex.test(emailValue)){
      addIsValid(email);
      return true;
    }else{
      addIsInvalid(email);
      return false;
    }
  }

   // Check the Phone
   function checkPhone() {
    var phone = document.getElementById("phone");
    var phoneValue = phone.value.trim();
  
    if(phoneValue != ''){
      addIsValid(phone);
      return true;
    }else{
      addIsInvalid(phone);
      return false;
    }
  }

  // Check the Occupation 
function checkOccupation() {
  var occupation = document.getElementById("occupation");
  var occupationValue = occupation.value.trim();

  if(occupationValue != ''){
    addIsValid(occupation);
    return true;
  }else{
    addIsInvalid(occupation);
    return false;
  }
}

// Date Picker set 18 years and above
var startDate = "2004";
var endDate = new Date().getFullYear() - 18;
var interval = startDate + ":" + endDate;

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 

 // Check the DateOfBirth
 function checkDateOfBirth(){
  var dateOfBirth = document.getElementById("dateOfBirth");
  var validDate = Date.parse(dateOfBirth.value);

  // must set, else, invalid comparison due to current time
  startDate.setHours(0,0,0,0);

  if(isNaN(validDate)){
    addIsInvalid(dateOfBirth);
    return false;
  }
  else {
    if(validDate >= startDate){
      addIsValid(dateOfBirth);
      return true;
    } else {
      addIsInvalid(dateOfBirth);
      return false;
    }
  }
}


  // Add valid class & removes any invalid class
function addIsValid(element){
    if(!element.classList.contains("is-valid")){
      element.classList.add("is-valid");
    }
  
    if(element.classList.contains("is-invalid")){
      element.classList.remove("is-invalid");
    }
  }
  
  
  // Add invalid class & removes any valid class
  function addIsInvalid(element){
    if(!element.classList.contains("is-invalid")){
      element.classList.add("is-invalid");
    }
  
    if(element.classList.contains("is-valid")){
      element.classList.remove("is-valid");
    }
  }
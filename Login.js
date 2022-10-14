//Enables log in button when all fields are filled (NOT NEEDED NOW)
// var username = document.getElementById("username");
// var password = document.getElementById("password");
// var loginBtn = document.getElementById("loginBtn");
// loginBtn.disabled = true;

// username.addEventListener('keyup', isEmpty);
// password.addEventListener('keyup', isEmpty);

// function isEmpty(){
//   if(checkUserName() && checkPassword()) {
//     loginBtn.disabled = false;
//   } else {
//     loginBtn.disabled = true;
//   }
// }


// Log in button events
var loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", function (event) {
  
  var statusArray = [];
  statusArray.push(checkUserName());
  statusArray.push(checkPassword());
 
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

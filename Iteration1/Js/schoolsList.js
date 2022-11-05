function appealDate1(){
    alert("From Date : 2022-03-22 \nTo Date : 2023-03-01");
    window.location.href="contributionList.html";
}
function appealDate2(){
    alert("From Date : 2022-04-20 \nTo Date : 2023-04-20 ");
    window.location.href="contributionList.html";
}
function appealDate3(){
    alert("From Date : 2022-04-13 \nTo Date : 2023-04-20 ");
    window.location.href="contributionList.html";
}
const heading = 'List of Schools';
let i = 0;

const typing = () => {
  if (i < heading.length) {
    document.querySelector('.heading').innerHTML += heading.charAt(i);
    i++;
    setTimeout(typing, 150);
  }
};
typing();



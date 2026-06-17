
var nameError=document.getElementById('name-error');
var mailError=document.getElementById('mail-error');
var phoneError=document.getElementById('phone-error');
var subjectError=document.getElementById('subject-error');
var messageError=document.getElementById('message-error');

function validateName(){
  var name = document.getElementById('name').value;
    if (name.length == 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (!name.match(/^[a-zA-Z\s]*$/)) {
        nameError.innerHTML = 'Enter full Name';
        return false;
    }
    return true;
}
function validateMail() {
    




}
function validatePhone() {
    var phone = document.getElementById('phone').value;
    if (phone.length == 0) {
        phoneError.innerHTML = 'Phone Number is required';
        return false;
    }


}
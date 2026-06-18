
var nameError=document.getElementById('name-error');
var mailError=document.getElementById('mail-error');
var phoneError=document.getElementById('phone-error');
var subjectError=document.getElementById('subject-error');
var messageError=document.getElementById('message-error');



function validateForm() {
    nameError.innerHTML = '';
    mailError.innerHTML = '';
    phoneError.innerHTML = '';
    subjectError.innerHTML = '';
    messageError.innerHTML = '';

    var isValid = true;

    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var mailId = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();

    // 1. Name Validation

    if (name.length === 0) {
        nameError.innerHTML = 'Name is required';
        isValid = false;
    } else if (!name.match(/^[a-zA-Z\s]+$/)) {
        nameError.innerHTML = 'Enter a valid name (letters only)';
        isValid = false;
    }
    // 2. Email Validation
    
    if (mailId.length === 0) {
        mailError.innerHTML = 'Email Id is required';
        isValid = false;
    } else if (!mailId.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)) {
        mailError.innerHTML = 'Mail Id should be in correct format';
        isValid = false;   
    }

    // 3. Phone Validation

    if (phone.length === 0) {
        phoneError.innerHTML = 'Phone Number is required';
        isValid = false;
    } else if (!phone.match(/^\d{10}$/)) { // Checks for a standard 10-digit number
        phoneError.innerHTML = 'Enter a valid 10-digit phone number';
        isValid = false;
    }

    // 4. Subject Validation

    if (subject.length === 0) {
        subjectError.innerHTML = 'Subject is required';
        isValid = false;
    }

    // 5. Message Validation
    
    if (message.length === 0) {
        messageError.innerHTML = 'Message cannot be empty';
        isValid = false;
    }
    if (isValid) {
        document.getElementById('contactForm').reset();
        
        alert("Message Send submitted successfully! \n You will be hearing from me soon");
        var successEl = document.getElementById('success-message') || document.getElementById('show-Message');
        if (successEl) successEl.innerHTML = "Thank you for your response...!";

    }
    return isValid;
}

// Prevent the form from reloading the page and wire up button safely
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    var sendBtn = document.getElementById('send-button');

    if (sendBtn) {
        // ensure button is non-submitting
        try { sendBtn.type = 'button'; } catch (e) {}
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var valid = validateForm();
            if (valid) {
                var successEl = document.getElementById('success-message') || document.getElementById('show-Message');
                if (successEl) successEl.innerHTML = "Thank you for your response...!";
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // Regex Validation Rules
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
  const phoneRegex = /^\+?[0-9\s-]{7,15}$/; 

  // Track which fields have been clicked/focused into at least once
  const visitedFields = new Set();
  const requiredFieldIds = ['name', 'email', 'phone', 'subject', 'message'];

  // --- Helper UI Functions ---
  function setError(inputElement, errorElement, message) {
    if (errorElement) errorElement.textContent = message;
    inputElement.style.borderColor = '#ff6b6b';
    // Remove check-mark indicator if error validation states drop down
    inputElement.closest('.field-container')?.classList.remove('is-valid');
  }

  function clearError(inputElement, errorElement, isCorrected = false) {
    if (errorElement) errorElement.textContent = '';
    inputElement.style.borderColor = isCorrected ? '#d1ffb3' : '';
    
    // Toggle active check-mark visibility css state hooks
    if (isCorrected) {
      inputElement.closest('.field-container')?.classList.add('is-valid');
    } else {
      inputElement.closest('.field-container')?.classList.remove('is-valid');
    }
  }

  // ==========================================
  // FIELD VALIDATION FUNCTIONS (Return true if valid)
  // ==========================================
  function validateName() {
    const input = document.getElementById('name');
    const error = document.getElementById('name-error');
    if (!input) return true;
    const val = input.value.trim();
    if (val === '') { setError(input, error, 'Name is required.'); return false; }
    else if (!nameRegex.test(val)) { setError(input, error, 'Name must contain only letters.'); return false; }
    else { clearError(input, error, true); return true; }
  }

  function validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('mail-error');
    if (!input) return true;
    const val = input.value.trim();
    if (val === '') { setError(input, error, 'Email address is required.'); return false; }
    else if (!emailRegex.test(val)) { setError(input, error, 'Please enter a valid email address.'); return false; }
    else { clearError(input, error, true); return true; }
  }

  function validatePhone() {
    const input = document.getElementById('phone');
    const error = document.getElementById('phone-error');
    if (!input) return true;
    const val = input.value.trim();
    if (val === '') { setError(input, error, 'Phone number is required.'); return false; }
    else if (!phoneRegex.test(val)) { setError(input, error, 'Enter a valid phone number.'); return false; }
    else { clearError(input, error, true); return true; }
  }

  function validateSubject() {
    const input = document.getElementById('subject');
    const error = document.getElementById('subject-error');
    if (!input) return true;
    const val = input.value.trim();
    if (val === '') { setError(input, error, 'Subject is required.'); return false; }
    else if (val.length < 4) { setError(input, error, 'Subject must be at least 4 characters.'); return false; }
    else { clearError(input, error, true); return true; }
  }

  function validateMessage() {
    const input = document.getElementById('message');
    const error = document.getElementById('message-error');
    if (!input) return true;
    const val = input.value.trim();
    if (val === '') { setError(input, error, 'Message text is required.'); return false; }
    else if (val.length < 10) { setError(input, error, 'Your message must be at least 10 characters.'); return false; }
    else { clearError(input, error, true); return true; }
  }

  // ==========================================
  // REAL-TIME ACTIONS & INPUT FORMATTING ENGINE
  // ==========================================
  const nameInp = document.getElementById('name');
  const nameErr = document.getElementById('name-error');
  if (nameInp) {
    nameInp.addEventListener('blur', validateName);
    nameInp.addEventListener('input', () => { if (nameRegex.test(nameInp.value.trim()) || nameInp.value.trim() === '') clearError(nameInp, nameErr); });
  }

  const mailInp = document.getElementById('email');
  const mailErr = document.getElementById('mail-error');
  if (mailInp) {
    mailInp.addEventListener('blur', validateEmail);
    mailInp.addEventListener('input', () => { if (emailRegex.test(mailInp.value.trim()) || mailInp.value.trim() === '') clearError(mailInp, mailErr); });
  }

  const phoneInp = document.getElementById('phone');
  const phoneErr = document.getElementById('phone-error');
  if (phoneInp) {
    phoneInp.addEventListener('blur', validatePhone);
    phoneInp.addEventListener('input', () => {
      let rawValue = phoneInp.value, hasPlus = rawValue.startsWith('+'), digits = rawValue.replace(/\D/g, ''), formattedValue = '';
      if (hasPlus) {
        formattedValue += '+';
        if (digits.length > 0) {
          let ccLength = digits.length > 10 ? digits.length - 10 : 2;
          ccLength = Math.min(ccLength, 3);
          let countryCode = digits.substring(0, ccLength), rest = digits.substring(ccLength);
          formattedValue += countryCode;
          if (rest.length > 0) formattedValue += ' ' + rest.substring(0, 5);
          if (rest.length > 5) formattedValue += ' ' + rest.substring(5, 10);
        }
      } else {
        if (digits.length > 0) formattedValue += digits.substring(0, 5);
        if (digits.length > 5) formattedValue += ' ' + digits.substring(5, 10);
        if (digits.length > 10) formattedValue += ' ' + digits.substring(10, 15);
      }
      phoneInp.value = formattedValue;
      if (phoneRegex.test(phoneInp.value.trim()) || phoneInp.value.trim() === '') clearError(phoneInp, phoneErr);
    });
  }

  const subInp = document.getElementById('subject');
  const subErr = document.getElementById('subject-error');
  if (subInp) {
    subInp.addEventListener('blur', validateSubject);
    subInp.addEventListener('input', () => { if (subInp.value.trim().length >= 4 || subInp.value.trim() === '') clearError(subInp, subErr); });
  }

  const msgInp = document.getElementById('message');
  const msgErr = document.getElementById('message-error');
  if (msgInp) {
    msgInp.addEventListener('blur', validateMessage);
    msgInp.addEventListener('input', () => { if (msgInp.value.trim().length >= 10 || msgInp.value.trim() === '') clearError(msgInp, msgErr); });
  }

  // ==========================================
  // SUBMISSION LOGIC PIPELINE
  // ==========================================
  const parentForm = document.getElementById('contact-form');
  const successPopup = document.getElementById('success-message');
  
  if (parentForm) {
    const submitBtn = document.getElementById('form-submit-btn');

    // Button Status Verification Router
    function checkFormStatus() {
      if (!submitBtn) return;
      
      const allFieldsVisited = requiredFieldIds.every(id => visitedFields.has(id));

      const isNameValid = nameRegex.test(nameInp?.value.trim() || '');
      const isEmailValid = emailRegex.test(mailInp?.value.trim() || '');
      const isPhoneValid = phoneRegex.test(phoneInp?.value.trim() || '');
      const isSubjectValid = (subInp?.value.trim().length || 0) >= 4;
      const isMessageValid = (msgInp?.value.trim().length || 0) >= 10;

      if (allFieldsVisited && isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    }

    // Assign operational focus tracking elements logic
    requiredFieldIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('focus', () => {
          visitedFields.add(id);
          checkFormStatus();
        });
        element.addEventListener('input', checkFormStatus);
        element.addEventListener('blur', checkFormStatus);
      }
    });

    // Enforce initial clamp verification on load setup
    checkFormStatus();

    parentForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Lock native page transitions/reloads

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid || !isMessageValid) {
        console.log('Validation failed');
        submitBtn.disabled = true;
      } else {
        console.log('All validations passed');
        
        // Get the submitted name
        const submittedName = document.getElementById('name')?.value.trim() || 'Guest';
        console.log('Submitted name:', submittedName);
        
        // Hide the form first
        parentForm.classList.add('hidden');
        parentForm.setAttribute('aria-hidden', 'true');
        console.log('Form hidden');
        
        if (successPopup) {
          console.log('Success popup found, showing message');

          const headerMessage = document.querySelector('#header-message span') || document.getElementById('header-message');
          if (headerMessage) {
            headerMessage.textContent = 'Message Send successfully';
          }
          
          // Update the name in the success message
          const nameElement = document.getElementById('submitted-name');
          if (nameElement) {
            nameElement.textContent = submittedName;
            console.log('Name updated in message');
          }
          
          // Show the success message with animation (stays visible)
          successPopup.classList.remove('hidden', 'opacity-0', 'scale-95');
          successPopup.classList.add('flex', 'opacity-100', 'scale-100');
          console.log('Success message displayed and will stay visible until page reload');
        } else {
          console.log('Success popup NOT found!');
        }
      }
    });
  }
});
              

// contatc.js (fixed)

const first_name = document.getElementById('first-name');
const email_input = document.getElementById('email-input');
const last_name = document.getElementById('last-name');
const phone_input = document.getElementById('phone-input');
// const radio_btn = document.getElementsByName('Select-Subject');

const Name_msg_error = 'Please enter a valid name.';
const Email_msg_error = 'Please enter a valid Email.';
const Phone_msg_error = 'Please enter a valid phone number (10 digits).';

const first_name_spanId = 'first-name-errormsg';
const email_input_spanId = 'email-errormsg';
const last_name_spanId = 'last-name-errormsg';
const phone_input_spanId = 'phone-errormsg';

// allow letters and spaces, min 2 chars
let namePattern = /^[A-Za-z\s]{2,}$/;
// basic email
let emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
// exactly 10 digits (change if you want 9-10)
let phonePattern = /^\d{10}$/;

function Valide_input_fun(input, regexpattern, spanid, msgerror) {
    let condition = true;
    const span = document.getElementById(spanid);
    if (span) span.textContent = '';

    // guard if input is missing
    if (!input) return false;

    const value = input.value.trim();
    if (!regexpattern.test(value)) {
        if (span) span.textContent = msgerror;
        condition = false;
    }

    return condition;
}

function Contact_submit_fun(event) {
    // prevent default if inside a form (safe)
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const Isfavorite_first_name = Valide_input_fun(first_name, namePattern, first_name_spanId, Name_msg_error);
    const Isfavorite_email_input = Valide_input_fun(email_input, emailPattern, email_input_spanId, Email_msg_error);
    const Isfavorite_last_name = Valide_input_fun(last_name, namePattern, last_name_spanId, Name_msg_error);
    const Isfavorite_phone_input = Valide_input_fun(phone_input, phonePattern, phone_input_spanId, Phone_msg_error);

    // debug log (safe here because vars are in scope)
    console.log('FN :' + Isfavorite_first_name + ' LN :' + Isfavorite_last_name + ' EM :' + Isfavorite_email_input + ' PH :' + Isfavorite_phone_input);

    if (!Isfavorite_first_name || !Isfavorite_email_input || !Isfavorite_last_name || !Isfavorite_phone_input) {
        alert('Please fix the errors first.');
        return;
    }

    alert('Your form submitted successfully!');
    const form = document.querySelector('.content-form form');
    if (form) form.reset();
}

// Attach live validation if elements exist
if (first_name) {
    first_name.addEventListener('input', () => {
        Valide_input_fun(first_name, namePattern, first_name_spanId, Name_msg_error);
    });
}
if (last_name) {
    last_name.addEventListener('input', () => {
        Valide_input_fun(last_name, namePattern, last_name_spanId, Name_msg_error);
    });
}
if (email_input) {
    email_input.addEventListener('input', () => {
        Valide_input_fun(email_input, emailPattern, email_input_spanId, Email_msg_error);
    });
}
if (phone_input) {
    phone_input.addEventListener('input', () => {
        Valide_input_fun(phone_input, phonePattern, phone_input_spanId, Phone_msg_error);
    });
}

// safe addEventListener for submit button
const contact_btn_submit = document.querySelector('.contact_btn_submit');
if (contact_btn_submit) {
    contact_btn_submit.addEventListener('click', Contact_submit_fun);
} else {
    console.warn('Submit button .contact_btn_submit not found.');
}

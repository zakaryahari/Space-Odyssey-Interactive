
const first_name = document.getElementById('first-name');
const email_input = document.getElementById('email-input');
const last_name = document.getElementById('last-name');
const phone_input = document.getElementById('phone-input');
const Radio_inputs = document.querySelectorAll('.radio');
const message_input = document.getElementById('message-input');


const Name_msg_error = 'Please enter a valid name.';
const Email_msg_error = 'Please enter a valid Email.';
const Phone_msg_error = 'Please enter a valid phone number (10 digits).';
const Radio_msg_error = 'Please select a Subject';
const message_msg_error = 'Please enter a Msg / min 10Le';

const first_name_spanId = 'first-name-errormsg';
const email_input_spanId = 'email-errormsg';
const last_name_spanId = 'last-name-errormsg';
const phone_input_spanId = 'phone-errormsg';
const Radio_input_spanId = 'radio-errormsg';
const Message_input_spanId = 'message-errormsg';


let namePattern = /^[A-Za-z\s]{2,}$/;

let emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

let phonePattern = /^\+?[\d\s\-\(\)]+$/;;

let MsgPattern = /^.{10,}$/;

function Radio_validation_fun(input, spanid, msgerror) {
    if (!input) {
        return;
    }

    return Array.from(input).some(radio => radio.checked);
}

function Valide_input_fun(input, regexpattern, spanid, msgerror) {
    let condition = true;
    const span = document.getElementById(spanid);

    span.textContent = '';


    if (!input) {
        return false;
    }

    const value = input.value.trim();
    if (value === "") {
        span.textContent = "";
        return;
    }
    if (!regexpattern.test(value)) {
        if (span) span.textContent = msgerror;
        condition = false;
    }

    return condition;
}

function Contact_submit_fun(event) {

    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const IsValide_first_name = Valide_input_fun(first_name, namePattern, first_name_spanId, Name_msg_error);
    const IsValide_email_input = Valide_input_fun(email_input, emailPattern, email_input_spanId, Email_msg_error);
    const IsValide_last_name = Valide_input_fun(last_name, namePattern, last_name_spanId, Name_msg_error);
    const IsValide_phone_input = Valide_input_fun(phone_input, phonePattern, phone_input_spanId, Phone_msg_error);
    const Isfavorite_radio_input = Radio_validation_fun(Radio_inputs, Radio_input_spanId, Radio_msg_error);
    const IsValide_message_input = Valide_input_fun(message_input, MsgPattern, Message_input_spanId, message_msg_error);


    // console.log('FN :' + IsValide_first_name + ' LN :' + IsValide_last_name + ' EM :' + IsValide_email_input + ' PH :' + IsValide_phone_input);

    if (!IsValide_first_name || !IsValide_email_input || !IsValide_last_name || !IsValide_phone_input || !Isfavorite_radio_input || !IsValide_message_input) {
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
if (message_input) {
    message_input.addEventListener('input', () => {
        Valide_input_fun(message_input, MsgPattern, Message_input_spanId, message_msg_error);
    })
}
// safe addEventListener for submit button
const contact_btn_submit = document.querySelector('.contact_btn_submit');
if (contact_btn_submit) {
    contact_btn_submit.addEventListener('click', Contact_submit_fun);
} else {
    console.warn('Submit button .contact_btn_submit not found.');
}

// Radio_validation_fun(Radio_inputs, Radio_input_spanId, Radio_msg_error);
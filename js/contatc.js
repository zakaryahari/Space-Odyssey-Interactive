
// Contact.html

const first_name = document.getElementById('first-name');
const email_input = document.getElementById('email-input');
const last_name = document.getElementById('last-name');
const phone_input = document.getElementById('phone-input');
const radio_btn = document.getElementsByName('Select-Subject');

const Name_msg_error = 'Please enter a valid name.';
const Email_msg_error = 'Please enter a valid Email.';
const Phone_msg_error = 'Please enter a valid phone number 10 digits.';

const first_name_spanId = 'first-name-errormsg';
const email_input_spanId = 'email-errormsg';
const last_name_spanId = 'last-name-errormsg';
const phone_input_spanId = 'phone-errormsg';

let namePattern = /^[A-Za-z\s]{2,}$/;
let emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
let phonePattern = /^\d{9,10}$/;

// const radio_btn = document.getElementsByName('Select-Subject');


function Valide_input_fun(input, regexpattern, spanid, msgerror) {
    let condition = true;
    document.getElementById(spanid).textContent = '';

    const value = input.value.trim();
    if (!regexpattern.test(value)) {
        const span = document.getElementById(spanid);
        span.textContent = msgerror;
        condition = false;
    }

    return condition;
}

function Contact_submit_fun() {
    const Isfavorite_first_name = Valide_input_fun(first_name, namePattern, first_name_spanId, Name_msg_error);
    const Isfavorite_email_input = Valide_input_fun(email_input, emailPattern, email_input_spanId, Email_msg_error);
    const Isfavorite_last_name = Valide_input_fun(last_name, namePattern, last_name_spanId, Name_msg_error);
    const Isfavorite_phone_input = Valide_input_fun(phone_input, phonePattern, phone_input_spanId, Phone_msg_error);

    if (!Isfavorite_first_name || !Isfavorite_email_input || !Isfavorite_last_name || !Isfavorite_phone_input) {
        alert('Please fix the errors up');
        return;
    }
    alert('Your form submitted successfully!');
    document.querySelector('.content-form form').reset();
}


console.log('FN :' + Isfavorite_first_name + 'LN :' + Isfavorite_last_name + 'EM :' + Isfavorite_email_input + 'PH :' + Isfavorite_phone_input);

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

const contact_btn_submit = document.querySelector('.contact_btn_submit');
contact_btn_submit.addEventListener('click', Contact_submit_fun);


// const radio_btn = document.getElementsByName('Select-Subject'); 
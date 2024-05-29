var loginButton = document.getElementById('loginButton');
var usernameInput = document.getElementById('username_input');
var usernameMail = document.getElementById('username_mail');
var usernamePassword = document.getElementById('username_password');

loginButton.addEventListener('click', function() {

    window.location.href = '/register_data';

});

// Función para verificar los campos y habilitar/deshabilitar el botón
function checkInputs() {

    if (usernameInput.value.trim() !== '' && usernamePassword.value.trim() !== '' && usernameMail.value.trim() !== ''){

        loginButton.disabled = false;

    } else {

        loginButton.disabled = true;

    }

}

// Añadir evento de escucha a los campos de entrada
usernameInput.addEventListener('input', checkInputs);
usernamePassword.addEventListener('input', checkInputs);
usernameMail.addEventListener('input', checkInputs);
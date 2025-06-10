var loginButton = document.getElementById('loginButton');
var usernameInput = document.getElementById('username_input');
var usernamePassword = document.getElementById('username_password');

loginButton.addEventListener('click', function() {

    

});



// Función para verificar los campos y habilitar/deshabilitar el botón
function checkInputs() {

    if (usernameInput.value.trim() !== '' && usernamePassword.value.trim() !== '') {

        loginButton.disabled = false;

    } else {

        loginButton.disabled = true;

    }

}

// Añadir evento de escucha a los campos de entrada
usernameInput.addEventListener('input', checkInputs);
usernamePassword.addEventListener('input', checkInputs);
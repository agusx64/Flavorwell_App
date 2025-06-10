var loginButton = document.getElementById('loginButton');
var usernameInput = document.getElementById('input_username');
var usernameMail = document.getElementById('input_mail');
var usernamePassword = document.getElementById('input_password');
const modal = document.getElementById('successModal');

var restHost = 'http://localhost:3000'

loginButton.addEventListener('click', function(event) {

    event.preventDefault();
    loginButton.textContent = 'Cargando...';
    loginButton.disabled = true;

    const userData = {

        username: usernameInput.value,
        mail: usernameMail.value,
        pass: usernamePassword.value 
        
    }

    console.log(userData);

    fetch(restHost + '/users/register_user', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)

    })
    .then(response => {

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`)

        }

        return response.json();

    })
    .then(data => {

        if (data.success) {

            // Mostrar modal
            modal.classList.remove('hidden');

            // Acción del botón "Back to login"
            document.getElementById('backToLoginBtn').addEventListener('click', () => {
                window.open('/html/login.html', '_self'); // Cambia la URL según tu ruta de inicio de sesión
            });

        } else {

            console.error("Error al registrar el usuario:", error);

        }

    })
    .catch(error => {

        console.error("Error al procesar la solicitud:", error);

    })
    .finally(() => {

        loginButton.disabled = false;
        loginButton.textContent = 'Sign Up';

    })

    usernameInput.value = '';
    usernameMail.value = '';
    usernamePassword.value = '';

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
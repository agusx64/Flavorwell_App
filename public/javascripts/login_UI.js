var loginButton = document.getElementById('loginButton');
var usernameEmail = document.getElementById('username_email');
var usernamePassword = document.getElementById('username_password');
const modal = document.getElementById('successModal');

var restHost = 'http://localhost:3000'

loginButton.addEventListener('click', function(event) {

    event.preventDefault();
    loginButton.textContent = 'Iniciando sesión...'
    loginButton.disabled = true;

    const userData = {

        email: usernameEmail.value,
        password: usernamePassword.value

    };

    fetch(restHost + '/users/login_user', {

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

            localStorage.setItem('token', data.token);
            window.open('/html/user_dashboard.html', '_self');

        } else {

            console.error("Error al cargar dashboard principal", error);
            modal.classList.remove('hidden');
            document.getElementById('tryAgain').addEventListener('click', () => {

                modal.classList.add('hidden');

            });

        }

    })
    .catch(error => {

        console.error("Error al procesar la solicitud:", error);
        modal.classList.remove('hidden');
        document.getElementById('tryAgain').addEventListener('click', () => {

            modal.classList.add('hidden');

        });

    })
    .finally(() => {

        loginButton.disabled = false;
        loginButton.textContent = 'Log In';

    })

    usernameEmail.value = '';
    usernamePassword.value = '';

});



// Función para verificar los campos y habilitar/deshabilitar el botón
function checkInputs() {

    if (usernameEmail.value.trim() !== '' && usernamePassword.value.trim() !== '') {

        loginButton.disabled = false;

    } else {

        loginButton.disabled = true;

    }

}

// Añadir evento de escucha a los campos de entrada
usernameEmail.addEventListener('input', checkInputs);
usernamePassword.addEventListener('input', checkInputs);
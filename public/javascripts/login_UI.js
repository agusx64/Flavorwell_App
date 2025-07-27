var loginButton = document.getElementById('loginButton');
var usernameEmail = document.getElementById('username_email');
var usernamePassword = document.getElementById('username_password');

// Variables de modal de error
const modal = document.getElementById('errorModal');
const imgErrorModal = document.getElementById('img-context');
const textErrorModal = document.getElementById('text-context');
const tryAgainButton = document.getElementById('tryAgain');

var restHost = 'http://192.168.164.102:3000'

loginButton.addEventListener('click', function(event) {

    event.preventDefault();
    loginButton.textContent = 'Logging in...'
    loginButton.disabled = true;

    // Validar formato de correo electronico
    if(!validateEmailFormat()){
        return;
    }

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
    .then(async response => {

        const data = await response.json();

        if (!response.ok) {

            imgErrorModal.src = '/images/_UI_img/error.webp';
            textErrorModal.textContent = `${data.message}`;

            errorModal.classList.remove('hidden');
            tryAgainButton.addEventListener('click', () => {

                errorModal.classList.add('hidden');

            });

            loginButton.disabled = false;
            loginButton.textContent = 'Update password';

        }

        return data;

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

function validateEmailFormat() {

    // Redeclaracion de input email
    const email = usernameEmail.value.trim();

    // Expresión regular para formato de email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        imgErrorModal.src = '/images/_UI_img/error.webp';
        textErrorModal.textContent = 'Please enter a valid email address';

        errorModal.classList.remove('hidden');
        tryAgainButton.addEventListener('click', () => {

            errorModal.classList.add('hidden');

        });

        loginButton.disabled = false;
        loginButton.textContent = 'Update password';

        // Valor logico
        return false;

    } else {

        // Valor logico
        return true;

    }

}

// Añadir evento de escucha a los campos de entrada
usernameEmail.addEventListener('input', checkInputs);
usernamePassword.addEventListener('input', checkInputs);
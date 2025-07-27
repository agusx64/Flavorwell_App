var signupButton = document.getElementById('signupButton');
var usernameInput = document.getElementById('input_username');
var usernameMail = document.getElementById('input_mail');
var usernamePassword = document.getElementById('input_password');
const modal = document.getElementById('successModal');
const passwordWarning = document.getElementById('passwordWarning');

// Variables de modal de error
const errorModal = document.getElementById('errorModal');
const imgErrorModal = document.getElementById('img-context');
const textErrorModal = document.getElementById('text-context');
const tryAgainButton = document.getElementById('tryAgain');

var restHost = 'http://192.168.164.102:3000'

signupButton.addEventListener('click', function(event) {

    event.preventDefault();
    signupButton.textContent = 'Loading...';
    signupButton.disabled = true;

    // Verificacion de formato de correo electronico correcto
    if(!validateEmailFormat()){
        return;
    }

    const userData = {

        username: usernameInput.value,
        mail: usernameMail.value,
        pass: usernamePassword.value 
        
    }

    fetch(restHost + '/users/register_user', {

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

            signupButton.disabled = false;
            signupButton.textContent = 'Sign Up';

        }

        return data;

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

        signupButton.disabled = false;
        signupButton.textContent = 'Sign Up';

    })

    usernameInput.value = '';
    usernameMail.value = '';
    usernamePassword.value = '';

});

// Función para verificar los campos y habilitar/deshabilitar el botón
function checkInputs() {

    if (usernameInput.value.trim() !== '' && usernamePassword.value.trim() !== '' && usernameMail.value.trim() !== '') {

        signupButton.disabled = false;

    } else {

        signupButton.disabled = true;

    }

}

function validateEmailFormat() {

    // Redeclaracion de input email
    const email = usernameMail.value.trim();

    // Expresión regular para formato de email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        textErrorModal.textContent = 'Please enter a email valid address';
        imgErrorModal.src = '/images/_UI_img/error.webp';

        errorModal.classList.remove('hidden');
        document.getElementById('tryAgain').addEventListener('click', () => {
            errorModal.classList.add('hidden');
        });

        signupButton.disabled = false;
        signupButton.textContent = 'Sign Up';

        // Valor logico
        return false;

    } else {

        return true;

    }

}

function validatePasswordStrength(password) {

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isStrong = password.length >= 8 && hasSpecialChar;

    if (password.length === 0) {

        passwordWarning.className = 'password-warning';
        passwordWarning.innerHTML = `<i class="bi bi-info-circle-fill"></i> Type your password`;
        passwordWarning.classList.add('password-warning', 'grey');
        return;

    }

    if (password.length < 8) {

        passwordWarning.innerHTML = `<i class="bi bi-x-circle-fill"></i> Password is too weak`;
        passwordWarning.className = 'password-warning red';

    } else if (!hasSpecialChar) {

        passwordWarning.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Add at least one special character`;
        passwordWarning.className = 'password-warning yellow';

    } else {

        passwordWarning.innerHTML = `<i class="bi bi-check-circle-fill"></i> Strong password`;
        passwordWarning.className = 'password-warning green';
        signupButton.disabled = false;

    }

}

//Funciones de prevencion de errores de entrada

usernamePassword.addEventListener('input', () => {
    validatePasswordStrength(usernamePassword.value);
    checkInputs();
});

usernameInput.addEventListener('input', checkInputs);
usernamePassword.addEventListener('input', checkInputs);
usernameMail.addEventListener('input', checkInputs);
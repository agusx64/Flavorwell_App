const inputs = document.querySelectorAll('.input-code');

// Inputs de la entrada de contraseña
const usernameEmail = document.getElementById('input_email');
const usernameNewPassword = document.getElementById('input_password');

const passwordWarning = document.getElementById('passwordWarning');
const restorePasswordButton = document.getElementById('restore_password_button');

// Inputs de codigo de seguridad
const inputCodeNumber1 = document.getElementById('input_code_1');
const inputCodeNumber2 = document.getElementById('input_code_2');
const inputCodeNumber3 = document.getElementById('input_code_3');
const inputCodeNumber4 = document.getElementById('input_code_4');

// Modal contextual
const modal = document.getElementById('successModal');

// Direccion del Back-End
var restHost = 'http://localhost:3000'

restorePasswordButton.disabled = true;

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
        restorePasswordButton.disabled = false;

    }

}

// Función para verificar los campos y habilitar/deshabilitar el botón
function checkInputs() {

    if (usernameEmail.value.trim() !== '' && 
        usernameNewPassword.value.trim() !== '' && 
        inputCodeNumber1.value.trim() !== '' && 
        inputCodeNumber2.value.trim() !== '' &&
        inputCodeNumber3.value.trim() !== '' &&
        inputCodeNumber4.value.trim() !== '') {

        restorePasswordButton.disabled = false;

    } else {

        restorePasswordButton.disabled = true;

    }

}

// Rellenado automatico de inputs de codigo de verificacion
inputs.forEach((input, index) => {

    input.addEventListener('input', (e) => {

        // Asegura que solo un número (0-9) se quede
        let value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value.slice(0, 1);
        
        // Si se ingresó un número, pasa al siguiente input
        if (value && index < inputs.length - 1) {

            inputs[index + 1].focus();

        }

    });
    
    input.addEventListener('keydown', (e) => {

        // Si presiona Backspace y está vacío, va al anterior input
        if (e.key === 'Backspace' && !input.value && index > 0) {

            inputs[index - 1].focus();

        }

    });

});

// Fetch de envio de datos al servidor
restorePasswordButton.addEventListener('click', function(event){

    event.preventDefault();
    restorePasswordButton.textContent = 'Reestableciendo contraseña...'
    restorePasswordButton.disabled = true;

    let securityCode = `${inputCodeNumber1.value}${inputCodeNumber2.value}${inputCodeNumber3.value}${inputCodeNumber4.value}`

    const userData = {

        email: usernameEmail.value,
        newPassword: usernameNewPassword.value,
        securityCode: securityCode

    };

    fetch(restHost + '/users/set_new_password', {

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
            document.getElementById('backToLogin').addEventListener('click', () => {

                window.open('/html/login.html', '_self');

            });

        } else {

            console.error("Error al cargar dashboard principal", error);

        }

    })
    .catch(error => {

        console.error("Error al procesar la solicitud:", error);

    })
    .finally(() => {

        restorePasswordButton.disabled = false;
        restorePasswordButton.textContent = 'Send email';

    })

    usernameEmail.value = '';
    usernameNewPassword.value = '';
    inputCodeNumber1.value = '';
    inputCodeNumber2.value = '';
    inputCodeNumber3.value = '';
    inputCodeNumber4.value = '';

})

//Funciones de prevencion de errores de entrada
usernameNewPassword.addEventListener('input', () => {

    validatePasswordStrength(usernameNewPassword.value);
    checkInputs();

});

// Comprobacion de entradas en inputs
usernameEmail.addEventListener('input', checkInputs);
usernameNewPassword.addEventListener('input', checkInputs);

inputCodeNumber1.addEventListener('input', checkInputs);
inputCodeNumber2.addEventListener('input', checkInputs);
inputCodeNumber3.addEventListener('input', checkInputs);
inputCodeNumber4.addEventListener('input', checkInputs);
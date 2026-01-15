const recoverButton = document.getElementById('recover_password_button');
const recoverInput = document.getElementById('input_recover_password');
const modal = document.getElementById('successModal');

// // Variables de modal de error
const errorModal = document.getElementById('errorModal');
const imgErrorModal = document.getElementById('img-context');
const textErrorModal = document.getElementById('text-context');
const tryAgainButton = document.getElementById('tryAgain');
import CONFIG from "./config.js";

let lang = localStorage.getItem('preferred_lang');

if (window.Capacitor && window.Capacitor.Plugins?.Keyboard) {

    window.Capacitor.Plugins.Keyboard.setScroll({ isDisabled: false });

}

recoverButton.addEventListener('click', function(event) {

    event.preventDefault();

    switch (lang) {

        case 'en':
            recoverButton.textContent = 'Sending email...'
            break;

        case 'es':
            recoverButton.textContent = 'Enviando correo electrónico...'
            break;

    }

    recoverButton.disabled = true;

    // Validacion de formato de correo electronico
    if(!validateEmailFormat()){
        return;
    }

    const userData = {

        recoverInfo: recoverInput.value,

    };

    fetch(CONFIG.API_BASE_URL + `/users/request_password_reset?lang=${lang}`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)

    })
    .then(async response => {

        const data = await response.json();

        if(!response.ok){

            imgErrorModal.src = '/images/_UI_img/error.webp';
            textErrorModal.textContent = `${data.message}`;

            errorModal.classList.remove('hidden');
            tryAgainButton.addEventListener('click', () => {

                errorModal.classList.add('hidden');

            });

            recoverButton.disabled = false;

            switch (lang) {

                case 'en':
                    recoverButton.textContent = 'Send email';
                    break;

                case 'es':
                    recoverButton.textContent = 'Enviar correo electrónico';
                    break;

            }

        }

        return data;

    })
    .then(data => {

        if (data.success) {

            // Mostrar modal
            modal.classList.remove('hidden');
            document.getElementById('GoToResetPassword').addEventListener('click', () => {

                window.open('/html/restore_password.html', '_self');

            });

        } else {

            console.error("Error al enviar el correo de recuperacion", error);

        }

    })
    .catch(error => {

        console.error("Error al procesar la solicitud:", error);

    })
    .finally(() => {

        recoverButton.disabled = false;
        switch (lang) {

            case 'en':
                recoverButton.textContent = 'Send email';
                break;

            case 'es':
                recoverButton.textContent = 'Enviar correo electrónico';
                break;

        };

    })

    recoverInput.value = '';

});

// Función para verificar los campos y habilitar/deshabilitar el botón
function checkInputs() {

    if (recoverInput.value.trim() !== '') {

        recoverButton.disabled = false;

    } else {

        recoverButton.disabled = true;

    }

}

function validateEmailFormat() {

    // Redeclaracion de input email
    const email = recoverInput.value.trim();

    // Expresión regular para formato de email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        imgErrorModal.src = '/images/_UI_img/error.webp';

        switch (lang) {

            case 'en':
                textErrorModal.textContent = 'Please enter a email valid address';
                break;

            case 'es':
                textErrorModal.textContent = 'Por favor ingresa un correo electrónico valido';
                break;

        }

        errorModal.classList.remove('hidden');
        document.getElementById('tryAgain').addEventListener('click', () => {
            errorModal.classList.add('hidden');
        });

        recoverButton.disabled = false;
        
        switch (lang) {

            case 'en':
                recoverButton.textContent = 'Send email';
                break;

            case 'es':
                recoverButton.textContent = 'Enviar correo electrónico';
                break;

        };

        return false;

    } else {

        return true;

    }

}

recoverInput.addEventListener('input', checkInputs);
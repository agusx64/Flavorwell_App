const recoverButton = document.getElementById('recover_password_button');
const recoverInput = document.getElementById('input_recover_password');
const modal = document.getElementById('successModal');

// // Variables de modal de error
const errorModal = document.getElementById('errorModal');
const imgErrorModal = document.getElementById('img-context');
const textErrorModal = document.getElementById('text-context');
const tryAgainButton = document.getElementById('tryAgain');

var restHost = 'http://192.168.164.102:3000'

recoverButton.addEventListener('click', function(event) {

    event.preventDefault();
    recoverButton.textContent = 'Sending email...'
    recoverButton.disabled = true;

    // Validacion de formato de correo electronico
    if(!validateEmailFormat()){
        return;
    }

    const userData = {

        recoverInfo: recoverInput.value,

    };

    fetch(restHost + '/users/request_password_reset', {

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
            recoverButton.textContent = 'Send email';

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
        recoverButton.textContent = 'Send email';

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
        textErrorModal.textContent = 'Please enter a email valid address';

        errorModal.classList.remove('hidden');
        document.getElementById('tryAgain').addEventListener('click', () => {
            errorModal.classList.add('hidden');
        });

        recoverButton.disabled = false;
        recoverButton.textContent = 'Send Email';

        // Valor logico
        return false;

    } else {

        return true;

    }

}

recoverInput.addEventListener('input', checkInputs);
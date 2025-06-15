const recoverButton = document.getElementById('recover_password_button');
const recoverInput = document.getElementById('input_recover_password');
const modal = document.getElementById('successModal');

var restHost = 'http://localhost:3000'

recoverButton.addEventListener('click', function(event) {

    event.preventDefault();
    recoverButton.textContent = 'Enviando correo...'
    recoverButton.disabled = true;

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
            document.getElementById('GoToResetPassword').addEventListener('click', () => {

                window.open('/html/restore_password.html', '_self');

            });

        } else {

            console.error("Error al cargar dashboard principal", error);

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

recoverInput.addEventListener('input', checkInputs);
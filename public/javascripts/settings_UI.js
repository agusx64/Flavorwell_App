document.addEventListener('DOMContentLoaded', async function() {

    const token = localStorage.getItem('token');
    const restHost = 'http://localhost:3000';
    const paypalLink = 'https://www.paypal.com/donate/?hosted_button_id=PDZDH957EZBEG';
    const myProfileButton = document.getElementById('my-profile-button');
    const logOutButton = document.getElementById('log-out-button');
    const donateButton = document.getElementById('donate-button');
    const confirmationModal = document.getElementById('confirmationModal');
    const aproveButtonLogOut = document.getElementById('aprove-log-out');
    const declineButtonLogOut = document.getElementById('decline-log-out');

    // Funcion para obtener nombre y foto de perfil
    async function getUserInfo() {

        try {

            const res = await fetch(restHost + '/users/api/user_profile', {

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })

            const data = await res.json();
            const id = data.id;
            if (!data.success) return;

            // Seteo de nombre de usuario
            const headerText = document.querySelector('.user-settings-username');
            headerText.textContent = data.name;

            // Seteo de foto de perfil
            const profileHeader = document.querySelector('.user-settings-img-container');
            // Uso de función LAMDA
            profileHeader.innerHTML = data.profile_img
                // Si existe una foto de perfilinsertan este componente
                ? `<img src="${data.profile_img}" alt="User profile" class="img-header-user">`
                // Si no existe insertan este componente
                : `<i class="bi bi-person-circle user-settings-icon-header"></i>`;

            myProfileButton.addEventListener('click', function() {

                window.location.href = `/html/public_profile_viewer.html?id=${data.id}`;

            });

        } catch (error) {

            console.error('Error loading user profile.', error)

        }

    }

    getUserInfo();
    
    logOutButton.addEventListener('click', function() {

        confirmationModal.classList.remove('hidden');

    });

    donateButton.addEventListener('click', function() {

        window.open(paypalLink, '_blank');

    });

    aproveButtonLogOut.addEventListener('click', function() {

        localStorage.removeItem('token');
        window.location.href = '/html/login.html';

    });

    declineButtonLogOut.addEventListener('click', function() {

        confirmationModal.classList.add('hidden');

    });

});
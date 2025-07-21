const userProfileImgHeader = document.getElementById('svg-icon-profile');
const userProfileImg = document.getElementById('user-profile-img');
const userProfileName = document.getElementById('user-profile-name');
const userProfileEmail = document.getElementById('user-profile-email');
const userProfile = document.getElementById('user-profile-email');

const savedRecipesButton = document.getElementById('user-profile-saved-recipes');
const myRecipesButton = document.getElementById('user-profile-my-recipes');
const myPublicProfileButton = document.getElementById('user-profile-me');
const logOutButton = document.getElementById('user-profile-log-out');

const modalConfirmation = document.getElementById('confirmationModal');
const aproveButton = document.getElementById('aprove');
const declineButton = document.getElementById('decline');

const token = localStorage.getItem('token');
const restHost = 'http://localhost:3000';

async function getUserInfo(userToken) {

    try {

        await fetch(restHost + '/users/api/user_profile', {

            headers: {
                'Authorization': `Bearer ${userToken}`
            },

        })
        .then( async response => {

            const data = await response.json();

            if (!response.ok) {


            }

            return data;

        })
        .then(data => {

            if (data.success) {
                
                userProfileImg.src = data.profile_img
                    ? data.profile_img
                    : '/images/_UI_img/default.png';
                userProfileName.textContent = data.name;
                userProfileEmail.textContent = data.email;

                // Uso de función LAMDA
                userProfileImgHeader.innerHTML = data.profile_img
                    // Si existe una foto de perfilinsertan este componente
                    ? `<img src="${data.profile_img}" alt="User profile" class="user-img-header">`
                    // Si no existe insertan este componente
                    : `<i class="bi bi-person-circle"></i>`;

            } else {

                console.error('Error al obtener información del usuario.', Error);

            }

        })
        .catch(error => {

            console.error('Error al procesar la solicitud', error);

        })

    } catch(error) {

        console.error(error);

    }

};

function logOut() {

    localStorage.removeItem('token');
    window.location.href = '/html/login.html';

}

getUserInfo(token);

savedRecipesButton.addEventListener('click', function() {

    window.location.href = '/html/saved.html';

});

myRecipesButton.addEventListener('click', function() {

    window.location.href = '/html/user_recipes.html';

});

myPublicProfileButton.addEventListener('click', function() {

    window.location.href = '/html/public_profile.html';

});

logOutButton.addEventListener('click', function() {

    modalConfirmation.classList.remove('hidden');

});

aproveButton.addEventListener('click', function() {

    logOut();

});

declineButton.addEventListener('click', function() {

    modalConfirmation.classList.add('hidden');

});
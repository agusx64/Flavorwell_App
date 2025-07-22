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

const editButton = document.getElementById('user-profile-edit');
const editModal = document.getElementById('edit-profile-modal');
const saveButton = document.getElementById('save-profile-changes');
const cancelEdit = document.getElementById('cancel-edit');
const modalmessage = document.querySelector('.message-validation-container');

const inputUsername = document.getElementById('edit-username');
const inputEmail = document.getElementById('edit-email');
const inputProfileImg = document.getElementById('edit-profile-img');
const inputCoverImg = document.getElementById('edit-cover-img');
const label = document.querySelector('.custom-file-upload');
const labelCover = document.querySelector('.cover-upload');

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

            if (!response.ok) return;

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

let originalData = {};

editButton.addEventListener('click', async () => {
    const response = await fetch(restHost + '/users/api/user_profile', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    if (!data.success) return;

    inputUsername.value = data.name;
    inputEmail.value = data.email;

    originalData = {
        username: data.name,
        email: data.email
    };

    editModal.classList.remove('hidden');
    saveButton.classList.add('disabled');
    saveButton.disabled = true;
});

// Detectar cambios
[inputUsername, inputEmail, inputProfileImg, inputCoverImg].forEach(input => {
    input.addEventListener('input', () => {
        const changesMade = (
            inputUsername.value !== originalData.username ||
            inputEmail.value !== originalData.email ||
            inputProfileImg.files.length > 0 ||
            inputCoverImg.files.length > 0
        );

        saveButton.disabled = !changesMade;
        saveButton.classList.toggle('disabled', !changesMade);
    });
});

// Cancelar edición
cancelEdit.addEventListener('click', () => {
    editModal.classList.add('hidden');
});

// Guardar cambios
saveButton.addEventListener('click', async (event) => {

    event.preventDefault();
    saveButton.textContent = 'loading...';
    saveButton.disabled = true;
    saveButton.classList.add('disabled');

    const formData = new FormData();
    formData.append('username', inputUsername.value);
    formData.append('email', inputEmail.value);

    if (inputProfileImg.files.length > 0) {
        formData.append('profile_img', inputProfileImg.files[0]);
    }

    if (inputCoverImg.files.length > 0) {
        formData.append('cover_img', inputCoverImg.files[0]);
    }

    try {

        await fetch(restHost + '/users/api/update_profile', {

            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData

        })
        .then(async response => {

            const data = await response.json();

            if (!response.ok){

                saveButton.textContent = 'Save changes';
                saveButton.disabled = false;
                saveButton.classList.remove('disabled');

            }

            return data;

        })
        .then(data => {

            if (data.success) {

                const pNote = document.createElement('p');
                pNote.classList.add('change-notification');
                pNote.innerHTML = `
                
                    <i class="bi bi-info-circle-fill notification-icon"></i>${data.message}
                
                `;

                modalmessage.appendChild(pNote);

            } else {

                console.error('Error al realizar cambios', error);

            }
        })
        .catch(error => {

            console.error('Error al procesar la solicitud', error);

        })
        .finally(() => {

            saveButton.disabled = false;
            saveButton.textContent = 'Save changes'
            saveButton.classList.remove('disabled');
            editModal.classList.add('hidden');
            
        })

    } catch(error) {

        console.error(error);

    }

});

inputProfileImg.addEventListener('change', function () {

    if (inputProfileImg.files && inputProfileImg.files[0]) {

        label.classList.add('uploaded');

    } else {

        label.classList.remove('uploaded');

    }

});

inputCoverImg.addEventListener('change', function() {

    if (inputCoverImg.files && inputCoverImg.files[0]) {

        labelCover.classList.add('uploaded');

    } else {

        labelCover.classList.remove('uploaded');

    }

});

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
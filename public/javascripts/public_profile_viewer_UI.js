document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('token');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const restHost = 'http://localhost:3000';

    const userImgCover = document.getElementById('public-profile-viewer-img-cover');
    const userImgProfile = document.getElementById('public-profile-viewer-img-user');
    const userName = document.getElementById('public-profile-viewer-username');
    const userEmail = document.getElementById('public-profile-viewer-email');
    const userIncomeDate = document.getElementById('public-profile-viewer-income-date');
    const userUploadedRecipes = document.getElementById('public-profile-viewer-uploaded-recipes');
    const userSavedRecipes = document.getElementById('public-profile-viewer-saved-recipes');

    if (!id) {

        console.error('Missing ID in URL.');
        return;

    }

    try {

        await fetch(restHost + '/users/get_user_by_id', {

            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: id })

        })
        .then(async response => {

            const data = await response.json();

            if (!response.ok) {

                console.error(data);
                return;

            }

            return data;

        })
        .then(data => {

            if (data.success){


            }
            console.log(data);

            userImgCover.src = data.user.img_cover_path;
            userImgProfile.src = data.user.img_profile_path;
            userName.textContent = data.user.username;
            userEmail.textContent = data.user.email;
            userIncomeDate.textContent = new Date(data.user.created_at).toLocaleDateString();
            userUploadedRecipes.textContent = data.total_recipes;
            userSavedRecipes.textContent = data.total_saved;


        })
        .catch(error => {

            console.error(error);

        })

    } catch (err) {

        console.error(err);

    }

});
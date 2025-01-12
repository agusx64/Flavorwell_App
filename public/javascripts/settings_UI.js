document.addEventListener('DOMContentLoaded', function() {

    fetch('/username_information')

    .then(response => response.json())
    .then(data => {

        let usernameInfo = data;

        const profileImg = document.getElementById('img_profile');
        const profileName = document.getElementById('name');
        const profileEmail = document.getElementById('email');

        profileImg.src = usernameInfo[0].img_profile_path;
        profileName.textContent = usernameInfo[0].username;
        profileEmail.textContent = usernameInfo[0].email;

    });
    
});
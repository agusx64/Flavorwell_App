document.addEventListener('DOMContentLoaded', function() {

    let update_button  = document.getElementById('update_image');
    let profile_picture = document.getElementById('formFile');

    fetch('/username_information')

    .then(response => response.json())
    .then(data => {

        console.log(data);

        let username = document.getElementById('name');
        let email = document.getElementById('email');
        let date = document.getElementById('date');
        let img = document.getElementById('img_profile');

        username.textContent = data[0].username;
        email.textContent = data[0].email;
        date.textContent = data[0].created_at;
        img.src = data[0].img_profile_path;

    })

    update_button.addEventListener('click', () => {

        let imageObject = new FormData();

        imageObject.append('image', profile_picture.files[0]);

        fetch('/update_profile', {

            method: 'POST',
            body: imageObject

        })
        .then(response => {
            if (!response.ok) {

                console.log(`HTTP error! status: ${response.status}`);

            }
            return response.json();

        })
        .then(data => {

            console.log("Respuesta del servidor:", data);

        })
        .catch(error => {

            console.log("Error al procesar la solicitud:", error);

        });

        window.location.href = '/start'

    });

});
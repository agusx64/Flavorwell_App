document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = urlParams.get('data');

    const likeButton = document.getElementById('like_button');
    const dislikeButton = document.getElementById('dislike_button');

    likeButton.addEventListener('click', () => {

        likeButton.style.fill = 'var(--ChiliRed)'

    });

    dislikeButton.addEventListener('click', () => {

        dislikeButton.style.fill = 'var(--ChiliRed)'

    });

    if (data) {

        try {

            const parsedData = JSON.parse(decodeURIComponent(data));
            console.log('Recipe data:', parsedData);

        } catch (error) {

            console.error('Error parsing recipe data:', error);

        }

    } else {

        console.error('No data found in URL');
        
    }
});



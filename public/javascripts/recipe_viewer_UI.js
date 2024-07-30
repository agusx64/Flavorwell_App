document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = urlParams.get('data');

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



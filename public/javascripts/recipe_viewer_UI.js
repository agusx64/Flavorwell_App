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

            let name_recipe = document.getElementById('head_text');
            let img_src = document.getElementById('img_recipe_viewer');
            let description_recipe = document.getElementById('description_text_p');
            let textIngredients = document.getElementById('text_ingredients');
            let textTime = document.getElementById('text_time');
            let textEnergy = document.getElementById('text_energy');
            let textAuthor = document.getElementById('recipe_author');
            let recipeInstructions = document.getElementById('recipe_instructions');

            name_recipe.textContent = parsedData[0].name;
            img_src.src = parsedData[0].img_path;
            description_recipe.textContent = parsedData[0].description;
            textTime.textContent = parsedData[0].time_make;
            textEnergy.textContent = parsedData[0].energy;
            textIngredients.textContent = parsedData[0].id;
            textAuthor.textContent = parsedData[0].author;

            let textInstructions = parsedData[0].instruction;
            let textInstructionsFormatted = textInstructions.replace(/\r\n/g, ' <br> ');
            recipeInstructions.innerHTML = textInstructionsFormatted;



        } catch (error) {

            console.error('Error parsing recipe data:', error);

        }

    } else {

        console.error('No data found in URL');
        
    }
});
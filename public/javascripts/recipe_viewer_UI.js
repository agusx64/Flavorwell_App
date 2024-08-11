document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = urlParams.get('data');

    let veganIngredient = document.getElementById('vegan_ingredient');
    let proteinIngredient = document.getElementById('protein_ingredient');
    let garrisonIngredient = document.getElementById('garrison_ingredient');
    let extraIngredient = document.getElementById('extra_ingredient');

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
            let veganIngredient = document.getElementById('vegan_ingredient');
            let proteinIngredient = document.getElementById('protein_ingredient');
            let garrisonIngredient = document.getElementById('garrison_ingredient');
            let extraIngredient = document.getElementById('extra_ingredient');

            name_recipe.textContent = parsedData[0].name;
            img_src.src = parsedData[0].img_path;
            description_recipe.textContent = parsedData[0].description;
            textTime.textContent = parsedData[0].time_make;
            textEnergy.textContent = parsedData[0].energy;
            textIngredients.textContent = parsedData[0].id;
            textAuthor.textContent = parsedData[0].author;
            veganIngredient.textContent = parsedData[0].vegan_ingredient;
            proteinIngredient.textContent = parsedData[0].protein_ingredient;
            garrisonIngredient.textContent = parsedData[0].garrison_ingredient;
            extraIngredient.textContent = parsedData[0].extra_ingredient;

            let textInstructions = parsedData[0].instruction;
            let textInstructionsFormatted = textInstructions.replace(/\r\n/g, ' <br> ');
            recipeInstructions.innerHTML = textInstructionsFormatted;



        } catch (error) {

            console.error('Error parsing recipe data:', error);

        }

    } else {

        console.error('No data found in URL');
        
    }

    let IngredientsJSON = {
        "vegan_ingredient": veganIngredient.textContent,
        "protein_ingredient": proteinIngredient.textContent,
        "garrison_ingredient": garrisonIngredient.textContent,
        "extra_ingredient": extraIngredient.textContent
    };
    
    // Realiza la solicitud POST al servidor.
    fetch('/ingredient_list', {

        method: 'POST',
        headers: {

            'content-type': 'application/json',

        },

        body: JSON.stringify(IngredientsJSON)

    })
    .then(response => {

        if (!response.ok) {

            throw new Error('Network response was not ok');

        }
        return response.json();
    })
    .then(data => {

        console.log('Response from server:', data);
    
        // Supongamos que la respuesta tiene un campo `image_src` para cada ingrediente.
        document.getElementById('vegan').src = data[0].src_reference;
        document.getElementById('protein').src = data[1].src_reference;
        document.getElementById('garrison').src = data[2].src_reference;
        document.getElementById('extra').src = data[3].src_reference;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

});

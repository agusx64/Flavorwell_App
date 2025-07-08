document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const table = urlParams.get('table');
    const restHost = 'http://localhost:3000';

    if (!id || !table) {
        console.error('Missing ID or Table in URL.');
        return;
    }

    fetch(restHost + '/dashboard/get_recipe_by_id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), table })
    })
    .then(response => response.json())
    .then(parsedData => {
        console.log('Recipe data:', parsedData);

        if (!parsedData.success || !parsedData.data) {
            
            throw new Error(parsedData.message || 'No recipe data received');

        }

        let data = parsedData.data;

        // Elementos del DOM
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

        // Asignar contenido
        name_recipe.textContent = data.name;
        img_src.src = data.img_path;
        description_recipe.textContent = data.description;
        textTime.textContent = data.time_make;
        textEnergy.textContent = data.energy;
        textIngredients.textContent = data.id;
        textAuthor.textContent = data.author;
        veganIngredient.textContent = data.vegan_ingredient;
        proteinIngredient.textContent = data.protein_ingredient;
        garrisonIngredient.textContent = data.garrison_ingredient;
        extraIngredient.textContent = data.extra_ingredient;

        let textInstructions = data.instruction || '';
        let textInstructionsFormatted = textInstructions.replace(/\r\n/g, ' <br> ');
        recipeInstructions.innerHTML = textInstructionsFormatted;

        // Enviar ingredientes al servidor para obtener imágenes
        const IngredientsJSON = {
            "vegan_ingredient": veganIngredient.textContent,
            "protein_ingredient": proteinIngredient.textContent,
            "garrison_ingredient": garrisonIngredient.textContent,
            "extra_ingredient": extraIngredient.textContent
        };

        return fetch(restHost + '/ingredient_list', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(IngredientsJSON)
        });
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        console.log('Response from server:', data);

        if (!Array.isArray(data) || data.length < 4) {
            throw new Error('Incomplete ingredient images from server');
        }

        document.getElementById('vegan').src = data[0].src_reference;
        document.getElementById('protein').src = data[1].src_reference;
        document.getElementById('garrison').src = data[2].src_reference;
        document.getElementById('extra').src = data[3].src_reference;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});


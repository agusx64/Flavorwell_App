document.addEventListener('DOMContentLoaded',async () => {

    // Elementos para la inserción de información de receta
    const recipeTitle = document.getElementById('recipe-viewer-title');
    const recipeAuthor = document.getElementById('recipe-viewer-author');
    const recipeImage = document.getElementById('recipe-viewer-image');
    const recipeDescription = document.getElementById('recipe-viewer-description');
    const recipeDate = document.getElementById('recipe-viewer-details-date');
    const recipeCategory = document.getElementById('recipe-viewer-details-category');
    const recipeItems = document.getElementById('recipe-viewer-details-items');
    const recipeCopyright = document.getElementById('recipe-viewer-copyright-text');
    const recipeAuthorContainer = document.getElementById('recipe-viewer-status-img');
    const recipeLikedCounter = document.getElementById('recipe-viewer-status-counter-like');
    const recipeSavedCounter = document.getElementById('recipe-viewer-status-counter-saved');

    const token = localStorage.getItem('token');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const table = urlParams.get('table');
    const restHost = 'http://localhost:3000';

    if (!id || !table) {
        console.error('Missing ID or Table in URL.');
        return;
    }

    await fetch(restHost + '/users/get_recipe_by_id', {

        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: id, table })

    })
    .then(async response => {

        const data = await response.json();

        if (!response.ok) {


        }

        return data;

    })
    .then(data => {

        console.log('Recipe data:', data);
        recipeTitle.textContent = data.data.name;
        recipeAuthor.textContent = data.author[0].username;
        recipeImage.src = data.data.img_path;
        recipeDescription.textContent = data.data.description;
        recipeDate.textContent =  new Date(data.data.created_at).toLocaleDateString();
        recipeCategory.textContent = table.charAt(0).toUpperCase() + table.slice(1);
        recipeItems.textContent = data.data.items;
        recipeCopyright.textContent = `© ${new Date().getFullYear()} Flavorwell. All rights reserved to Flavorwell Team and ${data.author[0].username}.`;
        recipeLikedCounter.textContent = data.likeCount[0].total || '0'; 
        recipeSavedCounter.textContent = data.savedCount[0].total || '0';
        let ingredients = data.ingredients || [];
        const instructionsArray = JSON.parse(data.data.instruction);

        recipeAuthorContainer.innerHTML = data.author[0].img_profile_path
            // Si existe una foto de perfilinsertan este componente
            ? `<img src="${data.author[0].img_profile_path}" alt="image_of_author" class="recipe-viewer-status-img">
                <p class="recipe-viewer-status-author">${data.author[0].username}</p>`
            // Si no existe insertan este componente
            : `<i class="bi bi-person-circle svg_profile"></i>
                <p class="recipe-viewer-status-author">${data.author[0].username}</p>`;

        // Agregar ingredientes de receta dinamicamente
        const ingredientsContainer = document.querySelector('.recipe-viewer-ingredients-list-container');
        ingredientsContainer.innerHTML = ''; // Limpiar contenido existente

        ingredients.forEach(ing => {
            const item = document.createElement('div');
            item.className = 'recipe-viewer-ingredients-item';

            item.innerHTML = `
                <div class="recipe-viewer-ingredients-img-container">
                    <img class="recipe-viewer-ingredients-img" src="${ing.src_reference || '/images/default.png'}" alt="${ing.ingredient_name}">
                </div>
                <p class="recipe-viewer-ingredients-name">${ing.ingredient_name}</p>
            `;

            ingredientsContainer.appendChild(item);
        });

        // Agregar instrucciones de receta dinamicamente
        const instructionsContainer = document.querySelector('.recipe-viewer-instructions-container ul');
        instructionsContainer.innerHTML = '';

        instructionsArray.forEach(instruction => {

            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsContainer.appendChild(li);

        });

    })
    .catch(error => {
        
        console.error(error);

    })

});


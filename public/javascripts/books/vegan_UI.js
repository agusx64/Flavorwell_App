const recipeContainer = document.querySelector('.recipe-container');

// Host backend
const restHost = 'http://localhost:3000';

async function getVeganList() {

    await fetch(restHost + '/category/vegan/list')
    .then(response => response.json())
    .then(data => {

        if (Array.isArray(data) && data.length > 0){

            const recipes = data;

            if (Array.isArray(recipes)) {

                recipes.forEach(recipe => {

                    const card = document.createElement('div');
                    card.classList.add('recipe-card');
                    card.innerHTML = `
                    <img src="${recipe.image_url}" alt="${recipe.name}" class="recipe-card-img" data-id="${recipe.id}" data-category="${recipe.category}">
                    <p class="recipe-card-author">
                        <span class="recipe-tempalte-text">Author: </span>
                        <span class="recipe-template-name">${recipe.author || 'Unknown'}</span>
                    </p>
                    <h2 class="recipe-card-text">
                        <span class="recipe-card-text-name">${recipe.name}</span>
                    </h2>`;

                    recipeContainer.appendChild(card);

                });

            } else {

                console.error('Incorrect format')
                return;

            }
        } else {

            recipeContainer.innerHTML = '<p class="empty-message">No saved recipes yet.</p>';
            return;

        }

    })
    .catch(error => {

        console.error('Internal server error.', error);

    })

};
const recipeContainer = document.querySelector('.recipe-container');
let lang = localStorage.getItem('preferred_lang');
import CONFIG from "../config.js";

let author = "";

switch (lang) {

    case 'en':
        author = "Author"
        break;

    case 'es':
        author = "Autor"
        break;

}

async function getVeganList() {

    await fetch(CONFIG.API_BASE_URL + '/lists/category/desserts/list')
    .then(response => response.json())
    .then(data => {

        if (Array.isArray(data) && data.length > 0){

            const recipes = data;

            if (Array.isArray(recipes)) {

                recipes.forEach(recipe => {

                    const card = document.createElement('div');
                    card.classList.add('recipe-card');
                    card.innerHTML = `
                    <img src="${recipe.img_path}" alt="${recipe.name}" class="recipe-card-img" data-id="${recipe.id}">
                    <p class="recipe-card-author">
                        <span class="recipe-tempalte-text">${author}: </span>
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

recipeContainer.addEventListener('click', (e) => {

    const img = e.target.closest('.recipe-card-img');
    if (img) {

        const id = img.dataset.id;
        window.location.href = `/html/recipe_viewer.html?id=${id}&table=desserts`;

    }
})

getVeganList();
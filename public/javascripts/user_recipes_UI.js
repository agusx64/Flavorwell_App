const recipeContainer = document.querySelector('.recipe-container');
const recipeViewerButton = document.querySelectorAll('.user-recipe-button-viewer');
const token = localStorage.getItem('token');
let lang = localStorage.getItem('preferred_lang');
// Host backend
const restHost = 'http://localhost:3000';

let viewRecipeText;

    switch (lang) {

        case 'es':
            viewRecipeText = "Ver Receta"
            break;

        case 'en':
            viewRecipeText = "View Recipe"
            break;

    }

document.addEventListener('DOMContentLoaded', function() {

    getUserRecipes(token);

})

async function getUserRecipes(userToken) {

    try {

        await fetch(restHost + '/users/api/user_recipes', {

            headers: {
                'Authorization': `Bearer ${userToken}`
            },

        })
        .then( async response => {

            const data = await response.json();

            if (!response.ok) {


            }

            return data;

        })
        .then(data => {

            const categoryIcons = {

                vegan: { icon: 'bi bi-leaf-fill', color: 'var(--Celadon)' },
                breakfast: { icon: 'bi bi-cup-hot-fill', color: 'var(--Xhantous)' },
                strong_dish: { icon: 'bi bi-fork-knife', color: 'var(--DarkBlue)' },
                desserts: { icon: 'bi bi-cake-fill', color: 'var(--CandyPink)' }

            };

            const recipes = data.recipes;

            recipes.forEach( recipe => {

                const card = document.createElement('div');
                const { icon, color } = categoryIcons[recipe.category] || {};
                card.classList.add('user-recipe-card');
                card.innerHTML = `

                    <img src="${recipe.img_path}" alt="${recipe.img_path}" class="user-recipe-card-img">
                    <div class="user-recipe-card-info-container">
                        <h2 class="user-recipe-card-name" id="user-recipe-card-name">${recipe.name}</h2>
                        <p class="user-recipe-card-description" id="user-recipe-card-description">${recipe.description}</p>
                        <div class="user-recipe-card-status-container">
                            <div class="user-recipe-card-status">
                                <i class="bi bi-hand-thumbs-up-fill icon-status"></i>
                                <p class="user-recipe-card-like-counter">${recipe.like_count}</p>
                            </div>
                            <div class="user-recipe-card-status">
                                <i class="bi bi-bookmark-fill icon-status"></i>
                                <p class="user-recipe-card-saved-counter">${recipe.save_count}</p>
                            </div>
                            <div class="user-recipe-card-category" style="background-color:${color}">
                                <i class="${icon}"></i>
                            </div>
                        </div>
                        <button class="user-recipe-button-viewer" id="user-recipe-button-viewer">
                            ${viewRecipeText}
                            <i class="bi bi-fork-knife"></i>
                        </button>
                    </div>

                `;

                recipeContainer.appendChild(card);
                const viewButton = card.querySelector('.user-recipe-button-viewer');
                viewButton.addEventListener('click', () => {

                    window.location.href = `/html/recipe_viewer.html?id=${recipe.id}&table=${recipe.category}`;

                });
                
            })

        })
        .catch(error => {

            console.error('Error al procesar la solicitud', error);

        })

    } catch(error) {

        console.error(error);

    }

};
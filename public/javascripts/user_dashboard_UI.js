document.addEventListener('DOMContentLoaded', function() {

    requestAnimationFrame(() => {
        fetchNewRecipes();
        dynamicGetRender();
        dynamicGetRecentRecipe();
        fetchGetDayFood();
    });

});

const restHost = 'http://localhost:3000';
const searchInput = document.querySelector('.input_search');
const searchResultsContainer = document.getElementById('search_results_container');
const resultsList = document.getElementById('search_results_list');

// Buscador de recetas (realtime)
searchInput.addEventListener('input', async () => {

    const query = searchInput.value.trim();

    if (query.length < 2) {

        searchResultsContainer.classList.add('hidden');
        return;

    }

    try {

        const response = await fetch('/dashboard/search_recipes', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })

        });

        const results = await response.json();

        resultsList.innerHTML = '';
        if (results.length === 0) {

            searchResultsContainer.classList.remove('hidden');
            resultsList.innerHTML = '<li class="info-circle-text"><i class="bi bi-info-circle-fill info-circle"></i>No results found</li>';
            return;

        }

        results.forEach(recipe => {

            const li = document.createElement('li');
            li.innerHTML = `
            
                <img src="${recipe.img_path}" alt="${recipe.name}" />
                <span class="recipe-name-search-result">${recipe.name}</span>
            
            `;

            li.addEventListener('click', () => {

                window.location.href = `/html/recipe_viewer.html?id=${recipe.id}&table=${recipe.table_name}`;

            });

            resultsList.appendChild(li);

        });

        searchResultsContainer.classList.remove('hidden');

    } catch (error) {

        console.error('Search error', error);

    }

});

// Este evento cierra el cuadro de busqueda en caso de que sele de click fuera del modal
document.addEventListener('click', e => {

    if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {

        searchResultsContainer.classList.add('hidden');

    }

});

function dynamicGetRecentRecipe() { 

    const bootstrapComponents = document.querySelectorAll('.carousel-item');

    bootstrapComponents.forEach((component) => {

        component.addEventListener('click', async function() {

            const id = this.querySelector('img').getAttribute('data-id');
            const table = this.querySelector('img').getAttribute('data-table');
            const recipeData = { id: parseInt(id), table: table };

            try {

                await fetch(restHost + '/dashboard/get_recipe_by_id', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recipeData)

                })
                .then(async response => {

                    const data = await response.json();
                    if (!response.ok) {

                        console.error(data.message);

                    }

                    return data;

                })
                .then(data => {

                    if (data.success) {

                        window.location.href = `/html/recipe_viewer.html?id=${id}&table=${table}`;

                    } else {

                        console.error('Recipe not found', data.message)

                    }

                })

            } catch(error) {

                console.error(error)

            }

        })

    })

};

function dynamicGetRender() {

    const cardElement = document.querySelectorAll('.day_food');

    cardElement.forEach((element) => {

        element.addEventListener('click', async function() {

            const id = this.querySelector('img').getAttribute('data-id');
            const table = this.querySelector('img').getAttribute('data-table');
            const recipeData = { id: parseInt(id), table: table };

            try {

                await fetch(restHost + '/dashboard/get_recipe_by_id', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recipeData)

                })
                .then(async response => {

                    const data = await response.json();
                    if (!response.ok) {

                        console.error(data.message);

                    }

                    return data;

                })
                .then(data => {

                    if (data.success) {

                        window.location.href = `/html/recipe_viewer.html?id=${id}&table=${table}`;

                    } else {

                        console.error(data.message);

                    }

                });

            } catch (error) {

                console.error(error);

            }

        });

    });

}

async function fetchNewRecipes() {

    await fetch(restHost + '/dashboard/new_food')

    .then(response => response.json())
    .then(data => {

        if (Array.isArray(data) && data.length > 0) {

            const newRecipes = data[data.length - 1];

            if(Array.isArray(newRecipes)) {

                //Elements
                const imgCarouselBreakfast = document.getElementById('new_breakfast_img_recipe');
                const imgCarouselDessert = document.getElementById('new_dessert_img_recipe');
                const imgCarouselStrongDish = document.getElementById('new_strong_dish_img_recipe');
                const imgCarouselVegan = document.getElementById('new_vegan_img_recipe');

                const nameCarouselBreakfast = document.getElementById('new_breakfast_name_recipe');
                const nameCarouselDessert = document.getElementById('new_dessert_name_recipe');
                const nameCarouselStrongDish = document.getElementById('new_strong_dish_name_recipe');
                const nameCarouselVegan = document.getElementById('new_vegan_name_recipe');

                if(newRecipes.length >= 4) {

                    imgCarouselBreakfast.src = newRecipes[0].img_path;
                    imgCarouselBreakfast.setAttribute('data-id', newRecipes[0].id);
                    nameCarouselBreakfast.textContent = newRecipes[0].name;

                    imgCarouselDessert.src = newRecipes[1].img_path;
                    imgCarouselDessert.setAttribute('data-id', newRecipes[1].id);
                    nameCarouselDessert.textContent = newRecipes[1].name;

                    imgCarouselStrongDish.src = newRecipes[2].img_path;
                    imgCarouselStrongDish.setAttribute('data-id', newRecipes[2].id);
                    nameCarouselStrongDish.textContent = newRecipes[2].name;

                    imgCarouselVegan.src = newRecipes[3].img_path;
                    imgCarouselVegan.setAttribute('data-id', newRecipes[3].id);
                    nameCarouselVegan.textContent = newRecipes[3].name;

                } else {

                    console.error('No hay suficientes recetas para mostrar.');

                }

            } else {

                console.error('El último conjunto de resultados no es un array de recetas.');

            }

        } else {

            console.error('No se recibieron datos válidos del servidor.');

        }

    })

};

async function fetchGetDayFood() {

    await fetch(restHost + '/dashboard/day_food')

    .then(response => response.json())
    .then(data => {

        if (Array.isArray(data) && data.length > 0) {

            const recipes = data;

            if(Array.isArray(recipes)) {

                const imgCardBreakfast = document.getElementById('img_card_breakfast');
                const imgNameBreakfast = document.getElementById('recipe_breakfast_name');
    
                const imgCardDessert = document.getElementById('img_card_dessert');
                const imgNameDessert = document.getElementById('recipe_dessert_name');
    
                const imgCardStrongDish = document.getElementById('img_card_strong_dish');
                const imgNameStrongDish = document.getElementById('recipe_strong_dish_name');
    
                const imgCardVegan = document.getElementById('img_card_vegan');
                const imgNameVegan = document.getElementById('recipe_vegan_name');  

                if (recipes.length >= 4) {

                    
                    imgCardBreakfast.src = recipes[0].img_path;
                    imgCardBreakfast.setAttribute('data-id', recipes[0].id);
                    imgNameBreakfast.textContent = recipes[0].name;

                    imgCardDessert.src = recipes[1].img_path;
                    imgCardDessert.setAttribute('data-id', recipes[1].id);
                    imgNameDessert.textContent = recipes[1].name;

                    imgCardStrongDish.src = recipes[2].img_path;
                    imgCardStrongDish.setAttribute('data-id', recipes[2].id);
                    imgNameStrongDish.textContent = recipes[2].name;

                    imgCardVegan.src = recipes[3].img_path;
                    imgCardVegan.setAttribute('data-id', recipes[3].id);
                    imgNameVegan.textContent = recipes[3].name;

                } else {

                    console.error('No hay suficientes recetas para mostrar.');

                }
            } else {

                console.error('El último conjunto de resultados no es un array de recetas.');

            }
        } else {

            console.error('No se recibieron datos válidos del servidor.');

        }

    })

    .catch(error => {

        console.error('Hubo un problema con la solicitud:', error);

    })

};
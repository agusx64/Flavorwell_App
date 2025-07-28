document.addEventListener('DOMContentLoaded', function() {

    requestAnimationFrame(() => {
        getUserInfo();
        fetchNewRecipes();
        dynamicGetRender();
        dynamicGetRecentRecipe();
        fetchGetDayFood();
    });

});

// Host backend
const restHost = 'https://flavorwell.up.railway.app';

// Variables del componente de busqueda
const searchInput = document.querySelector('.input_search');
const searchResultsContainer = document.getElementById('search_results_container');
const resultsList = document.getElementById('search_results_list');

// Variables para sistema de scrolleo
let offset = 0, limit = 10, loading = false, allRecipes = [];
const token = localStorage.getItem('token');

// Variables de los botones de categorias
const vegansButton = document.getElementById('vegan_button');
const breakfastsButton = document.getElementById('breakfast_button');
const dishesButton = document.getElementById('dishes_button');
const dessertsButton = document.getElementById('desserts_button');

// Funcion para obtener nombre y foto de perfil
async function getUserInfo() {

    try {

        const res = await fetch(restHost + '/users/api/user_profile', {

            headers: {
                'Authorization': `Bearer ${token}`
            }

        })

        const data = await res.json();
        if (!data.success) return;

        // Seteo de nombre de usuario
        const headerText = document.querySelector('.header_text');
        headerText.textContent = data.name;

        // Seteo de foto de perfil
        const profileHeader = document.querySelector('.profile_header');
        // Uso de función LAMDA
        profileHeader.innerHTML = data.profile_img
            // Si existe una foto de perfilinsertan este componente
            ? `<img src="${data.profile_img}" alt="User profile" class="img-header-user">`
            // Si no existe insertan este componente
            : `<i class="bi bi-person-circle svg_profile"></i>`;

    } catch (error) {

        console.error('Error loading user profile.', error)

    }

}

// Funacion para la carga de recetas
async function loadRecipes() {

    if (loading) return;
    loading = true;

    try {

        if (!allRecipes.length) {

            const res = await fetch(restHost + '/users/api/recent_posts', {

                headers: { 'Authorization': `Bearer ${token}` }

            });

            allRecipes = await res.json();

        }

        const slice = allRecipes.slice(offset, offset + limit);
        offset += limit;
        slice.forEach(renderRecipeCard);

    } catch (error) {

        console.error(error);

    } finally {

        loading = false;
        
    }

}

window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 ) {

        loadRecipes();

    }

});

loadRecipes();

const categoryIcons = {

    vegan: { icon: 'bi bi-leaf-fill', color: 'var(--Celadon)' },
    breakfast: { icon: 'bi bi-cup-hot-fill', color: 'var(--Xhantous)' },
    strong_dish: { icon: 'bi bi-fork-knife', color: 'var(--DarkBlue)' },
    desserts: { icon: 'bi bi-cake-fill', color: 'var(--CandyPink)' }

};

function renderRecipeCard(recipe) {

    const container = document.querySelector('.recipe_post_container');
    const { icon, color } = categoryIcons[recipe.category] || {};
    const card = document.createElement('div');

    card.classList.add('card-post-container');
    card.innerHTML = `
        <img src="${recipe.image_url}" alt="${recipe.name}" class="card-post-img">
        <h3 class="card-post-title">${recipe.name}</h3>
        <p class="card-post-description">${recipe.description}</p>
        <div class="card-post-status">
            <div class="card-post-buttons-interaction">
                <div class="card-post-like-status">
                    <i class="bi bi-hand-thumbs-up-fill"></i>
                    <span class="card-post-like-number">${recipe.likeCount}</span>
                </div>
                <div class="card-post-dish-category" style="background-color:${color}">
                    <i class="${icon}"></i>
                </div>
            </div>
            <div class="card-post-buttons-interaction">
                <button class="action-buttons like-btn ${recipe.liked ? 'liked' : ''}" data-id="${recipe.id}" data-category="${recipe.category}">
                    <i class="bi ${recipe.liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}"></i>
                </button>
                <button class="action-buttons save-btn ${recipe.saved ? 'saved' : ''}" data-id="${recipe.id}" data-category="${recipe.category}">
                    <i class="bi ${recipe.saved ? 'bi-bookmark-fill' : 'bi-bookmark'}"></i>
                </button>
            </div>
        </div>
        <button class="card-post-main-button" data-id="${recipe.id}" data-category="${recipe.category}">
            View Recipe <i class="bi bi-fork-knife"></i>
        </button>
    `;
    container.appendChild(card);

}

document.addEventListener('click', async (e) => {

    const btnLike = e.target.closest('.like-btn');
    const btnSave = e.target.closest('.save-btn');
    const btnView = e.target.closest('.card-post-main-button');

    if (btnLike) {

        const id = btnLike.dataset.id, cat = btnLike.dataset.category;
        const res = await fetch (restHost + '/users/api/toggle_like', {

            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({ recipeId: id, category: cat })

        });

        const resp = await res.json();

        if (resp.success) {

            const icon = btnLike.querySelector('i');
            icon.classList.toggle('bi-hand-thumbs-up-fill', resp.liked);
            icon.classList.toggle('bi-hand-thumbs-up', !resp.liked);

            const countSpan = btnLike.closest('.card-post-container').querySelector('.card-post-like-number');
            let currentLikes = parseInt(countSpan.textContent);
            countSpan.textContent = resp.liked ? currentLikes + 1 : currentLikes - 1;

        }

    }

    if (btnSave) {

        const id = btnSave.dataset.id, cat = btnSave.dataset.category;
        const res = await fetch(restHost + '/users/api/toggle_save', {

            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({ recipeId: id, category:cat })

        });

        const resp = await res.json();
        if (resp.success) {

            const icon = btnSave.querySelector('i');
            icon.classList.toggle('bi-bookmark-fill', resp.saved);
            icon.classList.toggle('bi-bookmark', !resp.saved);

        }

    }

    if (btnView) {

        const id = btnView.dataset.id, cat = btnView.dataset.category;
        window.location.href = `/html/recipe_viewer.html?id=${id}&table=${cat}`;

    }

});

// Buscador de recetas (realtime)
searchInput.addEventListener('input', async () => {

    const query = searchInput.value.trim();

    if (query.length < 2) {

        searchResultsContainer.classList.add('hidden');
        return;

    }

    try {

        const response = await fetch(restHost + '/dashboard/search_recipes', {

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
            const recipeData = { id: id, table: table };

            try {

                await fetch(restHost + '/users/get_recipe_by_id', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
            const recipeData = { id: id, table: table };

            try {

                await fetch(restHost + '/users/get_recipe_by_id', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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

vegansButton.addEventListener('click', () => {

    window.location.href = '/html/libraries/vegan_list.html';

});

breakfastsButton.addEventListener('click', () => {

    window.location.href = '/html/libraries/breakfasts_list.html';

});

dessertsButton.addEventListener('click', () => {

    window.location.href = '/html/libraries/desserts_list.html';

});

dishesButton.addEventListener('click', () => {

    window.location.href = '/html/libraries/dishes_list.html';

});
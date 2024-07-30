document.addEventListener('DOMContentLoaded', function() {

    fetchGetDayFood();
    fetchNewRecipes();
    dynamicGetRender();
    dynamicGetRecentRecipe();

});

function dynamicGetRecentRecipe() {

    const bootstrapComponents = document.querySelectorAll('.carousel-item');

    bootstrapComponents.forEach((component) => {

        component.addEventListener('click', async function() {

            const dishName = this.querySelector('h1').textContent;
            const dishJSON = { dish: dishName };

            try {

                const response = await fetch('/sended_text', {

                    method: 'POST',
                    headers: {

                        'content-type': 'application/json',

                    },
                    body: JSON.stringify(dishJSON)

                });

                if(!response.ok) {

                    throw new Error(`HTTP error! status: ${response.status}`);

                }

                const data = await response.json();
                window.location.href = `/recipe_viewer?data=${encodeURIComponent(JSON.stringify(data))}`;

            } catch(error) {

                console.error(error);

            }

        })

    })

}

function dynamicGetRender() {

    const cardElement = document.querySelectorAll('.day_food');

    cardElement.forEach((element) => {

        element.addEventListener('click', async function() {

            const dishName = this.querySelector('h2').textContent;

            const dishJSON = { dish: dishName };

            try {

                const response = await fetch('/sended_text', {

                    method: 'POST',
                    headers: {

                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify(dishJSON)

                });

                if (!response.ok) {

                    throw new Error(`HTTP error! status: ${response.status}`);

                }

                const data = await response.json();
                window.location.href = `/recipe_viewer?data=${encodeURIComponent(JSON.stringify(data))}`;

            } catch (error) {

                console.error(error);

            }

        });

    });

}

function fetchNewRecipes() {

    fetch('/new_food')

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
                    nameCarouselBreakfast.textContent = newRecipes[0].name;

                    imgCarouselDessert.src = newRecipes[1].img_path;
                    nameCarouselDessert.textContent = newRecipes[1].name;

                    imgCarouselStrongDish.src = newRecipes[2].img_path;
                    nameCarouselStrongDish.textContent = newRecipes[2].name;

                    imgCarouselVegan.src = newRecipes[3].img_path;
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

function fetchGetDayFood() {

    fetch('/day_food')

    .then(response => response.json())
    .then(data => {

        if (Array.isArray(data) && data.length > 0) {

            const recipes = data[data.length - 1];

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
                    imgNameBreakfast.textContent = recipes[0].name;

                    imgCardDessert.src = recipes[1].img_path;
                    imgNameDessert.textContent = recipes[1].name;

                    imgCardStrongDish.src = recipes[2].img_path;
                    imgNameStrongDish.textContent = recipes[2].name;

                    imgCardVegan.src = recipes[3].img_path;
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

let veganButton = document.getElementById('vegan_button');
let dessertsButton = document.getElementById('desserts_button');
let drinksButton = document.getElementById('drinks_button');
let breakfastButton = document.getElementById('breakfast_button');

// Botones del menú principal
veganButton.addEventListener('click', function() { window.location.href = '/vegan_book'; });
dessertsButton.addEventListener('click', function() { window.location.href = '/desserts_book'; });
drinksButton.addEventListener('click', function() { window.location.href = '/strong_book'; });
breakfastButton.addEventListener('click', function() { window.location.href = '/breakfast_book'; });

let recommendedFoodButtons = document.querySelectorAll('.day_food');
let recipeDayNames = document.querySelectorAll('.recipe_day_name');


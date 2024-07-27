document.addEventListener('DOMContentLoaded', function() {

    getDayFood();

});

function fetchNewRecipes() {

    

}

function fetchGetDayFood() {

    fetch('/day_food')

    .then(response => response.json())
    .then(data => {

        console.log(data);

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

    });

}

let veganButton = document.getElementById('vegan_button');
let dessertsButton = document.getElementById('desserts_button');
let drinksButton = document.getElementById('drinks_button');
let breakfastButton = document.getElementById('breakfast_button');

// Botones del menú principal
veganButton.addEventListener('click', function() { window.location.href = '/vegan_book'; });
dessertsButton.addEventListener('click', function() { window.location.href = '/desserts_book'; });
drinksButton.addEventListener('click', function() { window.location.href = '/strong_book'; });
breakfastButton.addEventListener('click', function() { window.location.href = '/breakfast_book'; });

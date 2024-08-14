document.addEventListener('DOMContentLoaded', function() {
    fetchBreakfastList();
});

function dynamicGetRecentRecipe() { 
    const bootstrapComponents = document.querySelectorAll('.card_component');
    console.log(bootstrapComponents);

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

function fetchBreakfastList() {
    fetch('/strong_dish_list')
        .then(response => response.json())
        .then(data => {
            displayRecipes(data);
            console.log(data);
            // Llamar a dynamicGetRecentRecipe después de que se rendericen los elementos
            dynamicGetRecentRecipe();
        })
        .catch(error => {
            console.error('Error fetching the breakfast list:', error);
        });
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    
    if (!container) {
        console.error('El contenedor con el ID "recipes-container" no se encontró en el DOM.');
        return;
    }

    container.innerHTML = ''; // Limpiar el contenido existente

    recipes.forEach(recipe => {
        // Crear el componente card
        const card = document.createElement('div');
        card.className = 'card_component';

        // Crear el elemento de la imagen
        const img = document.createElement('img');
        img.src = recipe.img_path; // Reemplaza con la ruta real de la imagen si es necesario
        img.alt = '';
        img.id = 'img_card_container';
        img.className = 'img_style';
        card.appendChild(img);

        // Crear el contenedor de información de la receta
        const infoDiv = document.createElement('div');
        infoDiv.className = 'recipe_information';

        // Añadir el ID
        const idSpan = document.createElement('span');
        idSpan.className = 'id_text';
        idSpan.textContent = recipe.id; // Insertar el ID de la receta
        infoDiv.appendChild(idSpan);

        // Añadir el contenedor del autor
        const authorDiv = document.createElement('div');
        authorDiv.className = 'author_container';

        const strong = document.createElement('strong');
        strong.textContent = 'By: ';
        authorDiv.appendChild(strong);

        const authorSpan = document.createElement('span');
        authorSpan.className = 'author_text';
        authorSpan.textContent = recipe.author; // Inserta el nombre del autor si está disponible en los datos
        authorDiv.appendChild(authorSpan);

        infoDiv.appendChild(authorDiv);

        // Añadir el nombre de la receta
        const nameH1 = document.createElement('h1');
        nameH1.className = 'name_recipe';
        nameH1.textContent = recipe.name; // Insertar el nombre de la receta
        infoDiv.appendChild(nameH1);

        card.appendChild(infoDiv);

        // Añadir el componente card al contenedor
        container.appendChild(card);
    });
}
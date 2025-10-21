document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.saved-recipes-container');
    const token = localStorage.getItem('token');
    const restHost = 'https://flavorwell.up.railway.app';

    async function fetchSavedRecipes() {

        try {

            const res = await fetch(restHost + '/users/api/saved_recipes', {

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            });

            const data = await res.json();
            console.log(data);

            container.innerHTML = '';

            if (data.length === 0) {

                container.innerHTML = '<p class="empty-message">No saved recipes yet.</p>';
                return;

            }

            data.forEach(recipe => {

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
                    </h2>
                `;

                container.appendChild(card);

            });

        } catch(error) {

            console.error('Error loading saved recipes:', error)

        }

    }

    container.addEventListener('click', (e) => {

        const img = e.target.closest('.recipe-card-img');
        if (img) {

            const id = img.dataset.id;
            const category = img.dataset.category;
            window.location.href = `/html/recipe_viewer.html?id=${id}&table=${category}`;

        }

    });

    fetchSavedRecipes();

});

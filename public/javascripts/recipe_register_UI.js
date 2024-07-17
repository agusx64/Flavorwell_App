document.addEventListener("DOMContentLoaded", function() {
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    const selectTrigger = document.querySelector('.custom-select-trigger');
    const customOptions = document.querySelector('.custom-options');
    const customOptionsItems = document.querySelectorAll('.custom-option');
    const realSelect = document.getElementById('real-select');
    const getSelectedValueButton = document.getElementById('get-value');

    const nameRecipe = document.querySelector('input[name="name_recipe"]');
    const energy = document.querySelector('input[name="energy"]');
    const time = document.querySelector('input[name="time"]');
    const items = document.querySelector('input[name="items"]');
    const recipeDescription = document.querySelector('textarea[name="recipe_description"]');
    const recipeInstructions = document.querySelector('textarea[name="recipe_instructions"]');
    const imgRecipe = document.querySelector('input[name="recipe_image"]');

    let text_category;

    if (!realSelect) {
        console.error('Elemento con ID "real-select" no encontrado.');
        return;
    }

    selectTrigger.addEventListener('click', () => {
        customOptions.classList.toggle('open');
    });

    customOptionsItems.forEach(option => {
        option.addEventListener('click', () => {
            text_category = option.textContent.trim();
            selectTrigger.querySelector('span').textContent = text_category;
            customOptions.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            customOptions.classList.remove('open');
        }
    });

    function validateForm() {
        if (nameRecipe.value.trim() !== '' &&
            energy.value.trim() !== '' &&
            time.value.trim() !== '' &&
            items.value.trim() !== '' &&
            recipeDescription.value.trim() !== '' &&
            recipeInstructions.value.trim() !== '') {
            getSelectedValueButton.disabled = false;
            imgRecipe.disabled = false;
        } else {
            getSelectedValueButton.disabled = true;
            imgRecipe.disabled = true;
        }
    }

    validateForm();

    [nameRecipe, energy, time, items, recipeDescription, recipeInstructions].forEach(field => {
        field.addEventListener('input', validateForm);
    });

    getSelectedValueButton.addEventListener('click', () => {


        const formData = new FormData();
        formData.append('category', text_category);
        formData.append('name_recipe', nameRecipe.value);
        formData.append('energy', energy.value);
        formData.append('time', time.value);
        formData.append('items', items.value);
        formData.append('recipe_description', recipeDescription.value);
        formData.append('recipe_instructions', recipeInstructions.value);
        formData.append('recipe_image', imgRecipe.files[0]);

        fetch('/up_recipe', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);
        })
        .catch(error => {
            console.log("Error al procesar la solicitud:", error);
        });
    });
});

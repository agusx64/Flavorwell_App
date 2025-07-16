document.addEventListener("DOMContentLoaded", function () {
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
    const authorName = document.getElementById('name_author');

    let text_category;
    const restHost = 'http://localhost:3000';

    // Variables para el buscador de ingredientes
    const input = document.getElementById('ingredient-search');
    const resultsList = document.getElementById('ingredient-results');
    const selectedList = document.getElementById('selected-ingredients');
    let suggestions = [];

    // Variables para agregar pasos de receta
    const stepInput = document.getElementById('step_input');
    const addStepBtn = document.getElementById('add_step_btn');
    const stepList = document.getElementById('step_list');

    // Buscar en tiempo real
    input.addEventListener('input', async () => {
        const query = input.value.trim();

        if (!query) {
            resultsList.classList.add('hidden');
            resultsList.innerHTML = '';
            return;
        }

        try {
            const res = await fetch(restHost +`/lists/api/ingredients/search?q=${encodeURIComponent(query)}`);
            suggestions = await res.json();
            renderSuggestions();
        } catch (err) {
            console.error('Error:', err);
        }
    });

    function renderSuggestions() {
        resultsList.innerHTML = '';
        resultsList.classList.remove('hidden');

        suggestions.forEach(ingredient => {
            const li = document.createElement('li');
            li.className = 'ingredient-suggestion';
            li.innerHTML = `
                <div class="ingredient-info">
                    <img class="ingredient-img" src="${ingredient.src_reference}" alt="${ingredient.name}">
                    <span class="ingredient-name">${formatText(ingredient.name)}</span>
                </div>
                <i class="bi bi-plus add-icon" data-name="${ingredient.name}" data-img="${ingredient.src_reference}"></i>
            `;
            resultsList.appendChild(li);
        });
    }

    // Agregar al hacer clic en el ícono +
    resultsList.addEventListener('click', e => {
        if (e.target.classList.contains('add-icon')) {
            const name = e.target.dataset.name;
            const src = e.target.dataset.img;
            addIngredient(name, src);
            input.value = '';
            resultsList.classList.add('hidden');
            resultsList.innerHTML = '';
        }
    });

    // Agregar ingrediente a la lista seleccionada
    function addIngredient(name, src) {
        const li = document.createElement('li');
        li.className = 'ingredient-item';
        li.setAttribute('draggable', 'true');
        li.innerHTML = `
            <div class="ingredient-info">
                <i class="bi bi-grip-vertical drag-handle"></i>
                <img class="ingredient-img li-img" src="${src}" alt="${src}">
                <span class="ingredient-name">${formatText(name)}</span>
            </div>
            <i class="bi bi-x remove-icon"></i>
        `;
        selectedList.appendChild(li);
        updateDragAndDrop();
    }

    // Eliminar ingrediente
    selectedList.addEventListener('click', e => {
        if (e.target.classList.contains('remove-icon')) {
            e.target.closest('.ingredient-item').remove();
        }
    });

    // Drag & Drop
    function updateDragAndDrop() {
        let dragged;

        selectedList.querySelectorAll('.ingredient-item').forEach(item => {
            item.addEventListener('dragstart', e => {
                dragged = item;
                setTimeout(() => item.classList.add('dragging'), 0);
            });

            item.addEventListener('dragend', () => {
                dragged.classList.remove('dragging');
            });

            item.addEventListener('dragover', e => {
                e.preventDefault();
                const bounding = item.getBoundingClientRect();
                const offset = bounding.y + (bounding.height / 2);
                if (e.clientY - offset > 0) {
                    item.after(dragged);
                } else {
                    item.before(dragged);
                }
            });
        });
    }

    function formatText(str) {
        return str
            .replace(/_/g, ' ')                             // Reemplaza _ por espacio
            .toLowerCase()                                  // Convierte todo a minúsculas
            .replace(/\b\w/g, char => char.toUpperCase());  // Capitaliza la primera letra de cada palabra
    }

    function addStep(text) {
        if (!text.trim()) return;

        const li = document.createElement('li');
        li.className = 'step-item';
        li.draggable = true;

        li.innerHTML = `
            <div class="step-info">
                <div>
                    <i class="bi bi-grip-vertical step-drag"></i>
                </div>
                <div class="step-instruction">
                    <span class="step-instruction-name">${capitalize(text.trim())}</span>
                </div>
            </div>
            <i class="bi bi-x step-delete"></i>
        `;

        stepList.appendChild(li);
        stepInput.value = '';
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Agregar paso con Enter o botón
    stepInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addStep(stepInput.value);
        }
    });

    addStepBtn.addEventListener('click', () => {
        addStep(stepInput.value);
    });

    // Eliminar paso
    stepList.addEventListener('click', (e) => {
        if (e.target.classList.contains('step-delete')) {
            e.target.closest('.step-item').remove();
        }
    });

    // Drag & drop reordenamiento
    let dragged;

    stepList.addEventListener('dragstart', (e) => {
        dragged = e.target;
        e.target.style.opacity = 0.5;
    });

    stepList.addEventListener('dragend', (e) => {
        e.target.style.opacity = '';
    });

    stepList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const target = e.target.closest('.step-item');
        if (target && target !== dragged) {
            const bounding = target.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            const after = e.clientY > offset;
            stepList.insertBefore(dragged, after ? target.nextSibling : target);
        }
    });

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



    // function validateForm() {
    //     if (nameRecipe.value.trim() !== '' &&
    //         energy.value.trim() !== '' &&
    //         time.value.trim() !== '' &&
    //         items.value.trim() !== '' &&
    //         recipeDescription.value.trim() !== '' &&
    //         recipeInstructions.value.trim() !== '' &&
    //         authorName.value.trim() !== '') {
    //         getSelectedValueButton.disabled = false;
    //         imgRecipe.disabled = false;
    //     } else {
    //         getSelectedValueButton.disabled = true;
    //         imgRecipe.disabled = true;
    //     }
    // }

    // validateForm();

    // [nameRecipe, energy, time, items, recipeDescription, recipeInstructions, authorName].forEach(field => {
    //     field.addEventListener('input', validateForm);
    // });

    // getSelectedValueButton.addEventListener('click', () => {
    //     // Deshabilitar el botón para evitar múltiples envíos
    //     getSelectedValueButton.disabled = true;
    //     getSelectedValueButton.textContent = "Enviando...";

    //     const formData = new FormData();
    //     formData.append('category', text_category);
    //     formData.append('name_recipe', nameRecipe.value);
    //     formData.append('energy', energy.value);
    //     formData.append('time', time.value);
    //     formData.append('items', items.value);
    //     formData.append('recipe_description', recipeDescription.value);
    //     formData.append('recipe_instructions', recipeInstructions.value);
    //     formData.append('author', authorName.value);
    //     formData.append('recipe_image', imgRecipe.files[0]);

    //     fetch('/up_recipe', {
        
    //         method: 'POST',
    //         body: formData
        
    //     })
    //     .then(response => {
            
    //         if (!response.ok) {
                
    //             throw new Error(`HTTP error! status: ${response.status}`);
            
    //         }
            
    //         return response.json();
        
    //     })
    //     .then(data => {

    //         if (data.success) {

    //             window.location.href = '/select';

    //         } else {
                
    //             console.error("Error del servidor:", data.error);
    //             alert("Hubo un error al procesar tu solicitud.");
            
    //         }
        
    //     })
    //     .catch(error => {
        
    //         console.error("Error al procesar la solicitud:", error);
    //         alert("Hubo un error al enviar la solicitud.");
        
    //     })
    //     .finally(() => {
        
    //         getSelectedValueButton.disabled = false;
    //         getSelectedValueButton.textContent = "Enviar";
        
    //     });
    
    // });

});
 

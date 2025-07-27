document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem('token');

    // Variables del selector de categoria
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    const selectTrigger = document.querySelector('.custom-select-trigger');
    const customOptions = document.querySelector('.custom-options');
    const customOptionsItems = document.querySelectorAll('.custom-option');
    const realSelect = document.getElementById('real-select');
    const sendRecipeButton = document.getElementById('send-recipe');
    const sendPromptRecipeButton = document.getElementById('generate-description-button');
    let text_category;

    // Host backend
    const restHost = 'http://192.168.164.102:3000';

    // Variables para el buscador de ingredientes
    const input = document.getElementById('ingredient-search');
    const resultsList = document.getElementById('ingredient-results');
    const selectedList = document.getElementById('selected-ingredients');
    let suggestions = [];

    // Variables para agregar pasos de receta
    const stepInput = document.getElementById('step_input');
    const addStepBtn = document.getElementById('add_step_btn');
    const stepList = document.getElementById('step_list');

    // Variable de modal de exito
    const modal = document.getElementById('successModal');

    // Variables de modal de error
    const errorModal = document.getElementById('errorModal');
    const imgErrorModal = document.getElementById('img-context');
    const textErrorModal = document.getElementById('text-context');
    const tryAgainButton = document.getElementById('tryAgain');

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

    // Crear componentes frontend para sugerencias de ingredientes
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
                <i class="bi bi-plus add-icon" data-id="${ingredient.id}" data-name="${ingredient.name}" data-img="${ingredient.src_reference}"></i>
            `;
            resultsList.appendChild(li);
        });
    }

    // Agregar al hacer clic en el ícono +
    resultsList.addEventListener('click', e => {
        if (e.target.classList.contains('add-icon')) {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const src = e.target.dataset.img;
            addIngredient(id, name, src);
            input.value = '';
            resultsList.classList.add('hidden');
            resultsList.innerHTML = '';
        }
    });

    // Agregar ingrediente a la lista seleccionada
    function addIngredient(id, name, src) {
        const li = document.createElement('li');
        li.className = 'ingredient-item';
        li.setAttribute('draggable', 'true');
        li.setAttribute('data-id', id)
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

    // Drag & Drop para ingredientes
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

    // Drag & drop reordenamiento para instrucciones
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

    // Filtro del selector de categorias
    if (!realSelect) {
        console.error('Elemento con ID "real-select" no encontrado.');
        return;
    }

    // Apertura de menu desplegable de categorias
    selectTrigger.addEventListener('click', () => {
        customOptions.classList.toggle('open');
    });

    // Obtención del valor seleccionado 
    customOptionsItems.forEach(option => {
        option.addEventListener('click', () => {
            text_category = option.textContent.trim();
            selectTrigger.querySelector('span').textContent = text_category;
            customOptions.classList.remove('open');
            validateForm();
            validatePromptButton();
        });
    });

    // Quitar menu desplegable si se da click fuera del menu
    document.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            customOptions.classList.remove('open');
        }
    });

    function validateForm() {

        const name = document.getElementById('name-recipe-text');
        const description = document.getElementById('recipe-description-text');
        const category = text_category;
        const ingredients = selectedList.querySelectorAll('.ingredient-item');
        const instructions = stepList.querySelectorAll('.step-item');
        const image = document.getElementById('formFile').files[0];

        const isValid = 
            name &&
            description &&
            category &&
            image &&
            ingredients.length >= 3 &&
            instructions.length >= 3;

        sendRecipeButton.disabled = !isValid;

    };

    function validatePromptButton() {

        const name = document.getElementById('name-recipe-text').value.trim();

        if (name !== '' && text_category) {

            sendPromptRecipeButton.disabled = false;

        } else {

            sendPromptRecipeButton.disabled = true;

        }

    };


    document.getElementById('name-recipe-text').addEventListener('input', () => {

        validateForm();
        validatePromptButton();

    });
    document.getElementById('recipe-description-text').addEventListener('input', validateForm);
    document.getElementById('formFile').addEventListener('change', validateForm);
    const inputImage = document.getElementById('formFile');
    const labelRegisterImg = document.getElementById('label-recipe-register-img');

    inputImage.addEventListener('change', () => {

        if (inputImage.files && inputImage.files[0]) {

            labelRegisterImg.classList.add('uploaded')

        } else {

            labelRegisterImg.classList.remove('uploaded');

        }

    });

    const observer = new MutationObserver(validateForm);
    const configObserver = { childList: true, subtree: false };

    observer.observe(selectedList, configObserver);
    observer.observe(stepList, configObserver);

    sendRecipeButton.addEventListener('click', async (event) => {

        event.preventDefault();
        sendRecipeButton.textContent = 'Loading...';
        sendRecipeButton.disabled = true;

        const name = document.getElementById('name-recipe-text').value.trim();
        const description = document.getElementById('recipe-description-text').value.trim();
        const category = text_category;
        const ingredients = [...selectedList.querySelectorAll('.ingredient-item')].map(i => i.dataset.id);
        const instructions = [...stepList.querySelectorAll('.step-instruction-name')].map(i => i.textContent.trim());
        const image = document.getElementById('formFile').files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('instructions', JSON.stringify(instructions));
        formData.append('image', image);

        try {

            await fetch(restHost + '/users/recipes/register', {

                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData

            })
            .then( async response => {

                const data = await response.json();

                if (!response.ok) {
                
                    imgErrorModal.src = '/images/_UI_img/error.webp';
                    textErrorModal.textContent = `${data.message}`;
                
                    errorModal.classList.remove('hidden');
                    tryAgainButton.addEventListener('click', () => {
                    
                        errorModal.classList.add('hidden');
                    
                    });
                
                    sendRecipeButton.disabled = false;
                    sendRecipeButton.textContent = 'Share your dish now';
                
                }
            
                return data;

            })
            .then(data => {

                if (data.success) {

                    // Mostrar modal
                    modal.classList.remove('hidden');

                    // Acción del botón "Back to login"
                    document.getElementById('backToMenu').addEventListener('click', () => {
                        window.location.href = '/html/user_dashboard.html'
                    });

                } else {

                    console.error("Error al registrar el usuario:", error);

                }
            })
            .catch(error => {

                console.error("Error al procesar la solicitud:", error);

            })
            .finally(() => {

                sendRecipeButton.textContent = 'Share your dish now';
                sendRecipeButton.disabled = false;

            })

        } catch (error) {

            console.error(error);

        }

    });

    sendPromptRecipeButton.addEventListener('click', async (event) => {

        event.preventDefault();
        sendPromptRecipeButton.disabled = true;

        const name = document.getElementById('name-recipe-text').value.trim();
        const category = text_category;

        try {

            await fetch(restHost + '/users/api/recipes/ai-generate', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: name, category: category })

            })
            .then( async response => {

                const data = await response.json();

                if (!response.ok) {
                
                    imgErrorModal.src = '/images/_UI_img/error.webp';
                    textErrorModal.textContent = `${data.message}`;
                
                    errorModal.classList.remove('hidden');
                    tryAgainButton.addEventListener('click', () => {
                    
                        errorModal.classList.add('hidden');
                    
                    });
                                
                }
            
                return data;

            })
            .then(data => {

                if (data.success) {

                    console.log(data);

                    const { description, ingredients, instructions } = data.data;

                    // Insertar descipción de la receta
                    document.getElementById('recipe-description-text').value = description;

                    ingredients.forEach(async (ingredientName) => {

                        try {

                            const res = await fetch(restHost + `/lists/api/ingredients/search?q=${encodeURIComponent(ingredientName)}`);
                            const results = await res.json();

                            if (results.length > 0) {

                                const ing = results[0];
                                const li = document.createElement('li');
                                li.classList.add('ingredient-item');
                                li.setAttribute('draggable', 'true');
                                li.setAttribute('data-id', ing.id);

                                li.innerHTML = `

                                    <div class="ingredient-info">
                                        <i class="bi bi-grip-vertical drag-handle"></i>
                                        <img class="ingredient-img li-img" src="${ing.src_reference}" alt="${ing.name}">
                                        <span class="ingredient-name">${formatText(ing.name)}</span>
                                    </div>
                                    <i class="bi bi-x remove-icon"></i>

                                `;

                                selectedList.appendChild(li);
                                updateDragAndDrop();

                            } else {

                                console.log('Hay un ingrediente generado que aun no esta disponible, estamos trabajando en agregar ingredientes constantemente.')

                            }

                        } catch (error) {

                            console.error('Error buscando ingrediente:', ingredientName, err);

                        }

                    });

                    // Insertar los pasos de la receta
                    stepList.innerHTML = '';
                    instructions.forEach(step => {

                        const li = document.createElement('li');
                        li.classList.add('step-item');
                        li.draggable = true;
                        li.innerHTML = `
                            <div class="step-info">
                                <div><i class="bi bi-grip-vertical step-drag"></i></div>
                                <div class="step-instruction">
                                    <span class="step-instruction-name">${step}</span>
                                </div>
                            </div>
                            <i class="bi bi-x step-delete"></i>
                        `;

                        stepList.appendChild(li);

                    });

                    validateForm();

                } else {

                    // Muestra mensaje de error si deseas
                    imgErrorModal.src = '/images/_UI_img/error.webp';
                    textErrorModal.textContent = 'AI response error.';
                    errorModal.classList.remove('hidden');
                    tryAgainButton.addEventListener('click', () => {

                        errorModal.classList.add('hidden');

                    });

                }
            })
            .catch(error => {

                console.error("Error al procesar la solicitud:", error);

            })
            .finally(() => {

                sendPromptRecipeButton.disabled = false;

            })

        } catch (error) {

            console.error(error);

        }

    });

    document.getElementById('formFile').disabled = false;

});
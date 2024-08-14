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
    const authorName = document.getElementById('name_author');

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
            authorName.value.trim() !== '') {

            getSelectedValueButton.disabled = false;

        } else {

            getSelectedValueButton.disabled = true;

        }
    }

    validateForm();

    [nameRecipe, energy, time, items, authorName].forEach(field => {
        field.addEventListener('input', validateForm);
    });

    getSelectedValueButton.addEventListener('click', () => {
        getSelectedValueButton.disabled = true; // Deshabilitar el botón para evitar múltiples clics
    
        const formData = new FormData();
        formData.append('category', text_category);
        formData.append('name_recipe', nameRecipe.value);
        formData.append('energy', energy.value);
        formData.append('time', time.value);
        formData.append('items', items.value);
        formData.append('author', authorName.value);
    
        fetch('/send_prompt', {
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
        })
        .finally(() => {
            getSelectedValueButton.disabled = false; // Vuelve a habilitar el botón
        });
    
        // window.location.href = '/generate_process'
    });    
    
}); 
document.addEventListener('DOMContentLoaded', function() {

    const maxSelections = 1;
    let selectedCount = 0;
    const selectedIngredients = [];

    const buttons = document.querySelectorAll('.ingredient_button');
    buttons.forEach(button => {

        button.addEventListener('click', function() {

            const container = button.closest('.button_container');
            const dot = container.querySelector('div'); // Selecciona el primer div dentro del container

            if (!dot) {
                console.error('No se encontró el div para el dot.');
                return;
            }

            const ingredientName = container.querySelector('.name_ingredient').textContent;

            if (container.classList.contains('selected')) {

                container.classList.remove('selected');
                dot.classList.remove('select_dot');
                selectedCount--;
                const index = selectedIngredients.indexOf(ingredientName);

                if (index > -1) {
                    selectedIngredients.splice(index, 1);
                }

            } else if (selectedCount < maxSelections) {

                container.classList.add('selected');
                dot.classList.add('select_dot');
                selectedCount++;
                selectedIngredients.push(ingredientName);
                
            }

            console.log(JSON.stringify(selectedIngredients));
        });

    });

    // Selecciona el botón por su id
    const submitButton = document.getElementById('load_protein');

    // Agrega un event listener para manejar el clic del botón
    submitButton.addEventListener('click', () => {

        // Envía los ingredientes seleccionados al servidor
        fetch('/load_vegetables', {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json',

            },
            body: JSON.stringify(selectedIngredients),
        })

        .then(response => response.json())
        .then(data => {

            console.log('Success:', data);

        })
        .catch((error) => {

            console.error('Error:', error);

        });

        window.location.href = '/select_protein';

    });

});
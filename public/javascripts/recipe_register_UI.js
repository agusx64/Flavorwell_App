document.addEventListener("DOMContentLoaded", function() {
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    const selectTrigger = document.querySelector('.custom-select-trigger');
    const customOptions = document.querySelector('.custom-options');
    const customOptionsItems = document.querySelectorAll('.custom-option');
    const realSelect = document.getElementById('real-select');

    selectTrigger.addEventListener('click', () => {
        customOptions.classList.toggle('open');
    });

    customOptionsItems.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            selectTrigger.querySelector('span').textContent = option.textContent.trim();
            realSelect.value = value;
            customOptions.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            customOptions.classList.remove('open');
        }
    });

    // // Obtener el valor seleccionado al hacer clic en un botón
    // document.getElementById('obtener-valor').addEventListener('click', () => {
    //     const selectedValue = realSelect.value;
    //     console.log("Valor seleccionado:", selectedValue);
    //     // Puedes hacer algo con el valor seleccionado aquí
    // });
});
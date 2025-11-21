const englishButton = document.getElementById('english-button');
const spanishButton = document.getElementById('spanish-button');
const setChangesButton = document.getElementById('set-changes-button');

const checkIconEnglish = document.querySelector('.english');
const checkIconSpanish = document.querySelector('.spanish');

const ChiliRed = '#E3170A';
const White = '#FFF';
const Xhantous = '#F7B32B';

let lang = null;

// Deshabilitar botón al inicio
setChangesButton.disabled = true;

// Reutilizable: pinta un botón como activo
function activateButton(button, icon) {
    button.style.backgroundColor = ChiliRed;
    button.style.color = White;

    icon.style.backgroundColor = White;
    icon.style.color = ChiliRed;
    icon.style.borderColor = ChiliRed;
}

// Reutilizable: resetea estilo del botón no seleccionado
function deactivateButton(button, icon) {
    button.style.backgroundColor = White;
    button.style.color = ChiliRed;

    icon.style.backgroundColor = White;
    icon.style.color = White;
    icon.style.borderColor = Xhantous;
}

// Manejar selección de idioma
function selectLang(language) {
    lang = language;

    if (language === 'en') {
        activateButton(englishButton, checkIconEnglish);
        deactivateButton(spanishButton, checkIconSpanish);
    } else {
        activateButton(spanishButton, checkIconSpanish);
        deactivateButton(englishButton, checkIconEnglish);
    }

    setChangesButton.disabled = false;
}

englishButton.addEventListener('click', () => selectLang('en'));
spanishButton.addEventListener('click', () => selectLang('es'));

setChangesButton.addEventListener('click', () => {
    localStorage.setItem('preferred_lang', lang);
    window.location.href = '/html/login.html';
});

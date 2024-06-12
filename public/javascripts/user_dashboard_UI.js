let veganButton = document.getElementById('vegan_button');
let dessertsButton = document.getElementById('desserts_button');
let drinksButton = document.getElementById('drinks_button');
let breakfastButton = document.getElementById('breakfast_button');

veganButton.addEventListener('click', function() {
    window.location.href = '/vegan_book';
});

dessertsButton.addEventListener('click', function() {
    window.location.href = '/desserts_book';
});

drinksButton.addEventListener('click', function() {
    window.location.href = '/drinks_book';
});

breakfastButton.addEventListener('click', function() {
    window.location.href = '/breakfast_book';
});
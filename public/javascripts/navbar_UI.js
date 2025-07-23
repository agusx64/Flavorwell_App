const homeButton = document.getElementById('start');
const savedButton = document.getElementById('saved');
const uploadButton = document.getElementById('add');
const profileButton = document.getElementById('profile');
const settingsButton = document.getElementById('settings');

homeButton.addEventListener('click', function() {

    window.location.href = '/html/user_dashboard.html';

});

savedButton.addEventListener('click', function() {

    window.location.href = '/html/saved.html';

});

uploadButton.addEventListener('click', function() {

    window.location.href = '/html/recipe_register.html';

});

profileButton.addEventListener('click', function() {

    window.location.href = '/html/user_profile.html';

});

settingsButton.addEventListener('click', function() {

    window.location.href = '/html/settings.html';

});
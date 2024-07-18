//NAVBAR buttons-------------------------------------------------------------------------------------------------------
let startButton = document.getElementById('start');
let recipesButton = document.getElementById('recipes');
let addButton = document.getElementById('add');
let profileButton = document.getElementById('profile');
let settingsButton = document.getElementById('settings');

startButton.addEventListener('click', function() {window.location.href = '/start';});
recipesButton.addEventListener('click', function(){window.location.href ='/ai'});
addButton.addEventListener('click', function(){ window.location.href = '/add';});
profileButton.addEventListener('click', function(){ window.location.href = '/profile';});
settingsButton.addEventListener('click', function(){window.location.href = '/settings'});
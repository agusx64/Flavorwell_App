var express = require('express');
var router = express.Router()

// Ruta para la pantalla de carga
router.get('/', function(req, res) {

    res.render('index');

});

router.get('/sign_up', function(req, res){

    res.render('sign_up');

})


router.get('/started', function(req, res) {

    res.render('started');

});

router.get('/login', function(req, res) {

    res.render('login');

});

router.get('/recipe_register', function(req, res) {

    res.render('recipe_register');

});

//---------------------Gorup of gets from user dashboard ----------------------
router.get('/vegan_book', function (req, res) {

    res.render('vegan_book');

});

router.get('/desserts_book', function (req, res) {

    res.render('desserts_book');

});

router.get('/strong_book', function (req, res) {

    res.render('strong_book');

});

router.get('/breakfast_book', function (req, res) {

    res.render('breakfast_book');

});

router.get('/start', function (req, res) {

    res.render('user_dashboard');

});

router.get('/ai', function (req, res) {

    res.render('recipe_generator');

});

router.get('/add', function (req, res) {

    res.render('recipe_register');

});

router.get('/profile', function (req, res) {

    res.render('user_profile');

});

router.get('/settings', function (req, res) {

    res.render('settings');

});

//-----------------------------------------------------------------------------

//------------------------Random recipe selector(user_dashboard)---------------



module.exports = router;
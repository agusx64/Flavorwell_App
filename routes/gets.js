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

});

router.get('/desserts_book', function (req, res) {

});

router.get('/drinks_book', function (req, res) {

});

router.get('/breakfast_book', function (req, res) {
    
});

//-----------------------------------------------------------------------------

module.exports = router;
var express = require('express');
var router = express.Router();

// Ruta para la otra página
router.get('/started', function(req, res) {
    res.render('started');
});

router.get('/login', function(req, res) {
    res.render('login');
});

module.exports = router;
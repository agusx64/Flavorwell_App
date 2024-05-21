var express = require('express');
var router = express.Router();

// Ruta para la otra página
router.get('/', function(req, res) {
    res.render('started');
});

module.exports = router;
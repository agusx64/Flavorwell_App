var express = require('express');
var router = express.Router();

// Ruta para la pantalla de carga
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
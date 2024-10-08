var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var router = express.Router()

// Database configuration
const connectionConfig = {

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

};

let connection;

async function connectToDatabase() {

    try {

        connection = await mysql.createConnection(connectionConfig);
        console.log("Connected to database!");

    } catch (err) {

        console.error("Error connecting to database:", err);

    }
}

connectToDatabase();


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

router.get('/select', function (req, res) {

    res.render('select_vegetables');

});

router.get('/select_protein', function (req, res) {

    res.render('select_protein');

});

router.get('/select_garrison', function (req, res) {

    res.render('select_garrison');

});

router.get('/select_extra', function (req, res){

    res.render('select_extra');

});

router.get('/render_success', function(req, res){

    res.render('recipe_register_sucess');

});

//------------------------------------------------------------------------------

//------------------------New recipes selector (user_dashboard)-----------------
router.get('/new_food', async function (req, res) {

    const queries = [

        `(SELECT name, img_path FROM breakfast ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT name, img_path FROM desserts ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT name, img_path FROM strong_dish ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT name, img_path FROM vegan ORDER BY created_at DESC LIMIT 1);`
        
    ];

    try {

        let finalResults = [];
        for (const query of queries) {

            const [results] = await connection.execute(query);
            console.log(results);
            finalResults.push(results);

        }

        res.json(finalResults);

    } catch (error) {

        console.error('Error executing queries:', error);
        res.status(500).send('Error executing recent rows');

    }

});

//------------------------Random recipe selector (user_dashboard)---------------
router.get('/day_food', async function (req, res) {

    const queries = [
        
        'SELECT MIN(id) AS min_ID_breakfast, MAX(id) AS max_ID_breakfast INTO @min_ID_breakfast, @max_ID_breakfast FROM breakfast;',
        'SELECT MIN(id) AS min_ID_desserts, MAX(id) AS max_ID_desserts INTO @min_ID_desserts, @max_ID_desserts FROM desserts;',
        'SELECT MIN(id) AS min_ID_strong_dish, MAX(id) AS max_ID_strong_dish INTO @min_ID_strong_dish, @max_ID_strong_dish FROM strong_dish;',
        'SELECT MIN(id) AS min_ID_vegan, MAX(id) AS max_ID_vegan INTO @min_ID_vegan, @max_ID_vegan FROM vegan;',
        'SET @random_ID_breakfast = FLOOR(RAND() * (@max_ID_breakfast - @min_ID_breakfast + 1)) + @min_ID_breakfast;',
        'SET @random_ID_desserts = FLOOR(RAND() * (@max_ID_desserts - @min_ID_desserts + 1)) + @min_ID_desserts;',
        'SET @random_ID_strong_dish = FLOOR(RAND() * (@max_ID_strong_dish - @min_ID_strong_dish + 1)) + @min_ID_strong_dish;',
        'SET @random_ID_vegan = FLOOR(RAND() * (@max_ID_vegan - @min_ID_vegan + 1)) + @min_ID_vegan;',
        `(
            SELECT * FROM breakfast WHERE id = @random_ID_breakfast LIMIT 1
        )
        UNION ALL
        (
            SELECT * FROM desserts WHERE id = @random_ID_desserts LIMIT 1
        )
        UNION ALL
        (
            SELECT * FROM strong_dish WHERE id = @random_ID_strong_dish LIMIT 1
        )
        UNION ALL
        (
            SELECT * FROM vegan WHERE id = @random_ID_vegan LIMIT 1
        );`
    ];

    try {
        let finalResults = [];
        for (const query of queries) {
            const [results] = await connection.execute(query);
            console.log(results);
            finalResults.push(results);
        }

        res.json(finalResults);
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('Error executing random rows');
    }
});

//------------------------Send JSON to recipe viewer-----------------------------
router.get('/recipe_viewer', (req, res) => {

    let data = req.query.data;

    if (data) {

        try {

            let parsedData = JSON.parse(decodeURIComponent(data));
            res.render('recipe_viewer', { data: parsedData });

        } catch (error) {

            console.error('Error parsing data:', error);
            res.status(400).send('Invalid JSON data');

        }

    } else {

        res.status(400).send('No data received');

    }

});

router.get('/breakfast_list', async function(req, res) {
    try {
        const DBquery = 'SELECT * FROM breakfast';
        const [rows, fields] = await connection.execute(DBquery);
        res.json(rows);
    } catch (err) {
        console.error('Error en la consulta a la base de datos:', err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

router.get('/desserts_list', async function(req, res) {
    try {
        const DBquery = 'SELECT * FROM desserts';   
        const [rows, fields] = await connection.execute(DBquery);
        res.json(rows);
    } catch (err) {
        console.error('Error en la consulta a la base de datos:', err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

router.get('/strong_dish_list', async function(req, res) {
    try {
        const DBquery = 'SELECT * FROM strong_dish';   
        const [rows, fields] = await connection.execute(DBquery);
        res.json(rows);
    } catch (err) {
        console.error('Error en la consulta a la base de datos:', err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

router.get('/vegan_list', async function(req, res) {
    try {
        const DBquery = 'SELECT * FROM vegan';   
        const [rows, fields] = await connection.execute(DBquery);
        res.json(rows);
    } catch (err) {
        console.error('Error en la consulta a la base de datos:', err);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

module.exports = router;
var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var router = express.Router()

// Conexión de tipo Pool para multiples conexiones
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10,
    queueLimit: 0
});

router.get('/category/vegan/list', async (req, res) =>{

    const query = 'SELECT id, name, img_path, author FROM vegan WHERE verified = 1;';

    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/category/strong_dish/list', async (req, res) =>{

    const query = 'SELECT id, name, img_path, author FROM strong_dish WHERE verified = 1;';

    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/category/desserts/list', async (req, res) =>{

    const query = 'SELECT id, name, img_path, author FROM desserts WHERE verified = 1;';

    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/category/breakfast/list', async (req, res) =>{

    const query = 'SELECT id, name, img_path, author FROM breakfast WHERE verified = 1;';

    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/api/ingredients/search', async (req, res) => {

    // Obtener query proveniente del frontend
    const q = req.query.q;

    // Verificación de entrada vacia u objeto JSON vacio
    if (!q || q.trim() === '') {

        // Si hay una query vacia se devuelve un JSON vacio
        return res.json([]);

    }

    try {

        // Conexón SQL
        const [results] = await connection.query(

            // Consulta SQL para busqueda de coincidencias
            `SELECT * FROM ingredients_list WHERE name LIKE ? LIMIT 10`, 
            [`%${q}%`]

        );

        // Envio de coincidencias al frontend
        res.json(results);

    // Intercepción de errores
    } catch (error) {

        console.error(error);

    }

});


module.exports = router;
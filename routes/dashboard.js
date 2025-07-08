var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var cron = require('node-cron');
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
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

// Selector de recetas mas recientes en la base de datos
router.get('/new_food', async function (req, res) {

    // Consulta SQL
    const queries = [

        // Union de resultados de busqueda
        `(SELECT id, name, img_path FROM breakfast ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT id, name, img_path FROM desserts ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT id, name, img_path FROM strong_dish ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT id, name, img_path FROM vegan ORDER BY created_at DESC LIMIT 1);`
        
    ];

    try {

        // Creación de array para guardado de resultados
        let finalResults = [];

        // Descomposición de consultas
        for (const query of queries) {

            // Ejecución de consultas
            const [results] = await connection.execute(query);

            // Guardado de resultados en el array
            finalResults.push(results);

        }

        // Envio de objeto JSON con los resultados
        res.json(finalResults);

    // Intercepción de errores
    } catch (error) {

        console.error('Error executing queries:', error);
        res.status(500).send('Error executing recent rows');

    }

});

// Selector de recetas random para area de recomendaciones
router.get('/day_food', async function (req, res) {

    // Consulta SQL compuesta
    const query = `
        (
        SELECT id, name, img_path FROM breakfast ORDER BY RAND() LIMIT 1
        )
        UNION ALL
        (
            SELECT id, name, img_path FROM desserts ORDER BY RAND() LIMIT 1
        )
        UNION ALL
        (
            SELECT id, name, img_path FROM strong_dish ORDER BY RAND() LIMIT 1
        )
        UNION ALL
        (
            SELECT id, name, img_path FROM vegan ORDER BY RAND() LIMIT 1
        );

    `;

    try {

        // Ejecucion monolineal de consulta SQL
        const [results] = await connection.query(query);

        // Envio de objeto JSON al servidor
        res.json(results);

    // Intercepcion de errores
    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).send('Error executing random rows');

    }

});

// Buscador de recetas para insercion en el visor de recetas
router.get('/recipe_viewer', async (req, res) => {

    // Recolección de datos de la URL
    const id = parseInt(req.query.id);
    const table = req.query.table;

    // Array delimitador de nombres de tablas
    const allowedTables = ['breakfast', 'desserts', 'vegan', 'strong_dish']

    // Comprobación de coicidencia cliente - servidor
    if (!id || !allowedTables.includes(table)) {

        // Envio de estatus de parametros invalidos
        return res.status(400).json({ success: false, message: 'Invalid parameters.' });

    }

    try {


        // Consulta SQL para busqueda de receta
        const query = `
            SELECT * FROM ${table} WHERE id = ?;
        `;

        // Ejecución de consulta de forma asicrona, para metros de la consulta: Nombre de tabla e id.
        const [results] = await connection.query(query, [id]);

        // Verificación de existencia o coincidencia de resultados
        if (results.length === 0) {

            // Mensaje de estatus 'Receta no encontrada'
            return res.status(404).json({ success: false, message: 'Recipe not found.' });

        }
        console.log(results);

        // return res.status(200).json({ success: true, data: results[0], message: 'Recipe data found.'});
        res.render('recipe_viewer', { data: results[0] });

    // Intercepción de errores
    } catch (error) {

        console.error('Error retrieving recipe:', error);
        res.status(500).send('Internal server error');

    }

});

//Obtener receta selecionada mediante el ID
router.post('/get_recipe_by_id', async (req, res) => {

    // Extracción de datos del JSON
    const { id, table } = req.body;

    try {

        // Consulta SQL para busqueda de receta
        let query = `
            SELECT * FROM ${table} WHERE id = ?;
        `;

        // Ejecucion y guardado de resultados en array 'results', parametros: Tabla y id
        const [results] = await connection.query(query, [id]);

        // Validación de existencia de resultados
        if (results.length === 0){

            // Envio de estatus invalido: 'Receta no encontrada'
            return res.status(404).json({ success: false, message: 'Recipe not found' });

        }

        // Envió de resultados al cliente
        res.json({ success: true, message: 'Recipe found succesfully.', data: results[0]});

    // Intercepcion de errores
    } catch(error) {

        console.error('Database query error: ', error);
        res.status(500).json({ success: false, message: 'Error queryng the database.'});

    }

});

// Endpoint para el sistema de busqueda de user_dashboard
router.post('/search_recipes', async (req, res) => {

    const { query } = req.body;

    if (!query || typeof query !== 'string') {

        return res.status(400).json({ error: 'Invalid search query.' });

    }

    const sql = `

        SELECT id, name, img_path, 'breakfast' AS table_name FROM breakfast WHERE name LIKE ? 
        UNION ALL
        SELECT id, name, img_path, 'desserts' FROM desserts WHERE name LIKE ? 
        UNION ALL
        SELECT id, name, img_path, 'strong_dish' FROM strong_dish WHERE name LIKE ? 
        UNION ALL
        SELECT id, name, img_path, 'vegan' FROM vegan WHERE name LIKE ?
        LIMIT 10

    `;

    const values = Array(4).fill(`%${query}%`);

    try {

        const [results] = await connection.execute(sql, values);
        res.json(results);

    } catch (error) {

        console.error('Search error: ', error);
        res.status(500).json({ error: 'Database search failed' });

    }

});


module.exports = router;
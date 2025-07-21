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

// Selector de recetas mas recientes en la base de datos
router.get('/new_food', async function (req, res) {

    // Consulta SQL
    const queries = [

        // Union de resultados de busqueda
        `(SELECT id, name, img_path FROM breakfast WHERE verified = 1 ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT id, name, img_path FROM desserts WHERE verified = 1 ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT id, name, img_path FROM strong_dish WHERE verified = 1 ORDER BY created_at DESC LIMIT 1)
        UNION ALL
        (SELECT id, name, img_path FROM vegan WHERE verified = 1 ORDER BY created_at DESC LIMIT 1);`
        
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

    }

});

// Selector de recetas random para area de recomendaciones
router.get('/day_food', async function (req, res) {

    // Consulta SQL compuesta
    const query = `
        (
        SELECT id, name, img_path FROM breakfast WHERE verified = 1 ORDER BY RAND() LIMIT 1
        )
        UNION ALL
        (
            SELECT id, name, img_path FROM desserts WHERE verified = 1 ORDER BY RAND() LIMIT 1
        )
        UNION ALL
        (
            SELECT id, name, img_path FROM strong_dish WHERE verified = 1 ORDER BY RAND() LIMIT 1
        )
        UNION ALL
        (
            SELECT id, name, img_path FROM vegan WHERE verified = 1 ORDER BY RAND() LIMIT 1
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

// Endpoint para el sistema de busqueda de user_dashboard
router.post('/search_recipes', async (req, res) => {

    // Obtención de caracteres typeados dentro del input
    const { query } = req.body;

    // Filtrado de caracteres invalidos
    if (!query || typeof query !== 'string') {

        // Envio de estatus de consulta invalida
        return res.status(400).json({ error: 'Invalid search query.' });

    }

    // Consulta SQL (Union de 4 resultados provenientes de cada tabla)
    const sql = `

        SELECT id, name, img_path, 'breakfast' AS table_name FROM breakfast WHERE name LIKE ? AND verified = 1
        UNION ALL
        SELECT id, name, img_path, 'desserts' FROM desserts WHERE name LIKE ? AND verified = 1
        UNION ALL
        SELECT id, name, img_path, 'strong_dish' FROM strong_dish WHERE name LIKE ? AND verified = 1
        UNION ALL
        SELECT id, name, img_path, 'vegan' FROM vegan WHERE name LIKE ? AND verified = 1
        LIMIT 10

    `;

    // Integracion de texto typeado, en cada una de las entradas de la consulta SQL
    const values = Array(4).fill(`%${query}%`);

    try {

        // Ejecución de la consulta SQL con la query ingresada por el usuario
        const [results] = await connection.execute(sql, values);

        // Envio de las coincidencias a traves de un objeto JSON
        res.json(results);

    // Intercepcion de errores
    } catch (error) {

        // Depuración de errores y envio de status de error
        console.error('Search error: ', error);
        res.status(500).json({ error: 'Database search failed' });

    }

});


module.exports = router;
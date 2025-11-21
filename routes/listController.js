import express from 'express';
import mysql from 'mysql2/promise.js';
import dotenv from 'dotenv';
var router = express.Router()

// Inicailizacion de variables de entorno
dotenv.config();

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

    const query = `

        SELECT v.id, v.name, v.img_path, u.username AS author
        FROM vegan v
        JOIN users u ON v.author = u.id
        WHERE v.verified = 1;

    `;

    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/category/strong_dish/list', async (req, res) =>{

    const query = `

        SELECT s.id, s.name, s.img_path, u.username AS author
        FROM strong_dish s
        JOIN users u ON s.author = u.id
        WHERE s.verified = 1;

    `;
    
    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/category/desserts/list', async (req, res) =>{

    const query = `

        SELECT d.id, d.name, d.img_path, u.username AS author
        FROM desserts d
        JOIN users u ON d.author = u.id
        WHERE d.verified = 1;

    `;

    try {

        const [results] = await connection.query(query);

        res.json(results);

    } catch(error) {

        console.error(error);

    }

});

router.get('/category/breakfast/list', async (req, res) =>{

    const query = `

        SELECT b.id, b.name, b.img_path, u.username AS author
        FROM breakfast b
        JOIN users u ON b.author = u.id
        WHERE b.verified = 1;

    `;

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

    // Obtención del lenguaje preferido por el usuario
    const lang = req.query.lang || 'en';

    // Verificación de entrada vacia u objeto JSON vacio
    if (!q || q.trim() === '') {

        // Si hay una query vacia se devuelve un JSON vacio
        return res.json([]);

    }

    try {

        // Selección de columna dependiendo del idioma
        const nameColumn = lang === 'es' ? 'name_es' : 'name';

        // Selección y renombramiento de como name para enviar al frontend
        const query = `SELECT id, ${nameColumn} as name, src_reference FROM ingredients_list WHERE ${nameColumn} LIKE ? LIMIT 10`;

        // Conexón SQL
        const [results] = await connection.query( query, [`%${q}%`]);

        // Envio de coincidencias al frontend
        res.json(results);

    // Intercepción de errores
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error searching ingredients' });

    }

});


export default router;
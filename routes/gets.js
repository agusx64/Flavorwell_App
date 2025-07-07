var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var cron = require('node-cron');
var router = express.Router()


// Crear un pool de conexiones
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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
var express = require('express');
var router = express.Router()
var mysql = require('mysql2');
require('dotenv').config();
var router = express.Router();

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
        console.log("Connected! from API");

    } catch (err) {

        console.error("Error connecting to database:", err);

    }
}

connectToDatabase();


module.exports = router;
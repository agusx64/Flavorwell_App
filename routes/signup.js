var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//DB SQL Connection
let conection = mysql.createConnection({

    host: "localhost",
    database: "flavorwell_db",
    user: "root",
    password: "",

});
conection.connect(function(err) {

    if (err) throw err;
    console.log("Connected! to database");

});

router.post('/register_data', function(req, res) {

    const register_data = req.body
    console.log(register_data);

    getUsername = register_data.username_input;
    getMailAddress = register_data.username_mail;
    getPassword = register_data.username_password;

    let DBQuery = "INSERT INTO users (username, email, password) VALUES (?,?,?)";

    conection.query(DBQuery, [getUsername, getMailAddress, getPassword], function (err, result) {

        if (err) {

            throw err;

        } else {

            console.log(result);
            res.render('success');

        }

    });

});

module.exports = router;
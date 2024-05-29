var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//Lateinit variables
let username;


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

router.post('/user_data', function(req, res){

    const user_data = req.body;
    console.log(user_data);

    let getMail = user_data.username_input;
    let getPassword = user_data.username_password;

    let DBQuery = "SELECT * FROM users WHERE email = ? AND password = ? ";

    conection.query(DBQuery, [getMail, getPassword], function (err, result) {

        try {

            if(result.length > 0){

                if(result[0].email == "admin" && result[0].password == "admin") {

                    res.render('admin_dashboard');

                } else if (result[0].email != "admin" && result[0].password != "admin") {

                    username = result[0].username;
                    console.log(username);
                    res.render('user_dashboard');

                }

            } else {

                res.render('invalid_credentials');

            }

        } catch (err){

            res.send("Internal server error: " + err.message);

        }

    });

});

router.get('/sign_up', function(req, res){

    res.render('sign_up');

})

module.exports = router;
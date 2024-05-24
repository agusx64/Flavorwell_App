var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//Lateinit variables
let username;

// Ruta para la pantalla de carga
router.post('/user_data', function(req, res) {

    const user_data = req.body;
    console.log(user_data);

    let getMail = user_data.username_input;
    let getPassword = user_data.username_password;

    let DBQuery = "SELECT username, email, password FROM users WHERE email = '" + getMail + "' AND username_password = '" + getPassword + "' ";
    
    connection.query(DBQuery, function (err, result) {

        if (err) {

            throw err;

        } else {

            try {

                if (getMail, getPassword != "" || null){

                    if (result.length > 0) {

                        username = result[0].username;
                        if (result[0].email == "admin" && result[0].password == "admin"){

                            res.redirect('/admin_dashboard');

                        } else {

                            res.redirect('/user_dashboard', { username });
                            console.log("Welcome '"+username+'", to user dashboard');

                        }

                    } else {

                        console.log('Invalid username or password, please try again');

                    }

                } else {

                    console.log('Some data inputs are void, please try again');

                }

            } catch (err){

                console.log(err);

            }
            
        }

    })

    // res.redirect('/signup');
});

module.exports = router;
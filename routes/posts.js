var mysql = require('mysql');
var express = require('express');
var multer = require('multer');
var fs = require('fs');
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

//----------------Multer configuration----------------------------

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const dir = 'uploads/recipes';

        //Make directory if it doesn't exist
        fs.mkdirSync(dir, {recursive: true});
        cb(null, dir);

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname));

    }

});

const upload = multer({storage: storage});

//----------------POST for authentication-------------------------
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
//----------------------------------------------------------------

//--------------------------POST for registration-----------------
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

//--------------------------Recipe register POST -----------------
router.post('/recipe_register', upload.single('image'), function(req, res) {

    const recipe_data = req.body;
    console.log(recipe_data);

    //ID about element type submint
    let imgRecipe = recipe_data.img_recipe;
    //Replace the inverted slash for '/'
    const imagePath = `/${image.path.replace(/\\/g, '/')}`;

    //Save the information in the DB
    let DBQuery;

});


module.exports = router;
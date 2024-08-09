var mysql = require('mysql');
var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var router = express.Router();

//Lateinit variables
let username;

let vegetable_ingredient_1;
let vegetable_ingredient_2;
let vegetable_ingredient_3;

let protein_ingredient_1;
let protein_ingredient_2;
let protein_ingredient_3;

let garrison_ingredient_1;
let garrison_ingredient_2;
let garrison_ingredient_3;

let extra_ingredient_1;
let extra_ingredient_2;
let extra_ingredient_3;


//DB SQL Connection
let conection = mysql.createConnection({

    host: "localhost",
    database: "flavorwell_db",
    user: "root",
    password: "",

});
conection.connect(function(err) {

    if (err) throw err;
    console.log("Connected! to database from post module");

});

//----------------Multer configuration----------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/recipes';
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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
router.post('/up_recipe', upload.single('recipe_image'), function(req, res) {


    const { category, name_recipe, energy, time, recipe_description, recipe_instructions, author } = req.body;
    const imgRoute = req.file;
    
    if (!imgRoute) {

        return res.status(400).send({ error: "No se ha subido ninguna imagen." });

    }

    const imagePath = `/uploads/recipes/${imgRoute.filename}`;

    let tableName;

    switch (category.toLowerCase()) {

        case 'breakfast':

            tableName = 'breakfast';
            break;

        case 'desserts':

            tableName = 'desserts';
            break;

        case 'dish':

            tableName = 'strong_dish';
            break;

        case 'vegan':

            tableName = 'vegan';
            break;

        default:
            return res.status(400).send({ error: "Categoría no válida." });
    }

    const DBQuery = `INSERT INTO ${tableName} (name, energy, time_make, description, instruction, img_path, author) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conection.query(DBQuery, [name_recipe, energy, time, recipe_description, recipe_instructions, imagePath, author], function(err, result) {

        if (err) {

            return res.status(500).send({ error: "Error al insertar la receta en la base de datos." });

        } else {

            return res.status(200).send({ success: "Receta registrada con éxito." });
            
        }
    });
});

//--------------------------Dynamic query URI encripter --------------
// Ruta para manejar la solicitud POST
router.post('/sended_text', async (req, res) => {

    const dish = req.body;
    let nameQuery = dish.dish;
    console.log('Received dish name:', nameQuery);

    try {

        let recipeSearcher = `
        
            (SELECT * FROM breakfast WHERE name = ?)
            UNION ALL 
            (SELECT * FROM desserts WHERE name = ?)
            UNION ALL
            (SELECT * FROM vegan WHERE name = ?)
            UNION ALL
            (SELECT * FROM strong_dish WHERE name = ?)

        `
        conection.query(recipeSearcher, [nameQuery, nameQuery, nameQuery, nameQuery], function(err, results) {

            if (err) {

                throw err;

            }
            else {

                res.json(results);

            }
        })

    } catch (error) {

        console.error('Database query error:', error);
        res.status(500).send('Error querying the database');

    }
    
});

//-------------------------Ingredients recolector ----------------------------------------
router.post('/load_vegetables', function(req, res) {

    const vegetables_ingredients = req.body;

    vegetable_ingredient_1 = vegetables_ingredients[0]
    .toLowerCase()
    .replace(/\s+/g, '_');
    
    vegetable_ingredient_2 = vegetables_ingredients[1]
    .toLowerCase()
    .replace(/\s+/g, '_');

    vegetable_ingredient_3 = vegetables_ingredients[2]
    .toLowerCase()
    .replace(/\s+/g, '_');

});

router.post('/load_protein', function(req, res){

    const protein_ingredients = req.body;

    protein_ingredient_1 = protein_ingredients[0]
    .toLowerCase()
    .replace(/\s+/g, '_');
    
    protein_ingredient_2 = protein_ingredients[1]
    .toLowerCase()
    .replace(/\s+/g, '_');

    protein_ingredient_3 = protein_ingredients[2]
    .toLowerCase()
    .replace(/\s+/g, '_');

});

router.post('/load_garrison', function(req, res){

    const garrison_ingredients = req.body;

    garrison_ingredient_1 = garrison_ingredients[0]
    .toLowerCase()
    .replace(/\s+/g, '_');
    
    garrison_ingredient_2 = garrison_ingredients[1]
    .toLowerCase()
    .replace(/\s+/g, '_');

    garrison_ingredient_3 = garrison_ingredients[2]
    .toLowerCase()
    .replace(/\s+/g, '_');
    

});

router.post('/load_extra', function(req, res){

    const extra_ingredients = req.body;

    extra_ingredient_1 = extra_ingredients[0]
    .toLowerCase()
    .replace(/\s+/g, '_');
    
    extra_ingredient_2 = extra_ingredients[1]
    .toLowerCase()
    .replace(/\s+/g, '_');
    
    extra_ingredient_3 = extra_ingredients[2]
    .toLowerCase()
    .replace(/\s+/g, '_');

});

router.get('/send_ingredients', function(req, res) {

    let ingredients_list = [];
    
    ingredients_list.push(vegetable_ingredient_1);
    ingredients_list.push(vegetable_ingredient_2);
    ingredients_list.push(vegetable_ingredient_3);

    ingredients_list.push(protein_ingredient_1);
    ingredients_list.push(protein_ingredient_2);
    ingredients_list.push(protein_ingredient_3);

    ingredients_list.push(garrison_ingredient_1);
    ingredients_list.push(garrison_ingredient_2);
    ingredients_list.push(garrison_ingredient_3);

    ingredients_list.push(extra_ingredient_1);
    ingredients_list.push(extra_ingredient_2);
    ingredients_list.push(extra_ingredient_3);

    let ingredients_query = `(SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)
                            UNION ALL
                            (SELECT * FROM ingredients_list WHERE name = ?)`
    
    conection.query(ingredients_query, ingredients_list, function(err, results) {

        if (err) {

            throw err

        } else {

            res.json(results);
            console.log(results);

        }

    });

});


module.exports = router;
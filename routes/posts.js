var mysql = require('mysql2');
var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
const e = require('express');
const axios = require('axios');
require('dotenv').config();
const OpenAI = require('openai');
var router = express.Router();

//Lateinit variables
let username;

let vegetable_ingredient_1;
let protein_ingredient_1;
let garrison_ingredient_1;
let extra_ingredient_1;

let post_table_vegetable;
let post_table_protein;
let post_table_garrison;
let post_table_extra;
let tableName;
let translatePrompt;

//DB SQL Connection
let conection = mysql.createConnection({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});
conection.connect(function(err) {

    if (err) throw err;
    console.log("Connected! to database from post module");

});

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

//-------------------API + POST endpoints------------------------
// router.post('/send_prompt', upload.none(), function (req, res) {

//     const { category, name_recipe, energy, time, author } = req.body;
//     let translatePrompt;

//     // Traducción de la categoría a un formato adecuado para el prompt
//     switch (category) {
//         case 'Breakfast':
//             translatePrompt = "desayuno";
//             break;
//         case 'Desserts':
//             translatePrompt = "postre";
//             break;
//         case 'Vegan':
//             translatePrompt = "vegana";
//             break;
//         case 'Strong_dish':
//             translatePrompt = "plato fuerte";
//             break;
//         default:
//             translatePrompt = "de cualquier categoria";
//             break;
//     }

//     const generate_img_prompt = `Genera una imagen de un ${name_recipe}`;
//     const recipe_prompt = `Genera una receta de ${name_recipe} que sea ${translatePrompt}, que tenga un aproximado de ${energy} calorías, y que se pueda preparar en un tiempo de ${time}. Dame los pasos para poder prepararla.`;

//     console.log(recipe_prompt);
//     console.log(generate_img_prompt);

//     // Llama a las funciones con el mecanismo de reintentos
//     retryRequest(() => getRecipeInstructions(recipe_prompt));
//     retryRequest(() => generateImageRecipe(generate_img_prompt));

//     // Función para realizar solicitudes con reintentos
//     async function retryRequest(fn, retries = 2) {

//         for (let i = 0; i < retries; i++) {

//             try {

//                 await fn();
//                 return;  // Si la solicitud tiene éxito, salimos de la función

//             } catch (error) {

//                 const statusCode = error.response ? error.response.status : null;
                
//                 if (statusCode === 429) {

//                     // Manejo específico para el código 429: Too Many Requests
//                     const retryAfter = error.response.headers['retry-after'] 
//                         ? parseInt(error.response.headers['retry-after']) * 1000 
//                         : (i + 1) * 1000;  // Si no se proporciona "retry-after", espera más tiempo entre intentos
//                     console.error(`Error 429: Too many requests. Retrying in ${retryAfter} ms...`);
//                     await new Promise(resolve => setTimeout(resolve, retryAfter));

//                 } else {

//                     console.error(`Error en el intento ${i + 1}:`, error.message);

//                 }

//                 if (i === retries - 1) {

//                     throw error;  // Si es el último intento, volvemos a lanzar el error

//                 }

//             }

//         }

//     }

//     // Función para obtener las instrucciones de la receta
//     async function getRecipeInstructions(userMessage) {

//         const maxAttempts = 1;
//         let attempt = 0;
    
//         while (attempt < maxAttempts) {

//             attempt++;

//             try {

//                 const response = await axios.post('https://api.openai.com/v1/chat/completions', {

//                     model: 'gpt-3.5-turbo',
//                     messages: [
//                         {

//                             role: 'system',
//                             content: `Responde en formato JSON con las propiedades "name_recipe", "energy", "time_make", "description", "instruction".`

//                         },{ 
//                             role: 'user', 
//                             content: userMessage 
//                         }
//                     ],
//                 }, {

//                     headers: {

//                         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                         'Content-Type': 'application/json'

//                     }

//                 });
    
//                 console.log(response.data.choices[0].message.content);
//                 return;

//             } catch (error) {

//                 console.error(`Error en el intento ${attempt}: ${error.message}`);

//                 if (attempt >= maxAttempts) {

//                     throw new Error('Error al obtener instrucciones de receta después de varios intentos');

//                 }
//                 await new Promise(resolve => setTimeout(resolve, 1000));

//             }

//         }

//     }

//     // Función para generar la imagen de la receta
//     async function generateImageRecipe(prompt) {

//         const maxAttempts = 1;
//         let attempt = 0;
    
//         while (attempt < maxAttempts) {

//             attempt++;
//             try {

//                 const response = await axios.post('https://api.openai.com/v1/images/generations', {
//                     prompt: prompt,
//                     n: 1,
//                     size: '1024x1024'

//                 }, {

//                     headers: {

//                         'authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                         'content-type': 'application/json'

//                     }

//                 });
    
//                 console.log(response.data.data[0].url);
//                 return;

//             } catch (error) {

//                 console.error(`Error en el intento ${attempt}: ${error.message}`);

//                 if (attempt >= maxAttempts) {

//                     throw new Error('Error al generar imagen de receta después de varios intentos');

//                 }
//                 await new Promise(resolve => setTimeout(resolve, 1000));

//             }

//         }

//     }
    
// });

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

//--------------------------POST recipe generator + API --------------------------------
// router.post('/send_prompt', upload.none(), async (req, res) => {

//     const { category, name_recipe, energy, time, author } = req.body;
//     let translatePrompt;

//     // Traducción de la categoría a un formato adecuado para el prompt
//     switch (category) {
//         case 'Breakfast':
//             translatePrompt = "desayuno";
//             break;
//         case 'Desserts':
//             translatePrompt = "postre";
//             break;
//         case 'Vegan':
//             translatePrompt = "vegana";
//             break;
//         case 'Strong_dish':
//             translatePrompt = "plato fuerte";
//             break;
//         default:
//             translatePrompt = "de cualquier categoria";
//             break;
//     }
//     const promptSystem = `Responde en formato JSON con las propiedades "name_recipe", "energy", "time_make", "description", "instruction".`
//     const generate_img_prompt = `Genera una imagen de un ${name_recipe}`;
//     const recipe_prompt = `Genera una receta de ${name_recipe} que sea ${translatePrompt}, que tenga un aproximado de ${energy} calorías, y que se pueda preparar en un tiempo de ${time}. Dame los pasos para poder prepararla.`;

//     console.log(recipe_prompt);
//     console.log(generate_img_prompt);
//     console.log(promptSystem);

    

// });


//--------------------------Recipe register POST -----------------
router.post('/up_recipe', upload.single('recipe_image'), function(req, res) {


    const { category, name_recipe, energy, time, recipe_description, recipe_instructions, author } = req.body;
    const imgRoute = req.file;
    
    if (!imgRoute) {

        return res.status(400).send({ error: "No se ha subido ninguna imagen." });

    }

    const imagePath = `/uploads/recipes/${imgRoute.filename}`;

    switch (category.toLowerCase()) {

        case 'breakfast':

            tableName = 'breakfast';
            post_table_vegetable = 'breakfast';
            post_table_protein = 'breakfast';
            post_table_garrison = 'breakfast';
            post_table_extra = 'breakfast';
            break;

        case 'desserts':

            tableName = 'desserts';
            post_table_vegetable = 'desserts';
            post_table_protein = 'desserts';
            post_table_garrison = 'desserts';
            post_table_extra = 'desserts';
            break;

        case 'dish':

            tableName = 'strong_dish';
            post_table_vegetable  = 'strong_dish'
            post_table_protein = 'strong_dish'
            post_table_garrison = 'strong_dish'
            post_table_extra = 'strong_dish'
            break;

        case 'vegan':

            tableName = 'vegan';
            post_table_vegetable = 'vegan';
            post_table_protein = 'vegan';
            post_table_garrison = 'vegan';
            post_table_extra = 'vegan';
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


//--------------------------UPDATE profile image------------------------
router.post('/update_profile', upload.single('image'), function(req, res) {

    const imgRouteProfile = req.file;

    console.log(imgRouteProfile);

    if (!imgRouteProfile) {

        return res.status(400).send({ error: "No se ha subido ninguna imagen." });

    }

    const imagePath = `/uploads/recipes/${imgRouteProfile.filename}`;
    console.log(imagePath);

    const DBQuery = `
        UPDATE users
        JOIN (
            SELECT username
            FROM users
            WHERE username = ?
            LIMIT 1
        ) AS subquery ON users.username = subquery.username
        SET users.img_profile_path = ?
        WHERE users.username = ?;
    `;

    conection.query(DBQuery, [username, imagePath, username], function(err, result) {

        if (err) {

            console.error('Error updating profile:', err);
            return res.status(500).send({ error: "Error al actualizar el perfil." });

        } else {

            return res.status(200).send({ success: "Tabla users actualizada con éxito." });

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
// Cargar vegetales
router.post('/load_vegetables', function(req, res) {
    const vegetables_ingredients = req.body;

    let vegetable_ingredient_1 = vegetables_ingredients[0]
        .toLowerCase()
        .replace(/\s+/g, '_');

    let DBquery = `
        UPDATE ${post_table_vegetable}
        SET vegan_ingredient = ?
        WHERE id = (
            SELECT id FROM (
                SELECT id
                FROM ${post_table_vegetable}
                ORDER BY created_at DESC
                LIMIT 1
            ) AS temp
        );
    `;

    conection.query(DBquery, [vegetable_ingredient_1], function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.status(200).send({ success: true });
        }
    });
});

// Cargar proteínas
router.post('/load_protein', function(req, res){
    const protein_ingredients = req.body;

    let protein_ingredient_1 = protein_ingredients[0]
        .toLowerCase()
        .replace(/\s+/g, '_');

    let DBquery = `
        UPDATE ${post_table_protein}
        SET protein_ingredient = ?
        WHERE id = (
            SELECT id FROM (
                SELECT id
                FROM ${post_table_protein}
                ORDER BY created_at DESC
                LIMIT 1
            ) AS temp
        );
    `;

    conection.query(DBquery, [protein_ingredient_1], function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.status(200).send({ success: true });
        }
    });
});

router.post('/load_garrison', function(req, res){
    const garrison_ingredients = req.body;

    let garrison_ingredient_1 = garrison_ingredients[0]
        .toLowerCase()
        .replace(/\s+/g, '_');

    let DBquery = `
        UPDATE ${post_table_garrison}
        SET garrison_ingredient = ?
        WHERE id = (
            SELECT id FROM (
                SELECT id
                FROM ${post_table_garrison}
                ORDER BY created_at DESC
                LIMIT 1
            ) AS temp
        );
    `;

    conection.query(DBquery, [garrison_ingredient_1], function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.status(200).send({ success: true });
        }
    });
});

// Cargar ingredientes extra
router.post('/load_extra', function(req, res){
    const extra_ingredients = req.body;

    let extra_ingredient_1 = extra_ingredients[0]
        .toLowerCase()
        .replace(/\s+/g, '_');

    let DBquery = `
        UPDATE ${post_table_extra}
        SET extra_ingredient = ?
        WHERE id = (
            SELECT id FROM (
                SELECT id
                FROM ${post_table_extra}
                ORDER BY created_at DESC
                LIMIT 1
            ) AS temp
        );
    `;

    conection.query(DBquery, [extra_ingredient_1], function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.status(200).send({ success: true });
        }
    });
});


router.post('/ingredient_list', function(req, res) {

    const jSON_Ingredients = req.body;
    
    let vegan_Ingredient = jSON_Ingredients.vegan_ingredient;
    let protein_Ingredient = jSON_Ingredients.protein_ingredient;
    let garrison_Ingredient = jSON_Ingredients.garrison_ingredient;
    let extra_Ingredient = jSON_Ingredients.extra_ingredient;

    let DBQuery = ` (SELECT * FROM ingredients_list WHERE name = ?)
                    UNION ALL
                    (SELECT * FROM ingredients_list WHERE name = ?)
                    UNION ALL
                    (SELECT * FROM ingredients_list WHERE name = ?)
                    UNION ALL
                    (SELECT * FROM ingredients_list WHERE name = ?)`;
    
    conection.query(DBQuery, [vegan_Ingredient, protein_Ingredient, garrison_Ingredient, extra_Ingredient], function(err, results) {

        if (err) {

            throw err;

        } else {

            console.log(results);
            res.json(results);

        }

    })

});

router.get('/username_information', function(req, res){

    DBQuery = 'SELECT email,username,created_at,img_profile_path FROM users WHERE username = ?;'

    let username_query = username

    conection.query(DBQuery, [username_query], function(err, results){

        if(err){

            throw err;

        } else {

            console.log(results);
            res.json(results);

        }

    });

})

module.exports = router;
var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var cron = require('node-cron');
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
var router = express.Router()

// Configuración del multer
const storage = multer.memoryStorage();
const upload = multer({

    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB

});

// Autenticación al servicio de Cloudinary
cloudinary.config({

    // Variables de entorno de cloudinary
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});



// Conexión de tipo Pool para multiples conexiones
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

// Middleware para JWT (Función para auntenticar a traves de JWT)
const authenticateToken = (req, res, next) => {
    
    // Extracción del encabezado 'Authorization' de solicitud HTTP proveniente del formato 'Bearer <token>'
    const authHeader = req.headers['authorization'];

    // Verificacion y estraccion del auth token de la cadena de caracteres encriptada
    const token = authHeader && authHeader.split(' ')[1];

    // Verificación de la existencia de un token proveniente del cliente en caso de que no exista devolvera 'Unauthorized'
    if (!token) return res.sendStatus(401);

    // Validacion del token extraido a traves de firma y decodificacion de email y password
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        // Si los parametros son invalidos se devolvera 'Forbidden'
        if (err) return res.sendStatus(403);

        // Agregar informacion decodificada el objeto 'req', para que sea accesible a otras funciones del backend
        req.user = user;

        // Si todo es correcto se pasa el control a otra ruta o middleware
        next();

    });

};

// Endpoint para el registro de usuarios nuevos
router.post('/register_user', async function(req, res) {

    const register_data = req.body
    // console.log(register_data);

    const { username, mail, pass } = req.body;

    try{

        //Encriptación de contraseña
        const hashedPassword = await bcrypt.hash(pass, 10);

        //Version del generador de tokens
        const token = uuidv4();

        // Fecha de expiración de token (10 minutos)
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        //Consulta SQL
        const query = `
            INSERT INTO users (username, email, password, verification_token, expires_at)
            VALUES (?, ?, ?, ?, ?)
        `;

        // Ejecución de la consulta
        connection.query(query, [username, mail, hashedPassword, token, expiresAt], function(err, result) {

            if (err) throw err;
            console.log("User registered successfully:", result);

        });

        //Verificación de correo electrónico
        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.MAIL_HOST,
                pass: process.env.MAIL_PASSWORD,
            }

        });

        const verificationURL = `${process.env.FRONTEND_URL}/users/verify_email?token=${token}`

        await transporter.sendMail({

            from: 'Flavorwell <agustin.mora.trinidad@gmail.com>',
            to: mail,
            subject: 'Verify your Flavorwell account',
            html: ` 
            <div style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; border: 1px solid #eee; padding: 30px; background-color: #fff;">
                <div style="text-align: center;">
                    <img src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell Logo" style="max-width: 120px; margin-bottom: 20px;">
                </div>
                <h2 style="color: rgb(0, 0, 0);">Hi, ${username}!</h2>
                <p style="color: #333; font-size: 16px;">
                    Thank you for registering with <strong>Flavorwell</strong>. To complete your registration, please verify your email address by clicking the button below:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationURL}" 
                        style="background-color: #E3170A; color: white; padding: 15px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Verify Account
                    </a>
                </div>
                <p style="color: #333; font-size: 14px;">
                    If the button above doesn't work, copy and paste the following link into your browser:
                </p>
                <p style="word-break: break-all; color: #F7B32B; font-size: 14px;">
                    <a href="${verificationURL}" style="color: #F7B32B;">${verificationURL}</a>
                </p>
                <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
                <p style="text-align: center; color: #aaa; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} Flavorwell. All rights reserved.
                </p>
            </div>`

        });

        res.status(200).send({ success: true, message: "Success registered user. Please check your email." });

    } catch (error) {

        console.error("Error al registrar:", error);
        res.status(500).json({ success: false, error: 'Internal server error, try again later' });

    }

});

// Verificación de correo electronico a traves de token
router.get('/verify_email', async (req, res) => {

    const { token } = req.query;

    // Verificación de existencia de tokan
    if (!token) {

        return res.status(400).send('Token no proporcionado.');

    }

    try {

        // Ejecucion de consulta
        const [rows] = await connection.query(

            // Parametros de consulta
            'SELECT * FROM users WHERE verification_token = ?', 
            // Token de validacion
            [token]

        );

        // Verificación de existencia de token
        if (rows.length === 0) {

            return res.send('Token inválido o ya utilizado / expirado.');

        }

        const user = rows[0];

        // Validar si el token ya expiró
        const now = new Date();
        if (user.expires_at && new Date(user.expires_at) < now) {

            return res.send('El enlace de verificación ha expirado.');

        }

        // Verificar cuenta
        await connection.query(

            // Parametros de consulta
            'UPDATE users SET verified = TRUE, verification_token = NULL WHERE verification_token = ?',
            // Token de verificación
            [token]

        );

        // Redireccion a pagina de verificacion exitosa
        res.redirect(`${process.env.FRONTEND_URL}/users/verified_success`);

    // Intercepción de errores
    } catch (error) {

        console.error('Error al verificar el correo:', error);
        res.status(500).send('❌ Error interno del servidor.');

    }

});

// Renderizado de pagina de verificacion exitosa
router.get('/verified_success', (req, res) => {

    res.render('verified');

})

// Inicio de sesión y generación de JWT
router.post('/login_user', async function (req, res) {

    // Extracción de datos
    const { email, password } = req.body;

    try {

        // Ejecucion de consulta SQL
        const [rows] = await connection.query(

            // Consulta SQL
            'SELECT * FROM users WHERE email = ?', 
            // Parametros de consulta
            [email]

        );

        // Verificar existencia de correo en DB
        if (rows.length === 0) {

            return res.status(401).json( 

                { success: false, message: 'This email has not yet been registered'}

            )

        }

        // Renombramiento de JSON proveniente de la DB
        const user = rows[0];

        // Verificar si el usuario esta verificado
        if (!user.verified) {

            return res.status(403).json(

                { success: false, message: 'Your email has not been verified yet.' }

            )

        }

        // Comparador de contraseña del cliente con passowrd encriptado de la DB
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {

            return res.status(401).json(

                { success: false, message: 'Incorrect password, please check and try again.' }

            )

        }

        // Generar token JWT
        const token = jwt.sign(

            // Datos de usuario provenientes de la base de datos
            { userId: user.id, username: user.username, email: user.email },
            // Variable de entorno JWT
            process.env.JWT_SECRET,
            // Expiración del token
            { expiresIn: '2h' }

        );

        // Enviar token al cliente
        res.status(200).json({

            success: true,
            message: 'Inicio de sesion exitoso', token

        });

    // Intercepcion de errores en el servidor
    } catch (error) {

        console.error('Error al iniciar sesión', error );
        res.status(500).json(

            { success: false, error: 'Internal server error, please try again later.' }

        )

    }

});

// Enviar correo de recuperacion de contraseña con codigo de seguridad
router.post('/request_password_reset', async (req, res) => {

    // Intercepcion de datos
    const { recoverInfo } = req.body;

    try {

        // Creación y ejecución de de instancia de consulta
        const [rows] = await connection.query(

            // Consulta SQL
            'SELECT * FROM users WHERE email = ?',
            // Parametros
            [recoverInfo]

        );

        // Verificación de existencia de resultados
        if(rows.length === 0) {

            return res.status(404).json({ success: false, message: 'This email is not registered, check your information' });

        }

        // Creación de codigo de seguridad de 4 digitos
        const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
        // Fecha de expiración del codigo de seguridad
        const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

        // Actualizacion de contraseña en el correo electronico encontrado, con ejecucion de instancia
        await connection.query(

            // Consulta SQL
            'UPDATE users SET reset_code = ?, reset_expires_at = ? WHERE email = ?',
            // Parametros de consulta SQL
            [resetCode, resetExpires, recoverInfo]

        );

        // Creacion de transporte de correo electronico
        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {

                user: process.env.MAIL_HOST,
                pass: process.env.MAIL_PASSWORD

            }

        });

        // Envio de correo electronico al correo introducido por el cliente
        await transporter.sendMail({

            from: 'Flavorwell <agustin.mora.trinidad@gmail.com>',
            to: recoverInfo,
            subject: 'Recovery password code',
            html: `
            <div style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; border: 1px solid #eee; padding: 30px; background-color: #fff;">
                <div style="text-align: center;">
                    <img src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell Logo" style="max-width: 120px; margin-bottom: 20px;">
                </div>
                <h2 style="color: rgb(0, 0, 0); text-align: center;">Reset your password</h2>
                <p style="color: #333; font-size: 16px;">
                    We received a request to reset your <strong>Flavorwell</strong> account password.
                </p>
                <p style="color: #333; font-size: 16px;">
                    Use the following code to reset your password:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; background-color: #F7B32B; color: rgb(0, 0, 0); padding: 12px 24px; border-radius: 8px; display: inline-block;">
                        ${resetCode}
                    </span>
                </div>
                <p style="color: #E3170A; font-size: 14px; text-align: center;">
                    This code will expire in 10 minutes.
                </p>
                <p style="color: #999; font-size: 13px; text-align: center; margin-top: 40px;">
                    If you didn't request this, you can safely ignore this email.
                </p>
                <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
                <p style="text-align: center; color: #aaa; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} Flavorwell. All rights reserved.
                </p>
            </div>`

        });

        // Respuesta existosa del servidor al cliente
        res.status(200).json({ success: true, message: `Code sent to ${recoverInfo}`});

    // Intercepción de errorres
    } catch(error){

        console.error('Error enviando codigo de verificacion', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }

});

// Verificación de codigo de seguridad y reestablecimiento de contraseña
router.post('/set_new_password', async (req, res) => {

    // Recolección de datos del cliente
    const { email, newPassword, securityCode } = req.body;
    try {

        // Ejecucion de consulta
        const [rows] = await connection.query(

            // Consulta SQL
            'SELECT * FROM users WHERE email = ? AND reset_code = ?',
            // Parametros de consulta
            [email, securityCode]

        );

        // Verificacion de existencia de correo electronico
        if(rows.length === 0) {

            // Devolución de status
            return res.status(400).json({ success: false, message: 'Correo electronico o codigo invalido' });

        }

        // Guardado de datos en redeclaración de variable
        const user = rows[0];

        // Verificacion de validez de codigo de seguridad
        if(new Date() > new Date(user.reset_expires_at)) {

            // Devolución de status
            return res.status(400).json({ success: false, message: 'El código ha expirado' });

        }

        // Encriptación de nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Ejecución de consulta para actualización
        await connection.query(

            // Consulta SQL
            'UPDATE users SET password = ?, reset_code = NULL, reset_expires_at = NULL WHERE email = ?',
            // Parametros de consulta SQL
            [hashedPassword, email]

        );

        // Devolución de estatus
        res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente' });
    
    // Intercepción de errores
    } catch (error) {

        console.error("Error al actualizar contraseña:", error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });

    }

});

// Selector de recetas para mural de posteos de la comunidad
router.get('/api/recent_posts', authenticateToken, async (req, res) => {

    // Extraccion del 'userId' que esta contenido dentro del 'req.user' asignado en el middleware de JWT
    const userId = req.user.userId;

    // Array de nombres de tablas para consultas SQL posteriores
    const tables = ['vegan', 'desserts', 'strong_dish', 'breakfast'];

    // Array vacio para guardar las recetas mezcladas de forma random
    let combined = [];

    try {

        // Iteracion. Por cada categoria se ejecutaran conexiones y ejecucion de consultas
        for (const table of tables) {

            console.log(`SELECT id,name,img_path AS image_url,description,${table} AS category FROM ${table} WHERE verified = 1 ORDER BY created_at DESC LIMIT 20`, [table])

            // Conexion y ejecución de consulta SQL
            const [rows] = await connection.query(

                // Obtención de 20 recetas mas recientes de la iteración actual
                `SELECT id,name,img_path AS image_url,description,? AS category
                FROM ${table} WHERE verified = 1 ORDER BY created_at DESC LIMIT 20`, [table]

            );

            // Iteración en cada una de las recetas obtenidas de la tabla en iteración
            for (const rec of rows) {

                // Conexion y ejecución de consulta SQL
                const [[liked]] = await connection.query(

                    // Consulta de tabla likes para identificar likes correspondientes a la receta.
                    `SELECT 1 FROM likes WHERE user_id=? AND recipe_id=? AND category=?`,
                    [userId,rec.id,table]

                );

                // Conexión y ejecución de consulta SQL
                const [[saved]] = await connection.query(

                    // Consulta de tabla saved para identificar recetas guardadas por el usuario.
                    `SELECT 1 FROM saved_recipes WHERE user_id=? AND recipe_id=? AND category=?`,
                    [userId,rec.id,table]

                );

                // Conexión y ejecución de consulta SQL
                const [[likeCount]] = await connection.query(

                    // Consulta tipo count para saber la cantidad de likes que tiene la receta en iteracion.
                    `SELECT COUNT(*) AS total FROM likes WHERE recipe_id = ? AND category = ?`,
                    [rec.id, table]

                );

                // Comprobación booleana si hay o no hay like en la receta en iteración.
                rec.liked = !!liked;

                // Comprobación booleana si la receta en iteración esta o no guardada por algun usuario.
                rec.saved = !!saved;

                // Guardado del total de likes de receta en iteración.
                rec.likeCount = likeCount.total;

            }

            // Guardado de todos los resultados en el array 'combined'
            combined.push(...rows);

        }

        // Ordenamiento random del array con las recetas iteradas.
        combined.sort(() => 0.5 - Math.random());

        // Envio de array al frontend.
        res.json(combined);

    // Intercepción de errores
    } catch (error) {

        // Mensaje de error en consola y envio de estatus del servidor.
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });

    }

});

// Toggle para guardado de likes
router.post('/api/toggle_like', authenticateToken, async (req, res) => {

    const { recipeId, category } = req.body;
    const userId = req.user.userId;

    try {

        const [[exists]] = await connection.query(

            `SELECT id FROM likes WHERE user_id=? AND recipe_id=? AND category=?`,
            [userId,recipeId,category]

        );

        if (exists) {

            await connection.query(

                `DELETE FROM likes WHERE id=?`, [exists.id]

            );
            return res.json({ success: true, liked: false });

        }

        await connection.query(

            `INSERT INTO likes(user_id,recipe_id,category) VALUES(?,?,?)`,
            [userId, recipeId, category]

        );
        res.json({ success: true, liked: true});

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

// Toggle para guardado de recetas
router.post('/api/toggle_save', authenticateToken, async (req, res) => {

    const { recipeId, category } = req.body;
    const userId = req.user.userId;

    try {

        const [[exists]] = await connection.query(

            `SELECT id FROM saved_recipes WHERE user_id = ? AND recipe_id = ? AND category = ?`,
            [userId, recipeId, category]

        );

        if (exists) {

            await connection.query('DELETE FROM saved_recipes WHERE id = ?', [exists.id]);
            return res.json({ success: true, saved: false });

        }

        await connection.query(

            `INSERT INTO saved_recipes(user_id,recipe_id,category) VALUES(?,?,?)`,
            [userId, recipeId, category]

        );
        res.json({ success: true, saved: true });

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error '});

    }

});

// Endpoint para obtener foto de perfil y nombre de usuario a traves de JWT para menu dashboard
router.get('/api/user_profile', authenticateToken, async (req, res) => {

    const userId = req.user.userId;

    try {

        const [[user]] = await connection.query(

            `SELECT username, img_profile_path FROM users WHERE id = ?`, [userId]

        );

        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        res.json({ success: true, name: user.username, profile_img: user.img_profile_path });

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }

});

// Endpoint para obtener recetas guardadas por el usuario
router.get('/api/saved_recipes', authenticateToken, async (req, res) => {

    const userId = req.user.userId;
    const tables = ['vegan', 'desserts', 'strong_dish', 'breakfast'];
    const savedRecipes = [];

    try {

        for (const table of tables) {

            const [rows] = await connection.query(

                `SELECT r.id, r.name, r.img_path AS image_url, r.author AS author, ? AS category
                FROM ${table} r
                INNER JOIN saved_recipes s ON r.id = s.recipe_id
                WHERE s.user_id = ? AND s.category = ?`,
                [table, userId, table]

            );

            savedRecipes.push(...rows);

        }

        res.json(savedRecipes);

    } catch(error) {

        console.error(error);
        res.status(500).json({ success: true, message: 'Internal server error' });

    }

});

// Registro de recetas por parte de los usuarios
router.post('/recipes/register', authenticateToken, upload.single('image'), async (req, res) => {

    try {

        // Obtención de valores de sesión
        const userId = req.user.userId;
        const username = req.user.username;

        // Obtención de valores de recetas
        const { name, description, category, ingredients, instructions } = req.body;

        // Alistamiento de instrucciones
        const parsedInstructions = JSON.parse(instructions);

        // Alistamiento de insgredientes
        const parsedIngredients = JSON.parse(ingredients);

        // Integración de dependencia 'crypto' para generar UUID
        const recipeId = require('crypto').randomUUID();

        // Subir imagen a Cloudinary a traves de .upload_stream
        const uploadResult = await cloudinary.uploader.upload_stream(

            // Guardado de recetas en el folder especificado (Carpeta de destino)
            { folder: 'image_recipes' },

            // Creación que función anonima asicrona
            async (error, result) => {

                // Intercepción de errores
                if (error) {

                    // Depuración de errores
                    console.error('Error uploading to Cloudinary:', error);
                    // Envio de estatus al frontend
                    return res.status(500).json({ success: false, message: 'Image upload failed' });

                }

                // Obtención de link publico proporcionado por Cloudinary
                const imageUrl = result.secure_url;

                // Iteración de lista de ingredientes para inserción en tabla de relaciones
                for (const ing of parsedIngredients) {

                    // Conexión a la base de datos
                    await connection.query(

                        // Consulta SQL
                        `INSERT INTO recipe_ingredients (recipe_id, category, ingredient_name) VALUES (?, ?, ?)`,
                        // Parametros de consulta (identificador de la receta, categoria de la receta, nombre del ingrediente)
                        [recipeId, category, ing]

                    );

                }

                // Conexión a la base de datos
                await connection.query(

                    // Inserción de valores verificados
                    `INSERT INTO ${category} (id, name, description, instruction, img_path, author, items, verified)
                    VALUES (?, ?, ?, ?, ?, ?, ?, FALSE)`,
                    // Parametros de consulta SQL (ingredientes e instrucciones parseados en forma de lista)
                    [recipeId, name, description, JSON.stringify(parsedInstructions), imageUrl, userId, parsedIngredients.length]

                );

                // Creación de instancia de correo electronico
                const transporter = nodemailer.createTransport({

                    // Declaración de servicio
                    service: 'gmail',
                    // Autenticación de correo electronico
                    auth: {
                        user: process.env.MAIL_HOST,
                        pass: process.env.MAIL_PASSWORD
                    }

                });

                // Template HTML de correo electronico
                const html = `
                    <div style="max-width: 700px;
                                margin: auto;
                                font-family: 'Poppins';
                                padding: 20px;
                                background-color: #FFF;
                                font-family:Arial, Helvetica, sans-serif;">
                        <table style="width: 100%; text-align: center;">
                            <tr>
                                <td>
                                    <img style="max-width: 120px;
                                                margin-bottom: 16px;" src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell logo">
                                    <h1 style="font-size: 5vh;
                                                color: #E3170A;">Flavorwell</h1>
                                </td>
                            </tr>
                        </table>
                        <strong style="color: #E3170A;">New cooking recipe sent</strong>
                        <img style="width: 100%;
                                        height: 20vh;
                                        background-color: rgb(182, 182, 182);
                                        object-fit: cover;
                                        margin-bottom: 16px;
                                        margin-top: 16px;" src="${imageUrl}" alt="Cooking recipe">
                        <div style="width: 100%; margin-bottom: 16px;">
                            <span style="color: #000;
                                            margin-bottom: 16px;"><strong style="color: #E3170A;
                                                                        font-weight: 600;">Name: </strong>${name}</span>
                        </div>
                        <div style="width: 100%; margin-bottom: 16px;">
                            <span style="color: #000;
                                            margin-bottom: 16px;
                                            line-height: 3vh;"><strong style="color: #E3170A;
                                                                        font-weight: 600;">Description: </strong>${description}</span>
                        </div>
                        <div style="width: 100%; margin-bottom: 16px;">
                            <span style="color: #000;
                                            margin-bottom: 16px;
                                            line-height: 3vh;"><strong style="color: #E3170A;
                                                                        font-weight: 600;">Category: </strong>${category}</span>
                        </div>
                        <div style="width: 100%;">
                            <strong style="color: #E3170A;">Ingredients: </strong>
                        </div>
                        <span style="color: #000;">${parsedIngredients.join('<br>')}</span>
                        <div style="width: 100%; height: 16px;"></div>
                        <div style="width: 100%;">
                            <strong style="color: #E3170A;">Ingredients: </strong>
                        </div>
                        <span style="color: #000;">${parsedInstructions.join('<br>')}</span>
                        <div style="width: 100%; height: 16px;"></div>
                        <div style="width: 100%; margin-bottom: 16px;">
                            <span style="color: #000;
                                            margin-bottom: 16px;
                                            line-height: 3vh;"><strong style="color: #E3170A;
                                                                        font-weight: 600;">Author: </strong>${username}</span>
                        </div>
                        <div style="width: 100%; margin-bottom: 16px;">
                            <P style="font-size: 15px;
                                            margin-bottom: 46px;"><strong>Note: </strong>This recipe has been registered in the 'Flavorwell_DB' database, but has not yet been verified. This recipe will only be valid in the database for 1 hour, after which it will be deleted unless approved.</P>
                        </div>
                        <!-- Botones -->
                        <table width="100%" style="text-align: center; margin-bottom: 40px;">
                            <tr>
                                <td>
                                    <a href="${process.env.FRONTEND_URL}/users/admin/recipes/verify?category=${category}&id=${recipeId}&verified=false"
                                        style="background-color: #E3170A; color: #FFF; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; margin-right: 10px;">Decline</a>

                                    <a href="${process.env.FRONTEND_URL}/users/admin/recipes/verify?category=${category}&id=${recipeId}&verified=true"
                                        style="background-color: #A9E5BB; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">Approve</a>
                                </td>
                            </tr>
                        </table>
                        <!-- Footer -->
                        <table width="100%" style="text-align: center; color: #717171; font-size: 13px;">
                            <tr>
                                <td>&copy; ${new Date().getFullYear()} Flavorwell. All rights reserved.</td>
                            </tr>
                        </table>
                    </div>
                `;

                // Envió de notificación de correo electronico
                await transporter.sendMail({

                    // Cuerpo del correo electronico 
                    from: process.env.MAIL_HOST,
                    to: process.env.MAIL_HOST,
                    subject: 'New Recipe Pending Approval',
                    html: html

                });

                // Envio de objeto JSON de confirmación 
                return res.json({ success: true });

            }

        );

        // Tranferencia de buffer a Cloudinary
        if (req.file && req.file.buffer) {

            // Inicia la carga al stream
            const stream = uploadResult;
            stream.end(req.file.buffer);

        } else {

            // Envio de estaus de error al cargar la imagen
            return res.status(400).json({ success: false, message: 'No image file received.' });

        }

    // Intercepcion de errores
    } catch (error) {

        // Depuracion de errores
        console.error(error);
        res.status(500).json({ success: false, message: 'Error registering recipe.' });

    }

});

// Aprobación o ednegación de publicación de recetas en el frontend
router.get('/admin/recipes/verify', async (req, res) => {

    // Obtención de valores de la solicitud
    const { category, id, verified } = req.query;

    try {

        // Conexión a la base de datos
        await connection.query(

            // Consulta SQL
            `UPDATE ${category} SET verified = ? WHERE id = ?`,
            // Parametros de actualización
            [verified === 'true', id]

        );

        res.redirect(`${process.env.FRONTEND_URL}/users/update/status/recipe`);
    
    // Intercepción de errores
    } catch (err) {

        // Depuracion de errores
        console.error(err);

    }

});

// Renderizado de pagina de estatus de receta
router.get('/update/status/recipe', (req, res) => {

    // Renderizado de view
    res.render('status');

});

// Busacodr de recetas por id y nombre de tabla para el recipe viewer
router.post('/get_recipe_by_id', authenticateToken, async (req, res) => {

    const userId = req.user.userId;
    const { id, table } = req.body;

    try {

        // 1. Obtener receta
        const [results] = await connection.query(

            `SELECT * FROM ?? WHERE id = ? AND verified = 1;`,
            [table, id]

        );

        if (results.length === 0) {

            return res.status(404).json({ success: false, message: 'Recipe not found' });

        }

        const recipe = results[0];
        const authorId = recipe.author;

        //  Obtener nombre del author
        const [author] = await connection.query(

            'SELECT username FROM users WHERE id = ?;',
            [authorId]

        );

        if (author.length === 0) {

            return res.status(404).json({ success: false, message: 'Author not found' });

        }

        // 2. Obtener ingredientes relacionados
        const [ingredients] = await connection.query(
            `
            SELECT r.ingredient_name, i.src_reference
            FROM recipe_ingredients r
            LEFT JOIN ingredients_list i ON r.ingredient_name = i.name
            WHERE r.recipe_id = ? AND r.category = ?;
            `,
            [id, table]
        );

        // 3. Enviar receta + ingredientes
        res.json({
            success: true,
            message: 'Recipe and ingredients fetched successfully',
            data: recipe,
            ingredients,
            author: author
        });

    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


//---------------------------------------------------------NODE CRON JOBS ---------------------------------------------------------------------------------

// Eliminación de usuarios no verificados y limpieza de códigos de recuperación
cron.schedule('*/60 * * * *', async () => {

    try {
        // Instanciar una fecha actual
        const now = new Date();

        // Eliminar usuarios no verificados cuyo tiempo expiró
        const [deletedUsers] = await connection.query(

            // Consulta SQL
            'DELETE FROM users WHERE verified = 0 AND expires_at < ?',
            // Parametros de consulta
            [now]

        );

        // Depuracion de usuarios
        if (deletedUsers.affectedRows > 0) {

            console.log(`[CRON] Usuarios no verificados eliminados: ${deletedUsers.affectedRows}`);

        } else {

            console.log(`[CRON] No hay usuarios expirados para eliminar.`);

        }

        // Limpiar códigos de recuperación expirados
        const [updatedCodes] = await connection.query(

            // Consulta SQL
            'UPDATE users SET reset_code = NULL, reset_expires_at = NULL WHERE reset_expires_at < ?',
            // Parametro de sonsulta (fecha instanciada)
            [now]
            
        );

        // Depuracion de codigos de seguridad
        if (updatedCodes.affectedRows > 0) {

            console.log(`[CRON] Códigos de recuperación eliminados: ${updatedCodes.affectedRows}`);

        } else {

            console.log(`[CRON] No hay códigos de recuperación expirados para limpiar.`);

        }

        // 3. Eliminar recetas no verificadas y sus ingredientes
        const unverified = 0;
        const categories = ['breakfast', 'vegan', 'strong_dish', 'desserts'];

        // Iteración sobre los valores del array
        for (const category of categories) {

            // Conexión y ejecución a la base de datos
            const [unverifiedRecipes] = await connection.query(

                // Consulta SQL
                `SELECT id FROM ${category} WHERE verified = ?`,
                // Parametro de verificación
                [unverified]

            );

            // Depurador de existencia de recetas por eliminar
            if (unverifiedRecipes.length > 0) {

                // Mapeo de valores en forma de lista
                const idsToDelete = unverifiedRecipes.map(r => r.id);

                // Eliminar ingredientes relacionados
                await connection.query(

                    // Consulta SQL (Borra de la tabla 'recipe_ingredients' los ingredientes que coincidan con el id de la receta y su categoria correspondiente)
                    'DELETE FROM recipe_ingredients WHERE recipe_id IN (?) AND category = ?',
                    // Parametros de consulta (Rango de valores de coincidencia, categoria)
                    [idsToDelete, category]

                );

                // Eliminar las recetas (Conexión SQL)
                const [deletedRecipes] = await connection.query(

                    // Consulta SQL (borrar recetas coincidentes con rango de id)
                    `DELETE FROM ${category} WHERE id IN (?)`,
                    // Parametro de consulta
                    [idsToDelete]

                );

                // Depuración de recetas
                console.log(`[CRON] Recetas no verificadas eliminadas de ${category}: ${deletedRecipes.affectedRows}`);

            } else {

                // Mnesaje depuracion en caso de no haber recetas por eliminar
                console.log(`[CRON] No hay recetas no verificadas para eliminar en ${category}.`);

            }
            
        }

    // Intercepción de errores 
    } catch (err) {

        console.error("[CRON] Error en la tarea programada:", err);

    }

});

module.exports = router;
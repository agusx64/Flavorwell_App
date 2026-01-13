import express from 'express';
import OpenAI from 'openai';
import mysql from 'mysql2/promise.js';
import dotenv from 'dotenv';
import cron from 'node-cron';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'crypto';
import { google } from 'googleapis';
const router = express.Router();

// Inicialización de variables de entorno
dotenv.config()

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(

    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI

);

oauth2Client.setCredentials({

    refresh_token: process.env.GMAIL_REFRESH_TOKEN

});

function makeRawMessage({ from, to, subject, html }) {

    const messageParts = [

        `From: ${from}`,
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/html; charset=UTF-8',
        '',
        html

    ];

    const message = messageParts.join('\n');

    return Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

}

export async function sendMail({ to, subject, html }) {

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const raw = makeRawMessage({

        from: process.env.GMAIL_USER_MAIL,
        to,
        subject,
        html

    });

    const res = await gmail.users.messages.send({

        userId: 'me',
        requestBody: {
            raw
        }

    });

    return res;

}

// Configuración del multer para guardado de imagenes temporales en memoriq
const storage = multer.memoryStorage();
const upload = multer({

    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB para subida de imagenes

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

    // Variables de entorno para conexión a la base de datos
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

// Middleware para manejar la imagenes deñ usuario en cloudinary
function uploadToCloudinary(fileBuffer, folder) {

    // Creación de promesa para el manejo de la imagen 
    return new Promise((resolve, reject) => {

        // Función callback stream (permite subir archivos a traves de un flujo de datos)
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {

            // Intercepción de errores y rechazo de conexión
            if (error) return reject(error);

            // Valores devueltos en caso de resolución de respuesta
            resolve({

                // Entrega de url de acceso publico seguro junto con ID
                url: result.secure_url,
                public_id: result.public_id

            });

        });

        // Finalización del proceso stream
        stream.end(fileBuffer);

    });

};

// Middleware de autenticación para API de OpenAi
const openai = new OpenAI({

    // LLave de acceso a Chat GPT 4.0
    apiKey: process.env.OPENAI_API_KEY

});

// Endpoint para el registro de usuarios nuevos
router.post('/register_user', async function (req, res) {

    const { username, mail, pass } = req.body;
    const lang = req.query.lang || 'en';

    try {

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
        connection.query(query, [username, mail, hashedPassword, token, expiresAt], function (err, result) {

            if (err) throw err;
            console.log("User registered successfully:", result);

        });

        const verificationURL = `${process.env.FRONTEND_URL}/users/verify_email?token=${token}&lang=${lang}`

        let subject;
        let html;

        try {

            switch (lang) {
                
                case 'en':

                    subject = 'Verify your flavorwell account';
                    html = `
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
                        </div>
                    `;

                    await sendMail({ to: mail, subject, html })
                    res.status(200).send({ success: true, message: "Success registered user. Please check your email." });
                    break;
                
                case 'es':

                    subject = 'Verifica tu cuenta de Flavorwell';
                    html = `
                        <div style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; border: 1px solid #eee; padding: 30px; background-color: #fff;">
                            <div style="text-align: center;">
                                <img src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell Logo" style="max-width: 120px; margin-bottom: 20px;">
                            </div>
                            <h2 style="color: rgb(0, 0, 0);">Hi, ${username}!</h2>
                            <p style="color: #333; font-size: 16px;">
                                Gracias por registrarte en <strong>Flavorwell</strong>. Para completar tu registro, Por favor verifique su dirección de correo electrónico haciendo clic en el botón de abajo:
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${verificationURL}" 
                                    style="background-color: #E3170A; color: white; padding: 15px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                    Verificar Cuenta
                                </a>
                            </div>
                            <p style="color: #333; font-size: 14px;">
                                Si el botón de arriba no funciona, copie y pegue el siguiente enlace en su navegador:
                            </p>
                            <p style="word-break: break-all; color: #F7B32B; font-size: 14px;">
                                <a href="${verificationURL}" style="color: #F7B32B;">${verificationURL}</a>
                            </p>
                            <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
                            <p style="text-align: center; color: #aaa; font-size: 12px;">
                                &copy; ${new Date().getFullYear()} Flavorwell. Todos los derechos reservados.
                            </p>
                        </div>
                    `;

                    await sendMail({ to: mail, subject, html })
                    res.status(200).send({ success: true, message: "Usuario registrado correctamente. Por favor, revise su correo electrónico." });
                    break;
            
            }

        } catch (error) {

            console.error('Error enviando codigo por Gmail API', error);
            switch (lang) {

                case 'en':
                    res.status(500).json({ success: false, message: 'Error sending email',  });
                    break;

                case 'es':
                    res.status(500).json({ success: false, message: 'Error enviando correo electronico' });
                    break;

            }

        }


    } catch (error) {

        console.error("Error al registrar:", error);

    }

});

// Verificación de correo electronico a traves de token
router.get('/verify_email', async (req, res) => {

    const { token } = req.query;
    const lang = req.query.lang || 'en';

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
        res.redirect(`${process.env.FRONTEND_URL}/users/verified_success?lang=${lang}`);

        // Intercepción de errores
    } catch (error) {

        console.error('Error al verificar el correo:', error);
        res.status(500).send('❌ Error interno del servidor.');

    }

});

// Renderizado de pagina de verificacion exitosa
router.get('/verified_success', (req, res) => {

    const lang = req.query.lang || 'en';
    switch (lang) {

        case 'es':
            res.render('es/verified_es');
            break;
        
        case 'en':
            res.render('en/verified_en');
            break;
    }

});

// Renderizado de pagina de verificacion exitosa
router.get('/verified_profile', (req, res) => {

    const lang = req.query.lang || 'en';
    switch (lang) {

        case 'es':
            res.render('es/verified_profile_es');
            break;
        
        case 'en':
            res.render('en/verified_profile_en');
            break;
    }

});

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

                { success: false, message: 'This email has not yet been registered' }

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

        console.error('Error al iniciar sesión', error);
        res.status(500).json(

            { success: false, error: 'Internal server error, please try again later.' }

        )

    }

});

// Validación de sesión continua
router.get('/verify_token', authenticateToken, (req, res) => {

    // Devolución de estatus
    res.status(200).json({ success: true, message: 'Token válido' });

});

// Enviar correo de recuperacion de contraseña con codigo de seguridad
router.post('/request_password_reset', async (req, res) => {

    // Intercepcion de datos
    const { recoverInfo } = req.body;
    const lang = req.query.lang || 'en';

    try {

        // Creación y ejecución de de instancia de consulta
        const [rows] = await connection.query(

            // Consulta SQL
            'SELECT * FROM users WHERE email = ?',
            // Parametros
            [recoverInfo]

        );

        // Verificación de existencia de resultados
        if (rows.length === 0) {

            switch (lang) {

                case 'en':
                    return res.status(404).json({ success: false, message: 'This email is not registered, check your information' });
                    break;

                case 'es':
                    return res.status(404).json({ success: false, message: 'Este correo no está registrado, revisa tus datos' });
                    break;

            }


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

        let subject;
        let html;

        try {

            switch (lang) {

                case 'en':
                    subject = 'Recovery password code'
                    html = `
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
                    </div>
                    `;
                    await sendMail({ to: recoverInfo, subject, html })
                    res.status(200).json({ success: true, message: `Code sent to: ${recoverInfo}` });
                    break;
                
                case 'es':
                subject = 'Codigo de recuperación'
                html = `
                    <div style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; border: 1px solid #eee; padding: 30px; background-color: #fff;">
                        <div style="text-align: center;">
                            <img src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell Logo" style="max-width: 120px; margin-bottom: 20px;">
                        </div>
                        <h2 style="color: rgb(0, 0, 0); text-align: center;">Restablecer su contraseña</h2>
                        <p style="color: #333; font-size: 16px;">
                            Recibimos una solicitud para restablecer la contraseña de su cuenta <strong>Flavorwell</strong>
                        </p>
                        <p style="color: #333; font-size: 16px;">
                            Utilice el siguiente código para restablecer su contraseña:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <span style="font-size: 32px; font-weight: bold; background-color: #F7B32B; color: rgb(0, 0, 0); padding: 12px 24px; border-radius: 8px; display: inline-block;">
                                ${resetCode}
                            </span>
                        </div>
                        <p style="color: #E3170A; font-size: 14px; text-align: center;">
                            Este código expirará en 10 minutos.
                        </p>
                        <p style="color: #999; font-size: 13px; text-align: center; margin-top: 40px;">
                            Si no solicitó esto, puede ignorar este correo electrónico con seguridad.
                        </p>
                        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
                        <p style="text-align: center; color: #aaa; font-size: 12px;">
                            &copy; ${new Date().getFullYear()} Flavorwell. Todos los derechos reservados.
                        </p>
                    </div>
                    `;
                    await sendMail({ to: recoverInfo, subject, html })
                    res.status(200).json({ success: true, message: `Código enviado a: ${recoverInfo}` });
                break;

            }


        } catch (error) {

            switch (lang) {

                case 'en':
                    res.status(500).json({ success: false, message: 'Error sending email',  });
                    break;

                case 'es':
                    res.status(500).json({ success: false, message: 'Error enviando correo electronico' });
                    break;

            }

            console.error('Error enviando codigo por Gmail API', error);

        }

        // Intercepción de errorres
    } catch (error) {

        console.error('Error enviando codigo de verificacion', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }

});

// Verificación de codigo de seguridad y reestablecimiento de contraseña
router.post('/set_new_password', async (req, res) => {

    // Recolección de datos del cliente
    const { email, newPassword, securityCode } = req.body;
    const lang = req.query.lang || 'en';

    try {

        // Ejecucion de consulta
        const [rows] = await connection.query(

            // Consulta SQL
            'SELECT * FROM users WHERE email = ? AND reset_code = ?',
            // Parametros de consulta
            [email, securityCode]

        );

        // Verificacion de existencia de correo electronico
        if (rows.length === 0) {

            switch (lang) {

                case 'en':
                    res.status(400).json({ success: false, message: 'Invalid email or code' });
                    break;

                case 'es':
                    res.status(400).json({ success: false, message: 'Correo electronico o codigo invalido' });
                    break;

            }
            

        }

        // Guardado de datos en redeclaración de variable
        const user = rows[0];

        // Verificacion de validez de codigo de seguridad
        if (new Date() > new Date(user.reset_expires_at)) {

            switch (lang) {

                case 'es':
                    res.status(400).json({ success: false, message: 'El código ha expirado' });
                    break;

                case 'en':
                    res.status(400).json({ success: false, message: 'The code has expired' });
                    break;

            }
            

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

        switch (lang) {

            case 'es':
                res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente' });
                break;
                
            case 'en':
                res.status(200).json({ success: true, message: 'Password updated succesfully' });
                break;

        }

        // Intercepción de errores
    } catch (error) {

        console.error("Error al actualizar contraseña:", error);
        switch (lang) {

            case 'es':
                res.status(500).json({ success: false, message: 'Error interno del servidor' });
                break;
                
            case 'en':
                res.status(500).json({ success: false, message: 'Internal server error' });
                break;

        }

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
                    [userId, rec.id, table]

                );

                // Conexión y ejecución de consulta SQL
                const [[saved]] = await connection.query(

                    // Consulta de tabla saved para identificar recetas guardadas por el usuario.
                    `SELECT 1 FROM saved_recipes WHERE user_id=? AND recipe_id=? AND category=?`,
                    [userId, rec.id, table]

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

// Selector de recetas para mural de posteos del usuario
router.post('/api/user_posts', authenticateToken, async (req, res) => {

    // Obtención de id proveniente del viewer
    const { id } = req.body;

    // Extraccion del 'userId' que esta contenido dentro del 'req.user' asignado en el middleware de JWT
    const userId = req.user.userId;

    // Array de nombres de tablas para consultas SQL posteriores
    const tables = ['vegan', 'desserts', 'strong_dish', 'breakfast'];

    // Array vacio para guardar las recetas mezcladas de forma random
    let combined = [];

    try {

        // Iteracion. Por cada categoria se ejecutaran conexiones y ejecucion de consultas
        for (const table of tables) {

            // Conexion y ejecución de consulta SQL
            const [rows] = await connection.query(

                // Obtención de 20 recetas mas recientes de la iteración actual
                `SELECT id,name,img_path AS image_url,description,? AS category
                FROM ${table} WHERE verified = 1 AND author = ? ORDER BY created_at;`, [table, id]

            );

            // Iteración en cada una de las recetas obtenidas de la tabla en iteración
            for (const rec of rows) {

                // Conexion y ejecución de consulta SQL
                const [[liked]] = await connection.query(

                    // Consulta de tabla likes para identificar likes correspondientes a la receta.
                    `SELECT 1 FROM likes WHERE user_id=? AND recipe_id=? AND category=?`,
                    [userId, rec.id, table]

                );

                // Conexión y ejecución de consulta SQL
                const [[saved]] = await connection.query(

                    // Consulta de tabla saved para identificar recetas guardadas por el usuario.
                    `SELECT 1 FROM saved_recipes WHERE user_id=? AND recipe_id=? AND category=?`,
                    [userId, rec.id, table]

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
            [userId, recipeId, category]

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
        res.json({ success: true, liked: true });

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
        res.status(500).json({ success: false, message: 'Internal server error ' });

    }

});

// Verificar si la receta está likeada
router.post('/api/check_like', authenticateToken, async (req, res) => {

    const { recipeId, category } = req.body;
    const userId = req.user.userId;

    try {

        const [[exists]] = await connection.query(

            `SELECT id FROM likes WHERE user_id=? AND recipe_id=? AND category=?`,
            [userId, recipeId, category]

        );

        res.json({ liked: !!exists });

    } catch (error) {

        console.error(error);
        res.status(500).json({ liked: false });

    }

});

// Verificar si la receta está guardada
router.post('/api/check_save', authenticateToken, async (req, res) => {

    const { recipeId, category } = req.body;
    const userId = req.user.userId;

    try {

        const [[exists]] = await connection.query(

            `SELECT id FROM saved_recipes WHERE user_id=? AND recipe_id=? AND category=?`,
            [userId, recipeId, category]

        );

        res.json({ saved: !!exists });

    } catch (error) {

        console.error(error);
        res.status(500).json({ saved: false });

    }

});

// Endpoint para obtener foto de perfil y nombre de usuario a traves de JWT para menu dashboard
router.get('/api/user_profile', authenticateToken, async (req, res) => {

    const userId = req.user.userId;

    try {

        const [[user]] = await connection.query(

            `SELECT id, username, email, img_profile_path FROM users WHERE id = ?`, [userId]

        );

        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        res.json({ success: true, id: user.id, name: user.username, profile_img: user.img_profile_path, email: user.email });

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

                `SELECT 
                    r.id, 
                    r.name, 
                    r.img_path AS image_url, 
                    u.username AS author, 
                    ? AS category
                FROM ${table} r
                INNER JOIN saved_recipes s ON r.id = s.recipe_id
                INNER JOIN users u ON r.author = u.id
                WHERE s.user_id = ? AND s.category = ?`,
                [table, userId, table]

            );

            savedRecipes.push(...rows);

        }

        res.json(savedRecipes);

    } catch (error) {

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
        const category = req.body.category;
        const lang = req.query.lang;
        const ALLOWED_CATEGORIES = new Set([
            'breakfast',
            'desserts',
            'strong_dish',
            'vegan'
        ]);

        // Filtro de inyecciones SQL
        if (!checkCategory(category)) {
            return res.status(400).json({

                success: false,
                message: 'Invalid category'

            });
            
        }

        // Obtención de valores de recetas
        const { name, description, ingredients, instructions } = req.body;

        // Alistamiento de instrucciones
        const parsedInstructions = JSON.parse(instructions);

        // Alistamiento de insgredientes
        const parsedIngredients = JSON.parse(ingredients);

        // Integración de dependencia 'crypto' para generar UUID
        const recipeId = randomUUID();

        // Validar existencia del archivo
        if (!req.file || !req.file.buffer) {

            return res.status(400).json({ success: false, message: 'No image file received.' });

        }

        // Subir imagen a Cloudinary correctamente usando la función de promesa
        let imageUrl;
        try {

            const uploaded = await uploadToCloudinary(req.file.buffer, 'image_recipes');
            imageUrl = uploaded.url;

        } catch (err) {

            console.error('Error uploading to Cloudinary:', err);

            switch (lang) {

                case 'es':
                    res.status(500).json({ success: false, message: 'Image upload failed' });
                    break;
                    
                case 'en':
                    res.status(500).json({ success: false, message: 'Error al cargar la imagen' });
                    break;

            }
        }

        // Iteración de lista de ingredientes para inserción en tabla de relaciones
        for (const ing of parsedIngredients) {

            await connection.query(

                `INSERT INTO recipe_ingredients (recipe_id, category, ingredient_id) VALUES (?, ?, ?)`,
                [recipeId, category, ing]

            );

        }

        // Inserción en tabla de recetas
        await connection.query(

            `INSERT INTO ${category} (id, name, description, instruction, img_path, author, items, verified)
                VALUES (?, ?, ?, ?, ?, ?, ?, FALSE)`,
            [recipeId, name, description, JSON.stringify(parsedInstructions), imageUrl, userId, parsedIngredients.length]

        );

        // Obtener nombres de los ingredientes
        const [ingredientNamesResult] = await connection.query(

            `SELECT name FROM ingredients_list WHERE id IN (?)`,
            [parsedIngredients]

        );

        const ingredientNames = ingredientNamesResult.map(ing => ing.name);

        // Enviar correo al admin
        const subject = 'New recipe pending aproval';
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
                        <span style="color: #000;">${ingredientNames.join('<br>')}</span>
                        <div style="width: 100%; height: 16px;"></div>
                        <div style="width: 100%;">
                            <strong style="color: #E3170A;">Instructions: </strong>
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

        try {

            await sendMail({ to: process.env.MAIL_ADMIN, subject, html });
            return res.json({ success: true });

        } catch (error) {

            console.error('Error enviando correo por Gmail API', error);
            
            switch (lang) {
                
                case 'es':
                    res.status(500).json({ success: false, message: 'Error enviando correo eletrónico' });
                    break;
                    
                case 'en':
                    res.status(500).json({ success: false, message: 'Error sending email' });
                    break;

            }

        }

        function checkCategory(category) {
            return ALLOWED_CATEGORIES.has(category);
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

    // Valores requeridos para el funcionamiento del endpoint (id de receta, tabla de proveniencia)
    const { id, table } = req.body;
    const lang = req.query.lang || 'en';
    let nameColumn;

    try {

        switch (lang) {

            case 'es':
                nameColumn = 'name_es';
                break;

            case 'en':
                nameColumn = 'name';
                break;

            default:
                nameColumn = 'name';
                break;

        }

        // Obtener receta a traves de id y categoria
        const [results] = await connection.query(

            // Consulta SQL
            `SELECT * FROM ?? WHERE id = ? AND verified = 1;`,
            // Parametros de consulta
            [table, id]

        );

        // Envio de mensaje de error en caso de inexistencia de receta
        if (results.length === 0) {

            // Envio de mensaje al cliente
            return res.status(404).json({ success: false, message: 'Recipe not found' });

        }

        // Extracción de valores provenientes de la respuesta del cliente para obtener información adicional de la rececta
        const recipe = results[0];
        const authorId = recipe.author;
        const recipeId = recipe.id;

        //  Obtener nombre del author
        const [author] = await connection.query(

            // Consulta SQL
            'SELECT username, img_profile_path FROM users WHERE id = ?;',
            // Parametro de busqueda (ID del author)
            [authorId]

        );

        // Busqueda de author relacionado con la receta
        if (author.length === 0) {

            // Envio de respuesta de error en caso de que al autor ya no exista
            return res.status(404).json({ success: false, message: 'Author not found' });

        }

        // Obtención de likes totales de la receta
        const [likeCount] = await connection.query(

            // Consulta tipo count para saber la cantidad de likes que tiene la receta en iteracion.
            `SELECT COUNT(*) AS total FROM likes WHERE recipe_id = ? AND category = ?`,
            [recipeId, table]

        );

        // Obtención de cantidad de guardados de la receta
        const [savedCount] = await connection.query(

            // Consulta tipo count para saber la cantidad de likes que tiene la receta en iteracion.
            `SELECT COUNT(*) AS total FROM saved_recipes WHERE recipe_id = ? AND category = ?`,
            [recipeId, table]

        );

        // Obtener ingredientes relacionados
        const [ingredients] = await connection.query(

            // Consulta SQL
            `
            SELECT i.${nameColumn} AS ingredient_name, i.src_reference
            FROM recipe_ingredients r
            JOIN ingredients_list i ON r.ingredient_id = i.id
            WHERE r.recipe_id = ? AND r.category = ?;

            `,
            // Prametros de la consulta
            [id, table]

        );

        // Envio de respuesta al fontend (Datos de receta + Ingredientes relacionados + Autor + Likes y guardados totales + ID del autor)
        res.json({
            success: true,
            message: 'Recipe and ingredients fetched successfully',
            data: recipe,
            ingredients,
            author: author,
            likeCount,
            savedCount,
            authorId: authorId
        });

        // Intercepcion de errores y envio de mensaje de error al frontend
    } catch (error) {

        console.error('Error fetching recipe:', error);
        res.status(500).json({ success: false, message: 'Server error' });

    }

});

// Busacdor de información de usuario y datos de recetas relacionadas
router.post('/get_user_by_id', authenticateToken, async (req, res) => {

    // ID requerido para el funcionamiento del endpoint
    const { id } = req.body;

    try {

        // Obtener usuario a traves de ID
        const [results] = await connection.query(

            // Consulta SQL
            'SELECT id, email, username, created_at, img_profile_path, img_cover_path FROM users WHERE id = ?;',
            // Parametro de consulta
            [id]

        );

        // Verificación de existencia de usuario en la base de datos
        if (results.length === 0) {

            // Envio de mensdaje de error al frontend
            return res.status(404).json({ success: false, message: 'User not found' });

        }

        // Extracción de valores del usuario de la respuesta de MySQL
        const user = results[0];

        // Obtencion de recetas guardadas por el usuario
        const [rows] = await connection.query(

            // Consulta SQL
            'SELECT COUNT(*) AS total_saved FROM saved_recipes WHERE user_id = ?;',
            // Parametro de busqueda
            [id]

        );

        // Extracción de numero de guardados de la respuesta de MySQL
        const totalSaved = rows[0].total_saved;

        // Obtención de recetas totales subidas por el usuario
        const queries = [
            connection.query('SELECT COUNT(*) AS count FROM breakfast WHERE author = ?', [id]),
            connection.query('SELECT COUNT(*) AS count FROM desserts WHERE author = ?', [id]),
            connection.query('SELECT COUNT(*) AS count FROM strong_dish WHERE author = ?', [id]),
            connection.query('SELECT COUNT(*) AS count FROM vegan WHERE author = ?', [id])
        ];

        // Ejecución de cada una de la consulta guardadas en el array 'queries'
        const values = await Promise.all(queries);
        // Sumatoria de los valores devueltos por cada una de las consultas del array
        const totalRecipes = values.reduce((sum, [row]) => sum + row[0].count, 0);

        // Envio de datos al frontend
        res.json({

            success: true,
            user: user,
            total_saved: totalSaved,
            total_recipes: totalRecipes

        })

        // Intercepción de errores y envio de respuesta de error al frontend
    } catch (error) {

        console.error('Error fetching recipe:', error);
        res.status(500).json({ success: false, message: 'Server error' });

    }

});

// Obtención de recetas creadas por el usuario
router.get('/api/user_recipes', authenticateToken, async (req, res) => {

    // Obtencion de ID del usuario en sesión
    const userId = req.user.userId;

    try {

        // Consulta SQL para obtencion de recetas creadas por el usuario ()
        const query = `
            SELECT r.id, r.name, r.description, r.img_path, r.category,
                IFNULL(likes.count, 0) AS like_count,
                IFNULL(saves.count, 0) AS save_count
            FROM (
                SELECT id, name, description, img_path, 'breakfast' AS category FROM breakfast WHERE verified = 1 AND author = ?
                UNION ALL
                SELECT id, name, description, img_path, 'desserts' AS category FROM desserts WHERE verified = 1 AND author = ?
                UNION ALL
                SELECT id, name, description, img_path, 'strong_dish' AS category FROM strong_dish WHERE verified = 1 AND author = ?
                UNION ALL
                SELECT id, name, description, img_path, 'vegan' AS category FROM vegan WHERE verified = 1 AND author = ?
            ) AS r
            LEFT JOIN (
                SELECT recipe_id, category, COUNT(*) AS count
                FROM likes
                GROUP BY recipe_id, category
            ) AS likes
            ON r.id = likes.recipe_id AND r.category = likes.category
            LEFT JOIN (
                SELECT recipe_id, category, COUNT(*) AS count
                FROM saved_recipes
                GROUP BY recipe_id, category
            ) AS saves
            ON r.id = saves.recipe_id AND r.category = saves.category;
        `;

        // Ejecución de consulta SQL
        const [results] = await connection.query(query, [userId, userId, userId, userId]);

        // Envió de datos al frontend
        res.json({ success: true, recipes: results });

        // Intercepción de errores y envio de mensaje de error al frontend
    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).json({ success: false, message: 'Error retrieving recipes' });

    }

});

// Actualizacion de datos del usuario en sesión
router.post('/api/update_profile', authenticateToken, upload.fields([

    // Obtención de archivos provenientes del frontend (Imagen de perfil e imagen de portada)
    { name: 'profile_img' },
    { name: 'cover_img' }

]), async (req, res) => {

    try {

        // ID del usuario en sesión
        const userId = req.user.userId;

        // Datos provenientes del frontend
        const { username, email } = req.body;

        // Lenguaje del frontend
        const lang = req.query.lang || 'en';
        console.log(lang);

        // Extracción de imagenes 
        const profileImg = req.files?.profile_img?.[0];
        const coverImg = req.files?.cover_img?.[0];

        // Obtener datos del usuario en sesión
        const [userResult] = await connection.query(

            // Consulta SQL
            'SELECT username, email, img_profile_id, img_cover_id FROM users WHERE id = ?',
            // Parametro de consulta 
            [userId]

        );

        // Envio de mensaje de error al frontend en caso de inexistencia de usuario
        if (userResult.length === 0) {

            switch (lang) {

                case 'es':
                    res.status(404).json({ success: false, message: 'Usuario no encontrado' });
                    break;
                    
                case 'en':
                    res.status(404).json({ success: false, message: 'User not found' });
                    break;

            }

        }

        // Obtención de datos del usuario en sesión
        const currentUser = userResult[0];

        // Variables booleanas para la comprobación de la existencia de cambios
        const emailChanged = currentUser.email !== email;
        const usernameChanged = currentUser.username !== username;

        // Inicializacion tipo 'null' de variables para consulta SQL
        let imgProfilePath = null;
        let imgCoverPath = null;
        let imgProfileId = null;
        let imgCoverId = null;

        // Subir nueva imagen de perfil si se recibió
        if (profileImg) {

            // Si hay una imagen subida a cludinary que coincida con el id de la imagen la borrará para sustituirla por la nueva imagen
            if (currentUser.img_profile_id) {

                // Eliminación de la imagen coincidente
                await cloudinary.uploader.destroy(currentUser.img_profile_id);

            }

            // Subir la nueva imagen al bucket de cloudinary a traves del middleware
            const uploaded = await uploadToCloudinary(profileImg.buffer, 'image_users');

            // Extracción de ID y URL de la nueva imagen
            imgProfilePath = uploaded.url;
            imgProfileId = uploaded.public_id;

        }

        // Se realiza el mismo proceso para la imagen de portada
        if (coverImg) {

            if (currentUser.img_cover_id) {

                await cloudinary.uploader.destroy(currentUser.img_cover_id);

            }

            const uploaded = await uploadToCloudinary(coverImg.buffer, 'image_covers');
            imgCoverPath = uploaded.url;
            imgCoverId = uploaded.public_id;

        }

        // Preparar token de verificación
        const newVerificationToken = uuidv4();

        // Creación de una hora de expiración del token (1 hora)
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

        // Actualizar información del usuario
        await connection.query(

            // Consulta SQL para la actualización de los datos
            `UPDATE users 
            SET username = ?, email = ?, 
                img_profile_path = COALESCE(?, img_profile_path),
                img_profile_id = COALESCE(?, img_profile_id),
                img_cover_path = COALESCE(?, img_cover_path),
                img_cover_id = COALESCE(?, img_cover_id),
                verified = ?, 
                verification_token = ?, 
                expires_at = ?
            WHERE id = ?

        `, [

            username,
            email,
            imgProfilePath,
            imgProfileId,
            imgCoverPath,
            imgCoverId,
            // Se verifica si se hizo un cambio en el nombre del usuario o en el correo electronico
            emailChanged || usernameChanged ? 0 : 1,
            newVerificationToken,
            expiresAt,
            userId

        ]);

        // Si hay cambios sensibles, enviar correo de verificación
        if (emailChanged || usernameChanged) {

            // Creación de link de verificación de cambios
            const verifyLink = `${process.env.FRONTEND_URL}/users/api/verify_profile?token=${newVerificationToken}&lang=${lang}`;

            let subject;
            let  html;

            switch (lang) {

                case 'en':
                    subject = 'Verify your profile changes';
                    html = `
                        <div style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; border: 1px solid #eee; padding: 30px; background-color: #fff;">
                                <div style="text-align: center;">
                                    <img src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell Logo" style="max-width: 120px; margin-bottom: 20px;">
                                </div>
                                <h2 style="color: rgb(0, 0, 0);">Hi, ${username}!</h2>
                                <p style="color: #333; font-size: 16px;">
                                    This is a verification email for changes to your <strong>Flavorwell</strong> profile. Please verify the changes to your profile by clicking the button or link.
                                </p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${verifyLink}" 
                                        style="background-color: #E3170A; color: white; padding: 15px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                        Verify changes
                                    </a>
                                </div>
                                <p style="color: #333; font-size: 14px;">
                                    If the button above doesn't work, copy and paste the following link into your browser:
                                </p>
                                <p style="word-break: break-all; color: #F7B32B; font-size: 14px;">
                                    <a href="${verifyLink}" style="color: #F7B32B;">${verifyLink}</a>
                                </p>
                                <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
                                <p style="text-align: center; color: #aaa; font-size: 12px;">
                                    &copy; ${new Date().getFullYear()} Flavorwell. All rights reserved.
                                </p>
                            </div>
                    `;
                    break;

                case 'es':
                    subject = 'Verifica los cambios en tu perfil';
                    html = `
                        <div style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; border: 1px solid #eee; padding: 30px; background-color: #fff;">
                                <div style="text-align: center;">
                                    <img src="https://res.cloudinary.com/dqizoxubr/image/upload/v1750291657/logo_small_bsfqxw.png" alt="Flavorwell Logo" style="max-width: 120px; margin-bottom: 20px;">
                                </div>
                                <h2 style="color: rgb(0, 0, 0);">Hi, ${username}!</h2>
                                <p style="color: #333; font-size: 16px;">
                                    Este es un correo electrónico de verificación para cambios en su perfil de <strong>Flavorwell.</strong> Por favor verifique los cambios en su perfil haciendo clic en el botón o enlace.
                                </p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${verifyLink}" 
                                        style="background-color: #E3170A; color: white; padding: 15px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                        Verificar cambios
                                    </a>
                                </div>
                                <p style="color: #333; font-size: 14px;">
                                    Si el botón de arriba no funciona, copie y pegue el siguiente enlace en su navegador:
                                </p>
                                <p style="word-break: break-all; color: #F7B32B; font-size: 14px;">
                                    <a href="${verifyLink}" style="color: #F7B32B;">${verifyLink}</a>
                                </p>
                                <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
                                <p style="text-align: center; color: #aaa; font-size: 12px;">
                                    &copy; ${new Date().getFullYear()} Flavorwell. Todos los derechos reservados.
                                </p>
                            </div>
                    `;
                    break;

            }

            try {

                await sendMail({ to: email, subject, html })

            } catch (error) {

                console.error('Error enviando codigo por Gmail API', error);

                switch (lang) {

                    case 'es':
                        res.status(500).json({ success: false, message: 'Error enviando correo electronico' });
                        break;

                    case 'en':
                        res.status(500).json({ success: false, message: 'Error sending email' });
                        break;

                }

            }

        }

        switch (lang) {

            case 'es':
                res.status(200).json({ success: true, message: 'Si cambió su nombre de usuario o dirección de correo electrónico, se le envió un correo electrónico de confirmación. Por favor, revise su bandeja de entrada.' });
                break;

            case 'en':
                res.status(200).json({ success: true, message: 'If you changed your username or email address, a confirmation email has been sent. Please check your inbox.' });
                break;

        }

        // Intercepción de errores
    } catch (error) {

        switch (lang) {

            case 'es':
                res.status(500).json({ success: false, message: 'Error del servidor' });
                break;
                
            case 'en':
                res.status(500).json({ success: false, message: 'Internal server error' });
                break;

        }
        console.error('Error actualizando perfil:', error);

    }

});

// Verificacion de cambios o actualización de datos de usuario
router.get('/api/verify_profile', async (req, res) => {

    // Token proveniente del correo electronico
    const { token } = req.query;
    const lang = req.query.lang;

    // Intercepción de intento de consulta sin token
    if (!token) return res.status(400).json({ success: false, message: 'Token requerido' });

    // Busqueda de usuario a traves de token de verificación
    const [result] = await connection.query(

        // Consulta SQL de busqueda
        'SELECT id, expires_at FROM users WHERE verification_token = ?',
        // Paramatro de busqueda
        [token]

    );

    // Envio de mensaje de error en caso de que el usuario no exista o el token sea invalido
    if (result.length === 0) {

        switch (lang) {

            case 'es':
                res.status(400).json({ success: false, message: 'Token inválido' });
                break;
                
            case 'en':
                res.status(400).json({ success: false, message: 'Invalid token' });
                break;

        }

    }

    // Extracción de datos del usuario de respuesta de MySQL
    const user = result[0];
    // Creación de una fecha actual
    const now = new Date();

    // Verificación de validez de token
    if (now > user.expires_at) {

        switch (lang) {

            case 'es':
                res.status(400).json({ success: false, message: 'El token ha expirado' });
                break;
                
            case 'en':
                res.status(400).json({ success: false, message: 'Token expired' });
                break;

        }

    }

    // Ejecucion de consulta SQL
    await connection.query(
        // Seteo de 1 en verified para evitar la eliminación de el usuario en la base de datos
        `UPDATE users 
        SET verified = 1, verification_token = NULL, expires_at = NULL 
        WHERE id = ?
    `, [user.id]);

    // Redireccion a pagina de verificacion exitosa
    res.redirect(`${process.env.FRONTEND_URL}/users/verified_profile?lang=${lang}`);

});

// Endpoint de generacion de recetas con inteligencia artificial (Chat GPT 4)
router.post('/api/recipes/ai-generate', authenticateToken, async (req, res) => {

    // Datos requeridos para en endpoint (Nombre de receta y categoria de la receta)
    const { name, category } = req.body;

    try {

        // Obtención de ingredientes disponibles en la base de datos
        const [rows] = await connection.query('SELECT name FROM ingredients_list;');

        // Creación de string con los nombres de los ingredientes para insertarlo en el propmt para la inteligenia artificial
        const ingredientList = rows.map(row => row.name).join(', ');

        // Prompt para la generación de receta con AI (Chat GPT 4)
        const prompt = `

            To create a recipe for "${name}" based on the "${category}" category, you must provide:
            1. A brief description of the recipe (maximum 200 characters).
            2. Create a list of the necessary ingredients, choosing only from the following available ones: ${ingredientList}.
            3. Step-by-step cooking instructions.
            Return the result in JSON format with the structure:
            {
                "description": "...",
                "ingredients": ["...", "..."],
                "instructions": ["Step 1...", "Step 2...", ...]
            }

        `;

        // Creación de variable de instancia para uso del modelo de inteligenia artificial
        const completion = await openai.chat.completions.create({

            // Modelo de inteligenia artificial
            model: "gpt-4",
            // Rol y prompt enviado al modelo de inteligenia artificial
            messages: [{ role: "user", content: prompt }]

        });

        // Extracción de la respuesta del API contenida en el objeto JSON
        const responseText = completion.choices[0]?.message?.content || '';

        // Inicialización de variable
        let parsed;

        try {

            // Parseo de la respuesta de la inteligenia artificial y guardado en la variable 'parsed'
            parsed = JSON.parse(responseText);

            // Intercepción de errores
        } catch (err) {

            // Envio de mensaje de error al frontend
            console.error("Error parsing AI response:", err);
            return res.status(500).json({ error: 'Failed to parse AI response' });

        }

        // Envio de mensaje de exito al frontend y datos de la receta generada por el modelo de AI
        console.log(parsed);
        return res.json({ success: true, data: parsed, message: 'Recipe generated' });

        // Intercepción de errores
    } catch (error) {

        console.error("Internal server error", error);

    }

});

// Endpoint para recibir el actualizar 'refresh_token' de Google
router.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('No se recibió el parámetro "code"');
    }

    try {
        // Intercambiamos el "code" por los tokens
        const { tokens } = await oauth2Client.getToken(code);
        console.log('✅ Tokens generados correctamente:', tokens);

        // Opcional: guardar tokens en tu base de datos o archivo .env
        // Ejemplo temporal:
        res.send(`
            <h2>Autorización completada correctamente ✅</h2>
            <p>Guarda este refresh token en tu .env:</p>
            <pre>${tokens.refresh_token}</pre>
            <p>Access Token:</p>
            <pre>${tokens.access_token}</pre>
    `);
    } catch (error) {
        console.error('❌ Error obteniendo tokens:', error);
        res.status(500).send('Error obteniendo los tokens.');
    }
});

//---------------------------------------------------------NODE CRON JOBS ---------------------------------------------------------------------------------

// Eliminación de usuarios no verificados y limpieza de códigos de recuperación
cron.schedule('*/15 * * * *', async () => {

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

export default router;
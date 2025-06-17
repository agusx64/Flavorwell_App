var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var cron = require('node-cron');
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
var router = express.Router()

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
            subject: 'Verifica tu cuenta de Flavorwell',
            html: `<p>Hola ${username},</p>
                    <p>Gracias por registrarte en Flavorwell. Por favor haz clic en el siguiente enlace para verificar tu correo:</p>
                    <a href="${verificationURL}">${verificationURL}</a>`

        });

        res.status(200).send({ success: true, message: "Usuario registrado con éxito. Por favor verifica tu correo electrónico." });

    } catch (error) {

        console.error("Error al registrar:", error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });

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

        console.log(token);

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

            return res.status(404).json({ success: false, message: 'Correo o usuario no encontrado en la base de datos' });

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
            html: `<p>Your verification code is: <strong style="font-size: 20px">${resetCode}</strong></p>
                    <p>This code will expire in 10 minutes</p>`

        });

        // Respuesta existosa del servidor al cliente
        res.status(200).json({ success: true, message: `Codigo enviando a ${recoverInfo}`});

    // Intercepción de errorres
    } catch(error){

        console.error('Error enviando codigo de verificacion', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });

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



//---------------------------------------------------------NODE CRON JOBS ---------------------------------------------------------------------------------

// Eliminación de usuarios no verificados y limpieza de códigos de recuperación
cron.schedule('*/10 * * * *', async () => {

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

    } catch (err) {

        console.error("[CRON] Error en la tarea programada:", err);

    }

});




module.exports = router;
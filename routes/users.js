var express = require('express');
var mysql = require('mysql2/promise');
require('dotenv').config();
var cron = require('node-cron');
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

router.post('/register_user', async function(req, res) {

    const register_data = req.body
    console.log(register_data);

    const { username, mail, pass } = req.body;

    // try{

    //     //Password encryptation
    //     const hashedPassword = await bcrypt.hash(pass, 10);

    //     //Verification token
    //     const token = uuidv4();

    //     // Expiration date
    //     const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    //     //Query
    //     const query = `
    //         INSERT INTO users (username, email, password, verification_token, expires_at)
    //         VALUES (?, ?, ?, ?, ?)
    //     `;

    //     conection.query(query, [username, mail, hashedPassword, token, expiresAt], function(err, result) {

    //         if (err) throw err;
    //         console.log("User registered successfully:", result);

    //     });

    //     //Email verification
    //     const transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.MAIL_HOST,
    //             pass: process.env.MAIL_PASSWORD,
    //         }
    //     });

    //     const verificationURL = `${restHost}/verify_email?token=${token}`

    //     await transporter.sendMail({

    //         from: 'Flavorwell <agustin.mora.trinidad@gmail.com>',
    //         to: mail,
    //         subject: 'Verifica tu cuenta de Flavorwell',
    //         html: `<p>Hola ${username},</p>
    //                 <p>Gracias por registrarte en Flavorwell. Por favor haz clic en el siguiente enlace para verificar tu correo:</p>
    //                 <a href="${verificationURL}">${verificationURL}</a>`

    //     });

    //     res.status(200).send({ success: true, message: "Usuario registrado con éxito. Por favor verifica tu correo electrónico." });

    //     setTimeout( async () => {

    //         const [rows] = await conection.query(

    //             'SELECT * FROM users WHERE verification_token = ?', [token]
    //         )

    //         if(rows.length && !rows[0].verified) {

    //             await conection.query(
    //                 "DELETE FROM users WHERE verification_token = ?", [token]
    //             )
    //             console.log(`Usuario con token ${token} eliminado por no verificar.`);

    //         }

    //     }, 10 * 60 * 1000);

    // } catch (error) {

    //     console.error("Error al registrar:", error);
    //     res.status(500).json({ success: false, error: 'Error interno del servidor' });

    // }

});



module.exports = router;
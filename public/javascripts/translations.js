document.addEventListener('DOMContentLoaded', () => {
    setLanguage();
})

const translations = {
    en: {

        // Pantalla 'Get Started
        the_global_restaurant: "The global restaurant",
        your_favorite_dishes: "Your favorite dishes at your fingerstips",
        get_started: "Get started",

        // Login
        welcome: "Welcome",
        begin_exploring: "To begin exploring, let's log in",
        login_email_label: "Email",
        login_email_placeholder: "Enter your email address",
        login_password_label: "Password",
        login_password_placeholder: "Type your password",
        sign_up_link: "Sign Up",
        log_in_button: "Log In",
        forgot_password_link: "Forgot password ?",

        // Registro
        sign_up_header: "Sign Up",
        su_welcome_to: "Welcome to",
        su_email: "Email",
        su_email_placeholder: "Enter your email address",
        su_username: "Username",
        su_username_placeholder: "Enter your username",
        su_password: "Password",
        su_password_placeholder: "Type a secure password",
        su_sign_up: "Sign Up",
        su_succesfull: "You have successfully registered",
        su_back_login: "Back to login",
        su_try_again: "Try Again",


    },

    es: {

        // Pantalla 'Get Started
        the_global_restaurant: "El restaurante global",
        your_favorite_dishes: "Tus platillos favoritos al alcance de tus manos",
        get_started: "Comenzar",

        // Login
        welcome: "Bienvenido",
        begin_exploring: "Para comenzar a explorar, vamos a iniciar sesión",
        login_email_label: "Correo electronico",
        login_email_placeholder: "Escribe tu correo electronico",
        login_password_label: "Contraseña",
        login_password_placeholder: "Escribe tu contraseña",
        sign_up_link: "Registrarse",
        log_in_button: "Iniciar sesión",
        forgot_password_link: "Olvide mi contraseña ?",

        // Registro
        sign_up_header: "Registrarse",
        su_welcome_to: "Bienvenido a",
        su_email: "Correo electronico",
        su_email_placeholder: "Escribe tu correo electronico",
        su_username: "Nombre de usuario",
        su_username_placeholder: "Escribe tu nombre de usuario",
        su_password: "Contraseña",
        su_password_placeholder: "Escribe una constraseña segura",
        su_sign_up: "Registrarse",
        su_succesfull: "Te has registrado exitosamente",
        su_back_login: "Volver al inicio de sesión",
        su_try_again: "Intentar de nuevo",


    }
}

function setLanguage() {

    const lang = localStorage.getItem('preferred_lang')
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {

        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {

            if (element.tagName === 'INPUT') {

                element.placeholder = translations[lang][key]

            } else {

                element.textContent = translations[lang][key]

            }

        }

    });

}
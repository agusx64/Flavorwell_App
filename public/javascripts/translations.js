document.addEventListener('DOMContentLoaded', () => {

    // Texto normal
    document.querySelectorAll('[data-i18n]').forEach(el => {
        i18n.register(el, el.dataset.i18n);
    });

    // Placeholders (input y textarea)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        i18n.register(el, el.dataset.i18nPlaceholder, 'placeholder');
    });

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

        // Recuperación de contraseña
        rc_recover_account: "Recover account",
        rc_forgot_password: "Forgot password ?",
        rc_reset_quickly: "Enter your email to reset your password quickly",
        rc_email: "Email",
        rc_enter_your_email: "Enter your email",
        rc_send_mail: "Send email",
        rc_success: "The recovery email has been sent successfully",
        rc_set_new: "Set new password",
        rc_try_again: "Try again",

        // Password reset
        pr_recover_account: "Recover password",
        pr_password_reset: "Password reset",
        pr_security_code: "Please enter the security code and your new password to confirm the change.",
        pr_type_code: "Type your security code",
        pr_confirm_email: "Confirm your email",
        pr_enter_email: "Enter your email",
        pr_type_new_password: "Type your new password",
        pr_new_password: "Enter your new password",
        pr_update_password: "Update password",
        pr_try_again: "Try again",
        pr_success_text: "Your password has been succesfully updated",
        pr_login: "Back to login",

        // Main dashboard
        ds_welcome: "Welcome",
        ds_looking: "Are you looking for a dish ?",
        ds_search: "Search recipes",
        ds_explore: "Explore new recipes",
        ds_categories: "Food categories",
        ds_recommended: "Recommended for you",
        ds_community: "Explore community dishes",
        ds_vegan: "Vegan",
        ds_desserts: "Desserts",
        ds_dishes: "Dishes",
        ds_breakfast: "Breakfasts",

        // Vegan list
        vl_title: "Vegan recipes",

        // Desserts list
        dss_list: "Desserts",

        // Dishes list
        md_list: "Main dishes",

        // Breakfast list
        brk_list: "Breakfasts",

        // Saved list
        saved_list: "Saved recipes",

        // Recipe register
        rg_header: "Recipe publisher",
        rg_title: "Up & Share",
        rg_description: "Share your own recipes with the flavorwell community",
        rg_choose: "Choose the category of your recipe",
        rg_select: "Select a category",
        rg_option1: "Breakfast",
        rg_option2: "Desserts",
        rg_option3: "Main Dish",
        rg_option4: "Vegan",
        rg_name: "Type the name of your recipe",
        rg_example: "Example: Cheese fingers",
        rg_description: "Recipe description",
        rg_description_r: "Recipe description",
        rg_type_d: "Write your description (max. 150 words)",
        rg_find: "Find your ingredients",
        rg_search: "Search your ingredients",
        rg_add: "Add your recipe steps",
        rg_describe_i: "Type your steps",
        rg_upload: "Upload your image recipe",
        rg_share_now: "Share recipe",
        rg_thanks: "Thank you for sharing your recipe. We will review it for publication.",
        rg_dashboard: "Got to dashboard",

        // Account viewer
        av_title: "My account",
        av_edit: "Edit profile",
        av_footprint: "My footprint at flavorwell",
        av_saved: "Saved recipes",
        av_my: "My recipes",
        av_preferences: "Preferences",
        av_profile: "My profile",
        av_log: "Log out",
        av_shure: "Are you sure you want to log out?",
        av_yes: "Yes",
        av_no: "No",
        av_username: "Username",
        av_email: "Email",
        av_picture: "Profile picture",
        av_cover: "Cover picture",
        av_save_changes: "Save changes",
        av_cancel_changes: "Cancel changes",

        // Settings
        set_title: "Settings",
        set_about: "About Flavorwell",
        set_profile: "My profile",
        set_don: "Donate",
        set_logout: "Log out",
        set_shure: "Are you shure you want to log out?",
        set_lang: "Choose language",

        // Recipe viewer
        rv_title: "Recipe viewer",
        rv_by: "By:",
        rv_description: "Description",
        rv_date: "Date:",
        rv_category: "Category:",
        rv_items: "Items:",
        rv_ingr: "Ingredients",
        rv_ins: "Instructions",
        com_text: "Show comments",
        comment_textarea: "Write a comment",
        add_comment: "Add comment",

        // Profile viewer
        pv_income: "Income date",
        pv_upload: "Published recipes",
        pv_saved: "Saved recipes",
        pv_explore: "Explore my recipes",

        // My recipes
        mr_title: "My recipes",

        // About
        ab_title: "About Us",
        ab_about: "About Flavorwell",
        ab_ab_text: "Flavorwell is a digital platform designed to transform the way people discover, prepare, and enjoy their everyday meals. Combining modern technology with an intuitive cooking experience, Flavorwell offers a diverse library of recipes organized by dish type, dietary preferences, and preparation time, all in a single app.",
        ab_mision: "Mision",
        ab_mision_text: "Our mission is to democratize access to delicious, healthy, and personalized food through a practical, accessible, and user-friendly digital solution for everyone, from cooking novices to more experienced cooks.",
        ab_approach: "Approach and values",
        ab_promote: "Flavorwell promotes",
        ab_promote_1: "Access to quality food regardless of culinary experience or time constraints.",
        ab_promote_2: "Inclusive options, such as vegan, vegetarian, or low-calorie recipes.",
        ab_promote_3: "Continuously updated, with new recipes and improvements based on user feedback.",
        ab_promote_4: "Sustainable and scalable development, following good programming and web architecture practices.",
        ab_behind: "Who's behind it?",
        ab_behind_text: "Flavorwell is a project developed by Agustin Mora, a computer systems engineer with experience in full-stack web development. This project represents the fusion of two passions: technology and gastronomy, and seeks to continue evolving as a useful solution with a real impact on users' lives.",
        ab_collab: "Shall we collaborate?",
        ab_collab_text: "Do you have a recipe you'd like to share? Are you a food content creator or developer interested in contributing?",
        ab_collab_call: "We're open to collaborations!",

        // Choose language
        chl_title: "Language",
        chl_new: "Set a new language",
        chl_your: "Choose your language",
        chl_any: "Your language preference can be changed at any time in Settings",
        chl_cont: "Continue"

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

        // Recuperación de contraseña
        rc_recover_account: "Recuperar contraseña",
        rc_forgot_password: "¿Olvidó su contraseña?",
        rc_reset_quickly: "Ingresa tu correo electrónico para restablecer tu contraseña rápidamente",
        rc_email: "Correo electronico",
        rc_enter_your_email: "Escribe tu correo electronico",
        rc_send_mail: "Enviar correo electronico",
        rc_success: "El correo electrónico de recuperación se ha enviado correctamente",
        rc_set_new: "Establecer nueva contraseña",
        rc_try_again: "Intentar de nuevo",

        // Password reset
        pr_recover_account: "Recuperar cuenta",
        pr_password_reset: "Restablecer contraseña",
        pr_security_code: "Ingrese el código de seguridad y su nueva contraseña para confirmar el cambio.",
        pr_type_code: "Escriba su código de seguridad",
        pr_confirm_email: "Confirma tu correo electrónico",
        pr_enter_email: "Escribe tu correo electrónico",
        pr_type_new_password: "Escribe tu nueva contraseña ",
        pr_new_password: "Escribe tu nueva contraseña",
        pr_update_password: "Actualizar contraseña",
        pr_try_again: "Intentar de nuevo",
        pr_success_text: "Tu contraseña ha sido actualizada correctamente",
        pr_login: "Iniciar sesión",

        // Main dashboard
        ds_welcome: "Bienvenido",
        ds_looking: "¿Estas buscando un plato?",
        ds_search: "Buscar recetas",
        ds_explore: "Explora las nuevas recetas",
        ds_categories: "Categorias",
        ds_recommended: "Recomendado para ti",
        ds_community: "Explora los platillos de la comunidad",
        ds_vegan: "Veganos",
        ds_desserts: "Postres",
        ds_dishes: "Fuertes",
        ds_breakfast: "Desayunos",

        // Vegan list
        vl_title: "Recetas veganas",

        // Desserts list
        dss_list: "Postres",

        // Dishes list
        md_list: "Platillos fuertes",

        // Breakfast list
        brk_list: "Desayunos",

        // Saved list
        saved_list: "Recetas guardadas",

        // Recipe register
        rg_header: "Publicador de recetas",
        rg_title: "Sube y comparte",
        rg_description: "Comparte tus propias recetas con la comunidad de flavorwell",
        rg_choose: "Elije la categoria de tu receta",
        rg_select: "Selecciona una categoria",
        rg_option1: "Desayuno",
        rg_option2: "Postre",
        rg_option3: "Plato fuerte",
        rg_option4: "Vegano",
        rg_name: "Escribe el nombre de tu receta",
        rg_example: "Ejemplo: Pozole de lavadero",
        rg_description_r: "Descripción de la receta",
        rg_type_d: "Escribe tu descripción (max. 150 palabras)",
        rg_find: "Encuentra tus ingredientes",
        rg_search: "Buscar ingredientes...",
        rg_add: "Agrega los pasos de tu receta",
        rg_describe_i: "Escribe aqui los pasos",
        rg_upload: "Sube la imagen de tu receta",
        rg_share_now: "Compartir receta",
        rg_thanks: "Gracias por compartir tu receta. La revisaremos para su publicación.",
        rg_dashboard: "Ir a inicio",

        // Account viewer
        av_title: "Mi cuenta",
        av_edit: "Editar perfil",
        av_footprint: "Mi huella en flavorwell",
        av_saved: "Recetas guardadas",
        av_my: "Mis recetas",
        av_preferences: "Preferencias",
        av_profile: "Mi perfil",
        av_log: "Cerrar sesión",
        av_shure: "¿Estas seguro de cerrar sesión?",
        av_yes: "Si",
        av_no: "No",
        av_username: "Nombre de usuario",
        av_email: "Correo electrónico",
        av_picture: "Foto de perfil",
        av_cover: "Foto de portada",
        av_save_changes: "Guardar cambios",
        av_cancel_changes: "Cancelar cambios",

        // Settings
        set_title: "Ajustes",
        set_about: "Acerca de flavorwell",
        set_profile: "Mi perfil",
        set_don: "Donar",
        set_logout: "Cerrar sesión",
        set_shure: "¿Cerrar sesión?",
        set_lang: "Cambiar idioma",

        // Recipe viewer
        rv_title: "Visor de recetas",
        rv_by: "Por:",
        rv_description: "Descripción",
        rv_date: "Fecha:",
        rv_category: "Categoria:",
        rv_items: "Items:",
        rv_ingr: "Ingredientes",
        rv_ins: "Instrucciones",
        com_text: "Mostrar comentarios",
        comment_textarea: "Escribe un comentario",
        add_comment: "Agregar comentario",

        // Profile viewer
        pv_income: "Fecha de ingreso",
        pv_upload: "Recetas publicadas",
        pv_saved: "Recetas guardadas",
        pv_explore: "Explora mis recetas",

        // My recipes
        mr_title: "Mis recetas",

        // About
        ab_title: "Acerca de",
        ab_about: "Sobre Flavorwell",
        ab_ab_text: "Flavorwell es una plataforma digital diseñada para transformar la forma en que las personas descubren, preparan y disfrutan sus comidas diarias. Combinando tecnología moderna con una experiencia culinaria intuitiva, Flavorwell ofrece una variada biblioteca de recetas organizadas por tipo de plato, preferencias dietéticas y tiempo de preparación, todo en una sola aplicación.",
        ab_mision: "Misión",
        ab_mision_text: "La misión principal es democratizar el acceso a una alimentación deliciosa, saludable y personalizada a través de una solución digital práctica, accesible y fácil de usar para todos, desde los principiantes en la cocina hasta los cocineros más experimentados.",
        ab_approach: "Enfoque y valores",
        ab_promote: "Flavorwell promueve...",
        ab_promote_1: "Acceso a alimentos de calidad independientemente de la experiencia culinaria o las limitaciones de tiempo.",
        ab_promote_2: "Opciones inclusivas, como recetas veganas, vegetarianas o bajas en calorías.",
        ab_promote_3: "Continuamente actualizado, con nuevas recetas y mejoras basadas en el feedback de los usuarios.",
        ab_promote_4: "Desarrollo sustentable y escalable, siguiendo buenas prácticas de programación y arquitectura web.",
        ab_behind: "¿Quien esta detras?",
        ab_behind_text: "Flavorwell es un proyecto desarrollado por Agustín Mora, ingeniero de sistemas informáticos con experiencia en desarrollo web full-stack. Este proyecto representa la fusión de dos pasiones: la tecnología y la gastronomía, y busca seguir evolucionando como una solución útil con un impacto real en la vida de los usuarios.",
        ab_collab: "¿Te gustaria colaborar?",
        ab_collab_text: "¿Tienes una receta que te gustaría compartir? ¿Eres creador o desarrollador de contenido gastronómico y te interesa colaborar?",
        ab_collab_call: "Estoy abierto a colaboraciones!",

        // Choose language
        chl_title: "Idioma",
        chl_new: "Establece un nuevo idioma",
        chl_your: "Elije un nuevo idioma",
        chl_any: "Tu preferencia de idioma se puede cambiar en cualquier momento en Configuración",
        chl_cont: "Continuar"

    }

}

const i18n = {

    lang: localStorage.getItem('preferred_lang') || 'en',
    elements: new Map(),

    t(key) {

        return translations[this.lang]?.[key] ?? key;

    },

    register(element, key, type = 'text') {

        this.elements.set(element, { key, type });
        this.apply(element);

    },

    apply(element) {

        const { key, type } = this.elements.get(element);
        const value = this.t(key);

        if (type === 'placeholder') {

            element.placeholder = value;

        } else {

            element.textContent = value;

        }

    },

    setLanguage(lang) {

        this.lang = lang;
        localStorage.setItem('preferred_lang', lang);

        this.elements.forEach((_, element) => {

            this.apply(element);

        });

    }

};
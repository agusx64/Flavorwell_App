const getStartedButton = document.getElementById('started-button');
const restHost = 'http://localhost:3000';

// Función para verificar si el token es válido
async function checkSession() {

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {

        // Petición de validación de token
        const res = await fetch(`${restHost}/users/verify_token`, {

            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        if (res.ok) {

            return true; // Token válido

        } else {

            localStorage.removeItem('token'); // Token inválido, eliminar
            return false;

        }

    } catch (error) {

        console.error(error);
        return false;

    }

}

getStartedButton.addEventListener('click', async () => {

    const loggedIn = await checkSession();

    if (loggedIn) {

        window.location.href = '/html/user_dashboard.html';

    } else {

        window.location.href = '/html/login.html';

    }
    
});

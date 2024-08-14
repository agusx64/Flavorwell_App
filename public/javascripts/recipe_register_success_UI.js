document.addEventListener('DOMContentLoaded', function() {

    let redirect_userdashboard = document.getElementById('user_dashboard');
    
    redirect_userdashboard.addEventListener('click', function() {

        window.location.href = '/start'

    });

});
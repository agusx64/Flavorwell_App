window.onload = function () {
    setTimeout(function () {
        window.open('./html/started.html', '_self');
    }, 3000);
};

document.addEventListener('DOMContentLoaded', async () => {
    if (window.Capacitor?.isNativePlatform?.()) {
        const { CapacitorNavigationBar } = window.Capacitor.Plugins;

        try {
            await CapacitorNavigationBar.setNavigationBarColor({
                color: '#F7B32B',
                darkButtons: true
            });
        } catch (err) {
            console.warn('No se pudo cambiar la navigation bar:', err);
        }
    } else {
        console.log('No es entorno nativo. Ignorando configuración de navigation bar.');
    }
});


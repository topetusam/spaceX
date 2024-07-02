// navigation.js

document.addEventListener("DOMContentLoaded", () => {
    const moduleLinks = document.getElementById('moduleLinks');
    const moduleContent = document.getElementById('moduleContent');

    moduleLinks.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que se recargue la página al hacer clic en el enlace

        const targetModule = event.target.getAttribute('href').substring(1); // Obtiene el ID del módulo

        import(`./modules/${targetModule}.js`)
            .then(module => {
                module.loadModuleData(moduleContent);
            })
            .catch(error => {
                console.error(`Error loading module ${targetModule}:`, error);
            });
    });
});


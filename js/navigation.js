document.addEventListener("DOMContentLoaded", () => {
    const moduleLinks = document.getElementById('moduleLinks');
    const moduleContent = document.getElementById('moduleContent');

    moduleLinks.addEventListener('click', (event) => {
        event.preventDefault(); 

        const targetModule = event.target.getAttribute('href').substring(1);

        import(`./modules/${targetModule}.js`)
            .then(module => {
                module.loadModuleData(moduleContent, 1); // Cargar la primera página por defecto
            })
            .catch(error => {
                console.error(`Error loading module ${targetModule}:`, error);
            });
    });
});

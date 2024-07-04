document.addEventListener("DOMContentLoaded", () => {
    const moduleLinks = document.querySelectorAll('#moduleLinks a'); 
    const moduleContent = document.getElementById('moduleContent');

    
    const loadModuleAndFirstPage = (moduleName) => {
        import(`./modules/${moduleName}.js`)
            .then(module => {
                module.loadModuleData(moduleContent, 1); 
            })
            .catch(error => {
                console.error(`Error loading module ${moduleName}:`, error);
            });
    };

   
    moduleLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 

            const targetModule = event.target.getAttribute('href').substring(1); 
            loadModuleAndFirstPage(targetModule); 
        });
    });


    const defaultModule = 'rockets';
    loadModuleAndFirstPage(defaultModule);
});

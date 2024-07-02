// js/modules/cores.js

let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/cores")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderCores(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching cores data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar una 'core' por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderCores(data, container) {
    const coresHtml = data.map(core => `
        <div class="core">
            <h2>${core.serial}</h2>
            <p>Block: ${core.block}</p>
            <p>Status: ${core.status}</p>
            <p>Original Launch: ${core.original_launch ? core.original_launch : 'N/A'}</p>
            <p>Reuse Count: ${core.reuse_count}</p>
            <p>RTLS Attempts: ${core.rtls_attempts}</p>
            <p>RTLS Landings: ${core.rtls_landings}</p>
            <p>ASDS Attempts: ${core.asds_attempts}</p>
            <p>ASDS Landings: ${core.asds_landings}</p>
            <p>Details: ${core.details}</p>
        </div>
    `).join('');

    container.innerHTML = coresHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar una 'core' por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `
        <div id="paginationCores">
            <button id="prevPageCores" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
            <span>Página ${currentPage} de ${totalPages}</span>
            <button id="nextPageCores" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', paginationHtml);

    document.getElementById('prevPageCores').addEventListener('click', () => {
        if (currentPage > 1) {
            loadModuleData(container, currentPage - 1);
        }
    });

    document.getElementById('nextPageCores').addEventListener('click', () => {
        if (currentPage < totalPages) {
            loadModuleData(container, currentPage + 1);
        }
    });
}

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
    const itemsPerPage = 1; // Mostrar un 'core' por página
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
    const itemsPerPage = 1; // Mostrar un 'core' por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationCores">`;
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="page-number" data-page="${i}">${i}</button>`;
    }
    paginationHtml += `</div>`;

    container.insertAdjacentHTML('beforeend', paginationHtml);

    document.querySelectorAll('.page-number').forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.getAttribute('data-page'));
            loadModuleData(container, page);
        });
    });
}

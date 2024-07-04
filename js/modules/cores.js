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
    const coresHtml = `
        <div class="image-container">
            <img src="../storage/img/naveop.svg" alt="SpaceX Image">
        </div>
        <div class="core-container">
            <table class="core-table">
                <tr>
                    <th>Serial</th>
                    <th>Block</th>
                    <th>Status</th>
                    <th>Original Launch</th>
                    <th>Reuse Count</th>
                    <th>RTLS Attempts</th>
                    <th>RTLS Landings</th>
                    <th>ASDS Attempts</th>
                    <th>ASDS Landings</th>
                    <th>Details</th>
                </tr>
                ${data.map(core => `
                    <tr>
                        <td>${core.serial}</td>
                        <td>${core.block}</td>
                        <td>${core.status}</td>
                        <td>${core.original_launch ? core.original_launch : 'N/A'}</td>
                        <td>${core.reuse_count}</td>
                        <td>${core.rtls_attempts}</td>
                        <td>${core.rtls_landings}</td>
                        <td>${core.asds_attempts}</td>
                        <td>${core.asds_landings}</td>
                        <td>${core.details}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
    `;

    container.innerHTML = coresHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un 'core' por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationAll">`;
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

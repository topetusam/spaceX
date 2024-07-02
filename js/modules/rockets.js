// js/modules/rockets.js

let currentPage = 1;
const itemsPerPage = 1; // Número de elementos por página

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/rockets")
        .then(response => response.json())
        .then(data => {
            const paginatedData = paginate(data, currentPage, itemsPerPage);
            renderRockets(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching rocket data:", error);
        });
}

function paginate(items, page, itemsPerPage) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderRockets(data, container) {
    const rocketsHtml = data.map(rocket => `
        <div class="rocket">
            <h2>${rocket.name}</h2>
            <p>Description: ${rocket.description}</p>
            <p>Height: ${rocket.height.meters} meters</p>
            <p>Diameter: ${rocket.diameter.meters} meters</p>
            <p>Mass: ${rocket.mass.kg} kg</p>
            <p>Payload Weights: ${rocket.payload_weights.map(pw => `${pw.name}: ${pw.kg} kg`).join(', ')}</p>
            <p>First Flight: ${rocket.first_flight}</p>
            <p>Cost per Launch: $${rocket.cost_per_launch.toLocaleString()}</p>
            <p>Success Rate: ${rocket.success_rate_pct}%</p>
            <p>Engines: ${rocket.engines.number} (${rocket.engines.type})</p>
            <img src="${rocket.flickr_images[0]}" alt="${rocket.name} image" style="width: 300px;">
        </div>
    `).join('');

    container.innerHTML = rocketsHtml;
}

function setupPagination(totalItems, container) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `
        <div id="paginationRockets">
            <button id="prevPageRockets" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
            <span>Página ${currentPage} de ${totalPages}</span>
            <button id="nextPageRockets" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', paginationHtml);

    document.getElementById('prevPageRockets').addEventListener('click', () => {
        if (currentPage > 1) {
            loadModuleData(container, currentPage - 1);
        }
    });

    document.getElementById('nextPageRockets').addEventListener('click', () => {
        if (currentPage < totalPages) {
            loadModuleData(container, currentPage + 1);
        }
    });
}

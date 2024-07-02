let currentPage = 1;
const limit = 1; // Mostrar un Roadster por página

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    const offset = (currentPage - 1) * limit;

    const queryUrl = `https://api.spacexdata.com/v4/roadster/query?limit=${limit}&offset=${offset}`;

    fetch(queryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderRoadster(data, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching Roadster data:", error);
        });
}

function renderRoadster(data, container) {
    const roadsterHtml = data.map(roadster => `
        <div class="roadster">
            <h2>${roadster.name}</h2>
            <p>Launch Date: ${roadster.launch_date_utc}</p>
            <p>Earth Distance: ${roadster.earth_distance_km} km</p>
            <p>Mars Distance: ${roadster.mars_distance_km} km</p>
            <p>Details: ${roadster.details}</p>
            <p>Wikipedia: <a href="${roadster.wikipedia}" target="_blank">${roadster.wikipedia}</a></p>
        </div>
    `).join('');

    container.innerHTML = roadsterHtml;
}

function setupPagination(totalItems, container) {
    const totalPages = Math.ceil(totalItems / limit);

    let paginationHtml = `
        <div id="paginationAll">
            <button id="prevPageRoadster" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
            <span>Página ${currentPage} de ${totalPages}</span>
            <button id="nextPageRoadster" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', paginationHtml);

    document.getElementById('prevPageRoadster').addEventListener('click', () => {
        if (currentPage > 1) {
            loadModuleData(container, currentPage - 1);
        }
    });

    document.getElementById('nextPageRoadster').addEventListener('click', () => {
        if (currentPage < totalPages) {
            loadModuleData(container, currentPage + 1);
        }
    });
}

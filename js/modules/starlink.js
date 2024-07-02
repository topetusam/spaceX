// js/modules/starlink.js
// js/modules/starlink.js

let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/starlink")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderStarlinks(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching Starlink data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un elemento por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderStarlinks(data, container) {
    const starlinkHtml = data.map(link => `
        <div class="starlink">
            <h2>${link.spaceTrack.OBJECT_NAME}</h2>
            <p>Current Altitude: ${link.spaceTrack.MEAN_ALTITUDE_KM} km</p>
            <p>Latitude: ${link.latitude}</p>
            <p>Longitude: ${link.longitude}</p>
            <p>Spacecraft Type: ${link.spaceTrack.OBJECT_TYPE}</p>
            <p>NORAD ID: ${link.spaceTrack.OBJECT_ID}</p>
        </div>
    `).join('');

    container.innerHTML = starlinkHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un elemento por página
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

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
            ${link.spaceTrack.IMAGE ? `<div class="starlink-image"><img src="${link.spaceTrack.IMAGE}" alt="${link.spaceTrack.OBJECT_NAME}" style="max-width: 100%;" referrerPolicy="no-referrer"></div>` : ''}
            <div class="starlink-table">
                <table>
                    <tr>
                        <th>Current Altitude</th>
                        <td>${link.spaceTrack.MEAN_ALTITUDE_KM} km</td>
                    </tr>
                    <tr>
                        <th>Latitude</th>
                        <td>${link.latitude}</td>
                    </tr>
                    <tr>
                        <th>Longitude</th>
                        <td>${link.longitude}</td>
                    </tr>
                    <tr>
                        <th>Spacecraft Type</th>
                        <td>${link.spaceTrack.OBJECT_TYPE}</td>
                    </tr>
                    <tr>
                        <th>NORAD ID</th>
                        <td>${link.spaceTrack.OBJECT_ID}</td>
                    </tr>
                    <tr>
                        <th>Launch Date</th>
                        <td>${link.spaceTrack.LAUNCH_DATE}</td>
                    </tr>
                    <tr>
                        <th>Launch Vehicle</th>
                        <td>${link.spaceTrack.LAUNCH_VEHICLE}</td>
                    </tr>
                    <tr>
                        <th>Orbit</th>
                        <td>${link.spaceTrack.ORBIT}</td>
                    </tr>
                    <tr>
                        <th>Apogee Height</th>
                        <td>${link.spaceTrack.APOGEE_HEIGHT_KM} km</td>
                    </tr>
                    <tr>
                        <th>Perigee Height</th>
                        <td>${link.spaceTrack.PERIGEE_HEIGHT_KM} km</td>
                    </tr>
                </table>
            </div>
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

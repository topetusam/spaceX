let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/capsules")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderCapsules(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching capsule data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar una cápsula por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderCapsules(data, container) {
    const capsulesHtml = data.map(capsule => `
        <div class="capsule-container">
            <h2>${capsule.name || capsule.serial}</h2>
            <table>
                <tr>
                    <th>Type</th>
                    <td>${capsule.type}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>${capsule.status}</td>
                </tr>
                <tr>
                    <th>Details</th>
                    <td>${capsule.details || "No details available"}</td>
                </tr>
                <tr>
                    <th>Reuse Count</th>
                    <td>${capsule.reuse_count}</td>
                </tr>
                <tr>
                    <th>Water Landings</th>
                    <td>${capsule.water_landings}</td>
                </tr>
                <tr>
                    <th>Land Landings</th>
                    <td>${capsule.land_landings}</td>
                </tr>
                <tr>
                    <th>Serial Number</th>
                    <td>${capsule.serial}</td>
                </tr>
                <tr>
                    <th>Original Launch</th>
                    <td>${capsule.original_launch ? new Date(capsule.original_launch).toLocaleDateString() : "Unknown"}</td>
                </tr>
                <tr>
                    <th>Missions</th>
                    <td>${capsule.missions ? capsule.missions.map(mission => mission.name).join(', ') : "None"}</td>
                </tr>
                <tr>
                    <th>Details</th>
                    <td>${capsule.details || "No details available"}</td>
                </tr>
            </table>
            <img src="https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg" alt="${capsule.name || "Capsule"} image" referrerpolicy="no-referrer">
        </div>
    `).join('');

    container.innerHTML = capsulesHtml;
}


function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar una cápsula por página
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

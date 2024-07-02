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
        <div class="capsule">
            <h2>${capsule.name}</h2>
            <p>Type: ${capsule.type}</p>
            <p>Status: ${capsule.status}</p>
            <p>Details: ${capsule.details}</p>
            <p>Reuse Count: ${capsule.reuse_count}</p>
            <p>Water Landings: ${capsule.water_landings}</p>
            <p>Land Landings: ${capsule.land_landings}</p>
            <p>Serial Number: ${capsule.serial}</p>
            <img src="https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg" alt="${capsule.name} image" style="width: 300px;" referrerpolicy="no-referrer">
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

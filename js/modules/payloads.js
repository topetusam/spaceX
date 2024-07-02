let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/payloads")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderPayloads(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching payloads data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un payload por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderPayloads(data, container) {
    const payloadsHtml = data.map(payload => `
        <div class="payload">
            <h2>${payload.name}</h2>
            <p>Type: ${payload.type}</p>
            <p>Customers: ${payload.customers.join(', ')}</p>
            <p>Nationality: ${payload.nationality}</p>
            <p>Manufacturer: ${payload.manufacturer}</p>
            <p>Orbit: ${payload.orbit}</p>
            <p>Reference System: ${payload.reference_system}</p>
            <p>Mass: ${payload.mass_kg} kg</p>
            <p>Details: ${payload.details}</p>
        </div>
    `).join('');

    container.innerHTML = payloadsHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un payload por página
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

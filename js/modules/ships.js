// js/modules/ships.js

let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/ships")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderShips(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching ships data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un elemento por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderShips(data, container) {
    const shipsHtml = data.map(ship => `
        <div class="ship">
            <h2>${ship.name}</h2>
            <p>Type: ${ship.type}</p>
            <p>Roles: ${ship.roles.join(', ')}</p>
            <p>Active: ${ship.active ? 'Yes' : 'No'}</p>
            <p>Home Port: ${ship.home_port}</p>
            <p>Details: ${ship.details}</p>
            <p>Image: <img src="${ship.image}" alt="${ship.name}" style="max-width: 300px;"></p>
        </div>
    `).join('');

    container.innerHTML = shipsHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un elemento por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationShips">`;
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

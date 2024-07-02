let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/dragons")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderDragons(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching dragons data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un dragón por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderDragons(data, container) {
    const dragonsHtml = data.map(dragon => `
        <div class="dragon">
            <h2>${dragon.name}</h2>
            <p>Active: ${dragon.active ? 'Yes' : 'No'}</p>
            <p>Crew Capacity: ${dragon.crew_capacity}</p>
            <p>First Flight: ${dragon.first_flight}</p>
            <p>Diameter: ${dragon.diameter.meters} meters</p>
            <p>Height with Trunk: ${dragon.height_w_trunk.meters} meters</p>
            <p>Pressurized Capsule: ${dragon.pressurized_capsule ? 'Yes' : 'No'}</p>
            <p>Heat Shield Material: ${dragon.heat_shield.material}</p>
            <p>Wikipedia: <a href="${dragon.wikipedia}" target="_blank">${dragon.wikipedia}</a></p>
        </div>
    `).join('');

    container.innerHTML = dragonsHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un dragón por página
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

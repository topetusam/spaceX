let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/launchpads")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderLaunchpads(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching launchpads data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar una plataforma de lanzamiento por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderLaunchpads(data, container) {
    const launchpadsHtml = data.map(launchpad => `
        <div class="launchpad">
            <div class="launchpad-image">
                <img src="/storage/img/naveop.svg">
            </div>
            <div class="launchpad-info">
                <h2>${launchpad.name}</h2>
                <p>Full Name: ${launchpad.full_name}</p>
                <p>Location: ${launchpad.locality}, ${launchpad.region}</p>
                <p>Details: ${launchpad.details}</p>
                <p>Successful Landings: ${launchpad.successful_landings}</p>
                <p>Attempted Launches: ${launchpad.attempted_launches}</p>
                <p>Successful Launches: ${launchpad.successful_launches}</p>
                <p>Wikipedia: <a href="${launchpad.wikipedia}" target="_blank">${launchpad.wikipedia}</a></p>
            </div>
        </div>
    `).join('');

    container.innerHTML = launchpadsHtml;
}


function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar una plataforma de lanzamiento por página
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

// js/modules/launches.js

let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/launches")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderLaunches(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching launches data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un lanzamiento por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderLaunches(data, container) {
    const launchesHtml = data.map(launch => `
        <div class="launch">
        <div class="image-container">
                <img src="storage/img/naveop.svg" alt="SpaceX Image">
            </div>
            <h2>${launch.name}</h2>
            <p>Date UTC: ${launch.date_utc}</p>
            <p>Date Local: ${launch.date_local}</p>
            <p>Rocket: ${launch.rocket}</p>
            <p>Success: ${launch.success ? 'Yes' : 'No'}</p>
            <p>Details: ${launch.details}</p>
            <p>Links:
                <ul>
                    <li>Article: <a href="${launch.links.article}" target="_blank">${launch.links.article}</a></li>
                    <li>Wikipedia: <a href="${launch.links.wikipedia}" target="_blank">${launch.links.wikipedia}</a></li>
                </ul>
            </p>
            
        </div>
    `).join('');

    container.innerHTML = launchesHtml;
}


function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un lanzamiento por página
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

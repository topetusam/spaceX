let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/landpads")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderLandpads(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching landpads data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un landpad por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderLandpads(data, container) {
    const landpadsHtml = data.map(landpad => `
        <div class="landpad">
            <h2>${landpad.name}</h2>
            <p>Full Name: ${landpad.full_name}</p>
            <p>Location: ${landpad.locality}, ${landpad.region}</p>
            <p>Successful Landings: ${landpad.successful_landings}</p>
            <p>Attempted Landings: ${landpad.attempted_landings}</p>
            <p>Details: ${landpad.details}</p>
            <p>Wikipedia: <a href="${landpad.wikipedia}" target="_blank">${landpad.wikipedia}</a></p>
        </div>
    `).join('');

    container.innerHTML = landpadsHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un landpad por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationLandpads">`;
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

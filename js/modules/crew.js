let currentPage = 1;

export function loadModuleData(container, page) {
    currentPage = page || currentPage;
    fetch("https://api.spacexdata.com/v4/crew")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const paginatedData = paginate(data, currentPage);
            renderCrew(paginatedData, container);
            setupPagination(data.length, container);
        })
        .catch(error => {
            console.error("Error fetching crew data:", error);
        });
}

function paginate(items, page) {
    const itemsPerPage = 1; // Mostrar un miembro de la tripulación por página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
}

function renderCrew(data, container) {
    const crewHtml = data.map(member => `
        <div class="crew-member">
            <h2>${member.name}</h2>
            <p>Status: ${member.status}</p>
            <p>Agency: ${member.agency}</p>
            <p>Image: <img src="${member.image}" alt="${member.name}" style="max-width: 300px;" referrerPolicy="no-referrer"></p>
            <p>Wikipedia: <a href="${member.wikipedia}" target="_blank">${member.wikipedia}</a></p>
        </div>
    `).join('');

    container.innerHTML = crewHtml;
}

function setupPagination(totalItems, container) {
    const itemsPerPage = 1; // Mostrar un miembro de la tripulación por página
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginationHtml = `<div id="paginationCrew">`;
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
